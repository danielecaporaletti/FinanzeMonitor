package it.danielecaporaletti.applicationJar.controller;

import it.danielecaporaletti.applicationJar.DAO.MovimentiRepository;
import it.danielecaporaletti.applicationJar.DTO.SommaMovimentiAnno;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class SommaMovimentiAnnoController {

    @Autowired
    MovimentiRepository movimentiRepository;

    @GetMapping("/sommaUscite")
    public List<SommaMovimentiAnno> sommaUscite(String categoria, Integer year) {
        List<Object[]> rawData = movimentiRepository.findYearSommaUscite(categoria, year);

        return rawData.stream()
                .map(record -> new SommaMovimentiAnno(
                        (BigDecimal) record[0]))
                .collect(Collectors.toList());
    }

    @GetMapping("/sommaEntrate")
    public List<SommaMovimentiAnno> SommaEntrate(String categoria, Integer year) {
        List<Object[]> rawData = movimentiRepository.findYearSommaEntrate(categoria, year);

        return rawData.stream()
                .map(record -> new SommaMovimentiAnno(
                        (BigDecimal) record[0]))
                .collect(Collectors.toList());
    }
}
