package it.colletta.controller;

import com.auth0.jwt.JWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import it.colletta.service.PhraseService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import java.util.Date;
import static com.auth0.jwt.algorithms.Algorithm.HMAC512;
import static it.colletta.security.SecurityConstants.EXPIRATION_TIME;
import static it.colletta.security.SecurityConstants.SECRET;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(MockitoJUnitRunner.class)
public class PhraseControllerTest {

  private String userToken;
  private MockMvc mvc;

  @Mock
  private PhraseService phraseService;

  @InjectMocks
  private PhraseController phraseController;

  @Before
  public void setUp(){
    userToken = ("Bearer") + JWT.create()
            .withJWTId("test@test.it")
            .withSubject("test")
            .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
            .sign(HMAC512(SECRET.getBytes()));

    mvc = MockMvcBuilders.standaloneSetup(phraseController)
            .build();

  }

  @Test
  public void downloadAllPhrasesTest(){
    try{
      mvc.perform(MockMvcRequestBuilders.get("/phrases/downloadall")
              .header("Authorization", userToken))
              .andExpect(status().isOk());
    }catch (Exception e){
      e.printStackTrace();
    }
  }

}
