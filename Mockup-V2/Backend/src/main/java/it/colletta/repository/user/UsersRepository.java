package it.colletta.repository.user;

import com.mongodb.BasicDBObject;
import it.colletta.security.Role;
import java.util.Optional;

import it.colletta.repository.user.UserCustomQueryInterface;
import org.springframework.data.mongodb.repository.MongoRepository;

import it.colletta.model.UserModel;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsersRepository extends MongoRepository<UserModel, String>, UserCustomQueryInterface {

  /**
   * Find the user by his email
   * @param email the email of the user
   * @return UserModel of the user with that email
  */
  UserModel findByEmail(String email);

  /**
  * @param userId the unique id of the user
  * @return Optional<UserModel> return the user pojo
  */
  Optional<UserModel> findById(String userId);

  /**
  * @param users TODO
  * @return nothing
  */
  @Override
  void delete(UserModel users);

  /**
   * Delete user from the system
   * @param id the user id
  */
  @Override
  void deleteById(String id);

  /**
   * Insert a new user into the database
   * @param user the pojo of the user
   * @return the inserted user model
   */
  @Override
  UserModel save(UserModel user);

  /**
   * Return the list of all users inserted
   * @return List<UserModel> return all the user
  */
  @Override
  List<UserModel> findAll();

  @Override
  UserModel updateUser(UserModel oldUser, UserModel newUser);

  @Query(" {$and : [{role : '" + Role.STUDENT + "'}, {enabled : true}] }, "
      + "{ password:0}")
  List<UserModel> findAllStudents();


  /**
   * Remove the exercise from the student
   * @param exerciseId the exercise document id
   */
  @Query("{ $pull: { exercisesToDo: ?0 }}")
  void deleteFromExerciseToDo(String exerciseId);
}