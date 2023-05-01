package it.danielecaporaletti.applicationJar.controller;


import it.danielecaporaletti.applicationJar.DAO.MovimentiMensiliRepository;
import it.danielecaporaletti.applicationJar.DTO.Year;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class YearController {

    @Autowired
    MovimentiMensiliRepository movimentiMensiliRepository;

    @GetMapping("/years")
    public List<Year> getYears() {
        List<Object[]> rawData = movimentiMensiliRepository.findYears();
        return rawData.stream()
                .map(record -> new Year(
                        (Integer) record[0]))
                .collect(Collectors.toList());
    }
}
