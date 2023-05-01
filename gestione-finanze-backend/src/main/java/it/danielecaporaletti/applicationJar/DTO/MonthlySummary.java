package it.danielecaporaletti.applicationJar.DTO;

import java.math.BigDecimal;

public class MonthlySummary {

    private int mese;
    private BigDecimal entrate;
    private BigDecimal uscite;

    public MonthlySummary(int mese, BigDecimal entrate, BigDecimal uscite) {
        this.mese = mese;
        this.entrate = entrate;
        this.uscite = uscite;
    }

    public MonthlySummary() {}

    public int getMese() {
        return mese;
    }

    public void setMese(int mese) {
        this.mese = mese;
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
