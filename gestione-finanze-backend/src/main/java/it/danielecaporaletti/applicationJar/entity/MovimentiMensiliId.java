package it.danielecaporaletti.applicationJar.entity;

import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class MovimentiMensiliId implements Serializable {
    private Integer anno;
    private Integer mese;
    private String nomeConto;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MovimentiMensiliId that = (MovimentiMensiliId) o;
        return Objects.equals(anno, that.anno) && Objects.equals(mese, that.mese) && Objects.equals(nomeConto, that.nomeConto);
    }

    @Override
    public int hashCode() {
        return Objects.hash(anno, mese, nomeConto);
    }

    public MovimentiMensiliId() {}

    public MovimentiMensiliId(Integer anno, Integer mese, String nomeConto) {
        this.anno = anno;
        this.mese = mese;
        this.nomeConto = nomeConto;
    }

    public Integer getAnno() {
        return anno;
    }

    public void setAnno(Integer anno) {
        this.anno = anno;
    }

    public Integer getMese() {
        return mese;
    }

    public void setMese(Integer mese) {
        this.mese = mese;
    }

    public String getNomeConto() {
        return nomeConto;
    }

    public void setNomeConto(String nomeConto) {
        this.nomeConto = nomeConto;
    }
}
