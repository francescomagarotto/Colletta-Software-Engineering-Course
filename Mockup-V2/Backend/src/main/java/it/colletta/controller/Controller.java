package it.colletta.controller;

import com.google.firebase.auth.FirebaseAuthException;

import it.colletta.resources.LoginModel;
import it.colletta.resources.RegistrationModel;
import it.colletta.resources.SentenceModel;
import it.colletta.service.SentenceService;
import it.colletta.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import javax.ws.rs.core.Response;

@CrossOrigin
@RestController
@RequestMapping("/sw")
public class Controller {

	@Autowired
	private SentenceService sentenceService;
	@Autowired
	private UsersService userService;

	/**
	 * if you pass a string containing a phrase with an ending point, you will receive a grammatical
	 * analysis of the phrase.
	 *
	 * @param sentence SentenceModel.
	 * @return Sentence solution.
	 */
	@RequestMapping(
			value = "/s",
			method = RequestMethod.POST,
			produces = "application/json",
			consumes = "application/json")
	public Response wsGetSolution(@RequestBody SentenceModel sentence) {
		try {
			String text = sentenceService.getSolution(sentence.getText()).trim();
			return Response.ok().type(javax.ws.rs.core.MediaType.APPLICATION_JSON)
					.entity(text)
					.build();
		} catch (IOException error) {
			error.printStackTrace();
			return Response.serverError().status(550).build(); // server di freeling non funzionante
		}
	}

	@RequestMapping(
			value = "/salvaEsercizio",
			method = RequestMethod.POST,
			produces = "application/json",
			consumes = "application/json")
	public void wsSalvaEsercizio(@RequestBody SentenceModel sentence)  {
		try {
			try {
				String uid = userService.getUid(sentence.token);
				sentenceService.salvaEsercizio(sentence.text, uid,sentence.soluzione);
			} catch (FirebaseAuthException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				throw e;
			}

		} catch (Exception error) {
			error.printStackTrace();
			//return Response.serverError().status(550).build(); // server di freeling non funzionante
		}
	}

	/**
	 * Creates a token for the user's session and retrieves his 
	 * personal information from the database.
	 * @param login LoginModel.
	 * @return token, uid and user information.
	 */
	@RequestMapping(
			value = "/login",
			method = RequestMethod.POST,
			produces = "application/json",
			consumes = "application/json")
	public Response wsLogin(@RequestBody LoginModel login) {
		try {
			return Response.ok()
					.type(javax.ws.rs.core.MediaType.APPLICATION_JSON)
					.entity(userService.login(login.getEmail(), login.getPassword()))
					.build();
		} catch (Exception error) {
			error.printStackTrace();
			return null ; /*Response.serverError()
					.type(javax.ws.rs.core.MediaType.APPLICATION_JSON)
					.status(551)
					.build();*/
		}
	}

	/**
	 * Create a new user and add his in db collection.
	 *
	 * @param newUser RegistrationModel.
	 * @return A token referring to the new user and his information.
	 */
	@RequestMapping(
			value = "/nu",
			method = RequestMethod.POST,
			produces = "application/json",
			consumes = "application/json")
	public Response wsNewUser(@RequestBody RegistrationModel newUser) {
		try {
			return Response.ok()
					.type(javax.ws.rs.core.MediaType.APPLICATION_JSON)
					.entity(userService.newUser(newUser))
					.build();
		} catch (Exception error) {
			error.printStackTrace();
			return Response.serverError()
					.type(javax.ws.rs.core.MediaType.APPLICATION_JSON)
					.status(551).build();
		}
	}
}
