package it.danielecaporaletti.applicationJar.controller;

import it.danielecaporaletti.applicationJar.DAO.MovimentiRepository;
import it.danielecaporaletti.applicationJar.DTO.MonthlySummary;
import it.danielecaporaletti.applicationJar.DTO.YearSummary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class MovimentiController {

    @Autowired
    private MovimentiRepository movimentiRepository;

    @GetMapping("/monthly_summary")
    public List<MonthlySummary> getMonthlySummary(Integer year) {
        List<Object[]> rawData = movimentiRepository.findMonthlyFromYear(year);
        return rawData.stream()
                .map(record -> new MonthlySummary(
                        (int) record[0],
                        (BigDecimal) record[1],
                        (BigDecimal) record[2]))
                .collect(Collectors.toList());
    }

    @GetMapping("/yearly_summary")
    public List<YearSummary> getYearSummary(@RequestParam(name = "sort", required = false, defaultValue = "asc") String sortDirection) {
        List<Object[]> rawData;
        if ("desc".equalsIgnoreCase(sortDirection)) {
            rawData = movimentiRepository.findYearSummaryDesc();
        } else {
            rawData = movimentiRepository.findYearSummaryAsc();
        }

        return rawData.stream()
                .map(record -> new YearSummary(
                        (int) record[0],
                        (BigDecimal) record[1],
                        (BigDecimal) record[2]))
                .collect(Collectors.toList());
    }

}
