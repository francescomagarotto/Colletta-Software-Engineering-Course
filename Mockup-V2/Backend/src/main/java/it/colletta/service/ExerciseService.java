package it.colletta.service;

import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import it.colletta.model.ExerciseModel;
import it.colletta.model.PhraseModel;
import it.colletta.model.SolutionModel;
import it.colletta.model.UserModel;
import it.colletta.model.helper.CorrectionHelper;
import it.colletta.model.helper.ExerciseHelper;
import it.colletta.repository.exercise.ExerciseRepository;
import it.colletta.service.user.UserService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ExerciseService {

  private ExerciseRepository exerciseRepository;
    private PhraseService phraseService;
    private UserService userService;

  @Autowired
  public ExerciseService(ExerciseRepository exerciseRepository,
      PhraseService phraseService, UserService userService) {
    this.exerciseRepository = exerciseRepository;
    this.phraseService = phraseService;
    this.userService = userService;
  }


    /**
     * Find by id.
     *
     * @param id Exercise id.
     * @returnc Exericse.
     */
    public Optional<ExerciseModel> findById(final String id) {
        return exerciseRepository.findById(id);
        // controllo su id, in caso exception
    }

    /**
     * Modify exercise author name.
     *
     * @param newUserData User info.
     * @param token       User token.
     */
    public void modifyExerciseAuthorName(UserModel newUserData, String token) {
        UserModel oldUser = userService.findByEmail(newUserData.getUsername());
        Optional<String> firstName = Optional.ofNullable(newUserData.getFirstName());
        Optional<String> lastName = Optional.ofNullable(newUserData.getLastName());
        if (firstName.isPresent() && !firstName.get().equals(oldUser.getFirstName())
                || lastName.isPresent() && !lastName.get().equals(oldUser.getLastName())) {
            String authorName = newUserData.getFirstName() + " " + newUserData.getLastName();
            exerciseRepository.modifyAuthorName(authorName, oldUser.getId());
        }
    }

    /**
     * Insert new exercise in the system.
     *
     * @param exercise New Exercise.
     * @return Exercise.
     */
    public ExerciseModel insertExercise(ExerciseHelper exercise) {

        PhraseModel phrase = phraseService
                .createPhrase(exercise.getPhraseText(), exercise.getLanguage());

        SolutionModel mainSolution =
            SolutionModel.builder()
                .solutionText(exercise.getMainSolution())
                .authorId(exercise.getAuthor())
                .build();

        SolutionModel alternativeSolution = null;
        if (exercise.getAlternativeSolution().length() > 0 && !exercise.getAlternativeSolution().equals("")) {
          alternativeSolution = SolutionModel.builder().reliability(0).authorId(exercise.getAuthor())
            .solutionText(exercise.getAlternativeSolution()).build();
        }
        phrase.addSolution(mainSolution);
        if (alternativeSolution != null) {
            phrase.addSolution(alternativeSolution);
        }

        phrase = phraseService.insertPhrase(phrase);

        Optional<UserModel> userOpt = userService.findById(exercise.getAuthor());
        UserModel user = userOpt
                .orElseThrow(() -> new NoSuchElementException("User not found in the system"));
        String authorName = user.getFirstName() + " " + user.getLastName();
        ExerciseModel exerciseModel = ExerciseModel.builder().id((new ObjectId().toHexString()))
                .dateExercise(System.currentTimeMillis()).mainSolutionId(mainSolution.getId())
                .alternativeSolutionId(alternativeSolution != null ? alternativeSolution.getId() : null)
                .phraseId(phrase.getId()).phraseText(exercise.getPhraseText())
                .visibility(exercise.getVisibility())
                .authorId(exercise.getAuthor()).authorName(authorName).build();
        exerciseModel.addStudentToDoIds(exercise.getAssignedUsersIds());
        exerciseModel = exerciseRepository.save(exerciseModel);
        return exerciseModel;
    }

    /**
     * Add a phrase solution or free exercise.
     *
     * @param exercise Exercise/Solution
     * @param userId   Author Id
     * @return This Exercise
     */
    public ExerciseModel insertFreeExercise(ExerciseHelper exercise, String userId) {

        SolutionModel mainSolution = SolutionModel.builder().reliability(0)
                .authorId(exercise.getAuthor())
                .solutionText(exercise.getMainSolution()).build();

        SolutionModel alternativeSolution = null;
        if (exercise.getAlternativeSolution().length() > 0 && !exercise.getAlternativeSolution().equals("")) {
            alternativeSolution = SolutionModel.builder().reliability(0).authorId(exercise.getAuthor())
                    .solutionText(exercise.getAlternativeSolution()).build();
        }

        PhraseModel phrase = PhraseModel.builder().language(exercise.getLanguage())
                .datePhrase(System.currentTimeMillis())
                .phraseText(exercise.getPhraseText()).build();

        phrase.addSolution(mainSolution);
        if (alternativeSolution != null) {
            phrase.addSolution(alternativeSolution);
        }

        phrase = phraseService.insertPhrase(phrase);

        Optional<UserModel> user = userService.findById(userId);
        String authorName =
                user.map(userModel -> userModel.getFirstName() + " " + userModel.getLastName())
                        .orElse(null);
        ExerciseModel exerciseModel = ExerciseModel.builder().id((new ObjectId().toHexString()))
                .dateExercise(System.currentTimeMillis()).mainSolutionId(mainSolution.getId())
                .phraseId(phrase.getId()).phraseText(exercise.getPhraseText())
                .visibility(exercise.getVisibility())
                .authorId(userId).authorName(authorName).build();
        phraseService.increaseReliability(mainSolution);
        return exerciseModel;
    }

    /**
     * Add solution in the system and returns it with the mark.
     *
     * @param correctionHelper New solution
     * @param studentId        Student id
     * @return the solution of the exercise
     * @throws Exception Exception
     */
    public SolutionModel doExercise(CorrectionHelper correctionHelper, String studentId)
            throws Exception {
        Optional<ExerciseModel> exerciseOptional = exerciseRepository
                .findById(correctionHelper.getExerciseId());
        if (exerciseOptional.isPresent()) {
            ExerciseModel exerciseToCorrect = exerciseOptional.get();
            SolutionModel mainSolutionModel = phraseService
                    .getSolutionInPhrase(exerciseToCorrect.getPhraseId(),
                            exerciseToCorrect.getMainSolutionId());
            SolutionModel alternativeSolutionModel = null;
            if (exerciseToCorrect.getAlternativeSolutionId() != null
                    && !exerciseToCorrect.getAlternativeSolutionId().isEmpty()) {
                alternativeSolutionModel = phraseService
                        .getSolutionInPhrase(exerciseToCorrect.getPhraseId(),
                                exerciseToCorrect.getAlternativeSolutionId());
            }
            ObjectMapper objectMapper = new ObjectMapper();
            JavaType type = objectMapper.getTypeFactory()
                    .constructCollectionType(ArrayList.class, String.class);
            ArrayList<String> studentSolutionMap =
                    objectMapper.readValue(correctionHelper.getSolutionFromStudent(), type);
            ArrayList<String> mainSolution =
                objectMapper.readValue(mainSolutionModel.getSolutionText(), type);

            Double mark = correct(studentSolutionMap, mainSolution);
            if (mark < 10.00 && alternativeSolutionModel != null) {
                ArrayList<String> alternativeSolutionMap = objectMapper
                        .readValue(alternativeSolutionModel.getSolutionText(), type);
                if (alternativeSolutionMap != null && !alternativeSolutionMap.isEmpty()) {
                    Double alternativeMark = correct(studentSolutionMap, alternativeSolutionMap);
                    if (mark < alternativeMark) {
                        mark = alternativeMark;
                    }
                }
            }
            Optional<PhraseModel> phraseModel = phraseService
                    .getPhraseById(exerciseToCorrect.getPhraseId());
            SolutionModel studentSolution = SolutionModel.builder().mark(mark).authorId(studentId)
                    .reliability(0)
                    .solutionText(mainSolutionModel.getSolutionText()).build();
            if (phraseModel.isPresent()) {
                phraseModel.get().addSolution(studentSolution);
                phraseService.insertPhrase(phraseModel.get());
                phraseService.increaseReliability(studentSolution);
                exerciseRepository.pullStudentToDoList(exerciseOptional.get().getId(), studentId);
                exerciseRepository.pushStudentDoneList(exerciseOptional.get().getId(), studentId);
            }

            return studentSolution;
        } else {
            throw new IllegalArgumentException("Exercise not defined in the system");
        }
    }

    /**
     * Return the mark.
     *
     * @param studentSolutionMap List of student solutions
     * @param systemSolution     Main of alternative solution
     * @return mark expressed in a decimal format
     */
    private Double correct(ArrayList<String> studentSolutionMap, ArrayList<String> systemSolution) {
        int points = 0;
        if (studentSolutionMap.size() == systemSolution.size()) {
            Iterator<String> studentSolutionIterator = studentSolutionMap.iterator();
            for (String word : systemSolution) {
                String studentWord = studentSolutionIterator.next();
                if (word.equals(studentWord)) {
                    ++points;
                }
            }
        } else {
            throw new IllegalArgumentException("Solutions have different length");
        }
        return (points * 10 / ((double) systemSolution.size()));
    }

    /**
     * Delete exercise by id.
     *
     * @param exerciseId Exercise id
     */
    public void deleteExercise(final String exerciseId) {
        Optional<ExerciseModel> exerciseModelOptional = exerciseRepository.findById(exerciseId);
        if (exerciseModelOptional.isPresent()) {
            ExerciseModel exerciseModel = exerciseModelOptional.get();
            exerciseRepository.delete(exerciseModel);
        }
        // else exception
    }


    /**
     * Return all exercises done by a student.
     *
     * @param page {@link Pageable}
     * @param id the user unique id
     * @return All exercise done by the user as pages
     */

    /**
     *
     */
    public Page<ExerciseModel> getAllDoneBySudentId(final Pageable page, final String userId) {
        return exerciseRepository.findExerciseModelsByStudentIdDoneIsIn(page, userId);
    }

    /**
     * Return all exercises that the user has to do.
     *
     * @param page {@link Pageable}
     * @param id   the user unique id
     * @return All exercise to do by the user as pages
     */
    public Page<ExerciseModel> getAllToDoByStudentId(final Pageable page, final String id) {
        return exerciseRepository.findExerciseModelsByStudentIdToDoIsIn(page, id);
    }

    public Page<ExerciseModel> getAllAddedByTeacherId(final Pageable page, final String userId) {
        return exerciseRepository.findByAuthorIdPaged(page, userId);
    }

    public Page<ExerciseModel> getAllPublicExercises(final Pageable page, final String userId) {
        return exerciseRepository.findPublicExercise(userId, page);
    }
}
