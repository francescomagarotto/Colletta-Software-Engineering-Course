package it.colletta.repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import it.colletta.model.PhraseModel;
import it.colletta.repository.PhraseCustomQueryInterface;

@Repository
public interface PhraseRepository
        extends MongoRepository<PhraseModel, String>, PhraseCustomQueryInterface {
    @Override
    void delete(PhraseModel phraseToDelete);

    @Override
    void deleteById(String phraseId);

    @Override
    List<PhraseModel> findAll();

    @Query(value = "{'text': {$regex: ?0, $options: 'i'}}", count = true)
    public Long countPhrasesWithText(String textToCompare);
    //WE CAN DO BETTER cit.

}
