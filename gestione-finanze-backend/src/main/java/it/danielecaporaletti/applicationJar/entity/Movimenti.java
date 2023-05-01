package it.danielecaporaletti.applicationJar.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "movimenti")
public class Movimenti {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;

    @Column(name = "data", nullable = false)
    private Date data;

    @Column(name = "movimento", nullable = false, precision = 10, scale = 2)
    private BigDecimal movimento;

    @ManyToOne
    @JoinColumn(name = "categoria_movimento", referencedColumnName = "categoria_movimento", nullable = false)
    private CategorieMovimenti categoriaMovimento;

    @ManyToOne
    @JoinColumn(name = "nome_conto", referencedColumnName = "nome_conto", nullable = false)
    private Conti conto;

    public Movimenti() {

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getData() {
        return data;
    }

    public void setData(Date data) {
        this.data = data;
    }

    public BigDecimal getMovimento() {
        return movimento;
    }

    public void setMovimento(BigDecimal movimento) {
        this.movimento = movimento;
    }

    public CategorieMovimenti getCategoriaMovimento() {
        return categoriaMovimento;
    }

    public void setCategoriaMovimento(CategorieMovimenti categoriaMovimento) {
        this.categoriaMovimento = categoriaMovimento;
    }

    public Conti getConto() {
        return conto;
    }

    public void setConto(Conti conto) {
        this.conto = conto;
    }
}

