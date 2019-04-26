/**
 * @path it.colletta.controller.ExerciseController
 * @author Francesco Magarotto, Enrico Muraro, Francesco Corti
 * @date 2019-03-27
 * @description Menage the HTTP user request regarding the exercises
 */
package it.colletta.controller;

import it.colletta.controller.assembler.ExerciseResourceAssembler;
import it.colletta.model.ExerciseModel;
import it.colletta.model.SolutionModel;
import it.colletta.model.helper.CorrectionHelper;
import it.colletta.model.helper.ExerciseHelper;
import it.colletta.security.ParseJwt;
import it.colletta.service.ExerciseService;
import it.colletta.service.SolutionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedResources;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/exercises")
public class ExerciseController {

    private ExerciseService exerciseService;
    private SolutionService solutionService;

    @Autowired
    public ExerciseController(ExerciseService exerciseService,
                              SolutionService solutionService) {
        this.exerciseService = exerciseService;
        this.solutionService = solutionService;
    }

    @RequestMapping(value = "/done", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> allExercisesDone(@RequestHeader("Authorization") String token,
                                              @PageableDefault(value = 4) Pageable pageable,
                                              PagedResourcesAssembler<ExerciseModel> assembler) {
        String id = ParseJwt.getIdFromJwt(token);

        Page<ExerciseModel> exercisesDone = exerciseService.getAllDoneBySudentId(pageable, id);
        PagedResources<?> resources = assembler
                .toResource(exercisesDone, new ExerciseResourceAssembler("/done-alt"));
        return new ResponseEntity<>(resources, HttpStatus.OK);
    }

    /**
     * Returns all the exercises added by the requesting teacher.
     *
     * @param token     User token
     * @param pageable  pageable
     * @param assembler assembler
     * @return List of exercises
     */
    @RequestMapping(value = "/added", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> allAddedExercises(@RequestHeader("Authorization") String token,
                                               @PageableDefault(value = 4) Pageable pageable,
                                               PagedResourcesAssembler<ExerciseModel> assembler) {
        String id = ParseJwt.getIdFromJwt(token);

        Page<ExerciseModel> exercisesDone = exerciseService.getAllAddedByTeacherId(pageable, id);
        PagedResources<?> resources = assembler
                .toResource(exercisesDone, new ExerciseResourceAssembler("/added-alt"));
        return new ResponseEntity<>(resources, HttpStatus.OK);
    }

    @RequestMapping(value = "/todo", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> allExercisesToDo(@RequestHeader("Authorization") String token,
                                              @PageableDefault(value = 4) Pageable pageable,
                                              PagedResourcesAssembler<ExerciseModel> assembler) {
        String id = ParseJwt.getIdFromJwt(token);
        Page<ExerciseModel> exercisesToDo = exerciseService.getAllToDoByStudentId(pageable, id);
        PagedResources<?> resources = assembler
                .toResource(exercisesToDo, new ExerciseResourceAssembler("/todo-alt"));
        return new ResponseEntity<>(resources, HttpStatus.OK);
    }

    /**
     * @param exercise the exercise which needs to be inserted in the database
     * @return A new ResponseEntity that contains the phrase.
     */
    //@RolesAllowed("TEACHER")
    //@Secured("ROLE_TEACHER")
    @PreAuthorize("hasRole('TEACHER')")
    @RequestMapping(value = "/insert-exercise", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ExerciseModel> insertExercise(@RequestBody ExerciseHelper exercise) {
        try {
            ExerciseModel exerciseModel = exerciseService.insertExercise(exercise);

            return new ResponseEntity<>(exerciseModel, HttpStatus.OK);
        } catch (Exception error) {
            error.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * @param token    User's token
     * @param exercise exercise the exercise which needs to be inserted in the database
     * @return A new ResponseEntity that contains the phrase.
     */
    @RequestMapping(value = "/student/insert-free-exercise", method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ExerciseModel> insertFreeExercise(
            @RequestHeader("Authorization") String token,
            @RequestBody ExerciseHelper exercise) {
        try {
            ExerciseModel exerciseModel;
            exerciseModel = exerciseService
                    .insertFreeExercise(exercise, ParseJwt.getIdFromJwt(token));
            return new ResponseEntity<>(exerciseModel, HttpStatus.OK);
        } catch (Exception error) {
            error.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * @param token            the unique token of the user, in this case a student
     * @param correctionHelper contains the unique id of the exercise and the solution that was
     *                         written by the student
     * @return the teacher solution of the exercise.
     */
    @RequestMapping(value = "/student/do", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SolutionModel> doExercise(@RequestHeader("Authorization") String token,
                                                    @RequestBody CorrectionHelper correctionHelper) {
        try {
            SolutionModel insertedSolution = exerciseService
                    .doExercise(correctionHelper, ParseJwt.getIdFromJwt(token));
            return new ResponseEntity<>(insertedSolution, HttpStatus.OK);
        } catch (Exception error) {
            error.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * @param stringObj    the text which has to be analyzed by freeling as map
     * @param studentToken the unique token of the user
     * @return A SolutionModel with the analyzed sentence or empty if the service is unavailable.
     */
    @RequestMapping(value = "/automatic-solution", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SolutionModel> getCorrection(@RequestBody Map<String, String> stringObj,
                                                       @RequestHeader("Authorization") String studentToken) {
        try {
            SolutionModel solution = solutionService.getAutomaticCorrection(stringObj.get("text"));
            return new ResponseEntity<SolutionModel>(solution, HttpStatus.OK);
        } catch (IOException error) {
            error.printStackTrace();
            return new ResponseEntity<SolutionModel>(new SolutionModel(),
                    HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

    @RequestMapping(value = "/public", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getPublicExercises(@PageableDefault(value = 4) Pageable pageable,
                                                PagedResourcesAssembler<ExerciseModel> assembler,
                                                @RequestHeader("Authorization") String studentToken) {
        try {
            Page<ExerciseModel> exercisesToDo = exerciseService.getAllPublicExercises(pageable, ParseJwt.getIdFromJwt(studentToken));
            PagedResources<?> resources = assembler
                    .toResource(exercisesToDo, new ExerciseResourceAssembler("/public-exercise"));
            return new ResponseEntity<>(resources, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    /**
     * @param exerciseId the unique id of the exercise
     * @param jwtToken   the token of the theacher who is going to delete a exercise
     * @return ccc. @RequestMapping( value = "/exercises/delete/{exerciseid}",
     *         method = RequestMethod.DELETE, produces =
     *         MediaType.APPLICATION_JSON_VALUE) public ResponseEntity<Object>
     *         deleteExercise( @RequestParam("exerciseid") String
     *         exerciseId, @RequestHeader("Authorization") String jwtToken) { String
     *         userId = ParseJWT.getIdFromJwt(jwtToken);
     *         userService.deleteExerciseAssigned(exerciseId, userId);
     *         exerciseService.deleteExercise(exerciseId); return new
     *         ResponseEntity<>(HttpStatus.OK); }
     */
}
