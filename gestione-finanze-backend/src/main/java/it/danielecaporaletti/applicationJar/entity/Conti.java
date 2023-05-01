package it.danielecaporaletti.applicationJar.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "conti")
public class Conti {

    @Id
    @Column(name = "nome_conto", nullable = false)
    private String nomeConto;

    @Column(name = "saldo", nullable = false, precision = 10, scale = 2)
    private BigDecimal saldo;

    public Conti() {}

    public String getNomeConto() {
        return nomeConto;
    }

    public void setNomeConto(String nomeConto) {
        this.nomeConto = nomeConto;
    }

    public BigDecimal getSaldo() {
        return saldo;
    }

    public void setSaldo(BigDecimal saldo) {
        this.saldo = saldo;
    }
}
