package it.colletta.controller;

import it.colletta.model.Correction;
import it.colletta.service.CorrectionService;
import it.colletta.repository.CorrectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import java.awt.*;

@RestController
@RequestMapping("/correction")
public class CorrectionController {

    @Autowired
    private CorrectionService correctionService;

    @RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Correction getCorrection(@RequestParam String phrase) {
        Correction correction = correctionService.test(phrase);
        return correction;
    }

}
