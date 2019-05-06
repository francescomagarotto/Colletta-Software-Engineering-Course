package it.colletta.repository.classes;

import it.colletta.model.ClassModel;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClassRepository
    extends MongoRepository<ClassModel, String>, ClassCustomQueryInterface {

  @Override
  Optional<ClassModel> findById(final String id);

  @Override
  void deleteById(final String classId);

}
