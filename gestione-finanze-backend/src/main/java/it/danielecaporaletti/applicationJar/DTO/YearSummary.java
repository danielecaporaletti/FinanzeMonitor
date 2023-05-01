package it.danielecaporaletti.applicationJar.DTO;

import java.math.BigDecimal;

public class YearSummary {

    private int anno;
    private BigDecimal entrate;
    private BigDecimal uscite;

    public YearSummary() {}

    public YearSummary(int anno, BigDecimal entrate, BigDecimal uscite) {
        this.anno = anno;
        this.entrate = entrate;
        this.uscite = uscite;
    }

    public int getAnno() {
        return anno;
    }

    public void setAnno(int anno) {
        this.anno = anno;
    }

    public BigDecimal getEntrate() {
        return entrate;
    }

    public void setEntrate(BigDecimal entrate) {
        this.entrate = entrate;
    }

    public BigDecimal getUscite() {
        return uscite;
    }

    public void setUscite(BigDecimal uscite) {
        this.uscite = uscite;
    }
}
