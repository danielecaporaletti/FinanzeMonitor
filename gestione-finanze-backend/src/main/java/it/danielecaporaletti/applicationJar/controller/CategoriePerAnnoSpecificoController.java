package it.danielecaporaletti.applicationJar.controller;


import it.danielecaporaletti.applicationJar.DAO.MovimentiRepository;
import it.danielecaporaletti.applicationJar.DTO.CategoriePerAnnoSpecifico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class CategoriePerAnnoSpecificoController {

    @Autowired
    private MovimentiRepository movimentiRepository;

    @GetMapping("/categorie_uscite")
    public List<CategoriePerAnnoSpecifico> getCategorieDiUscitePerAnnoSpecifico(Integer year) {
        List<Object[]> rawData = movimentiRepository.findCategorieDiUsictePerAnnoSpecifico(year);
        return rawData.stream()
                .map(record -> new CategoriePerAnnoSpecifico(
                        (String) record[0]))
                .collect(Collectors.toList());
    }

    @GetMapping("/categorie_entrate")
    public List<CategoriePerAnnoSpecifico> getCategorieDiEntrateePerAnnoSpecifico(Integer year) {
        List<Object[]> rawData = movimentiRepository.findCategorieDiEntratePerAnnoSpecifico(year);
        return rawData.stream()
                .map(record -> new CategoriePerAnnoSpecifico(
                        (String) record[0]))
                .collect(Collectors.toList());
    }
}
