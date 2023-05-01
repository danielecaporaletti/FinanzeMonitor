package it.danielecaporaletti.applicationJar.entity;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.io.Serializable;

@Entity
@Table(name = "movimenti_mensili")
public class MovimentiMensili implements Serializable {

    @EmbeddedId
    private MovimentiMensiliId id;

    @Column(name = "entrate")
    private Double entrate;

    @Column(name = "uscite")
    private Double uscite;

    public MovimentiMensili() {}

    public MovimentiMensili(MovimentiMensiliId id, Double entrate, Double uscite) {
        this.id = id;
        this.entrate = entrate;
        this.uscite = uscite;
    }

    public MovimentiMensiliId getId() {
        return id;
    }

    public void setId(MovimentiMensiliId id) {
        this.id = id;
    }

    public Double getEntrate() {
        return entrate;
    }

    public void setEntrate(Double entrate) {
        this.entrate = entrate;
    }

    public Double getUscite() {
        return uscite;
    }

    public void setUscite(Double uscite) {
        this.uscite = uscite;
    }
}
