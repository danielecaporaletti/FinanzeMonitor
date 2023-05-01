package it.danielecaporaletti.applicationJar.DTO;

import java.math.BigDecimal;

public class SommaMovimentiAnno {

    private BigDecimal somma;

    public SommaMovimentiAnno() {}

    public SommaMovimentiAnno(BigDecimal somma) {
        this.somma = somma;
    }

    public BigDecimal getSomma() {
        return somma;
    }

    public void setSomma(BigDecimal somma) {
        this.somma = somma;
    }
}
