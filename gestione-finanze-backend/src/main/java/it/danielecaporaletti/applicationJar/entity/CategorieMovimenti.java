package it.danielecaporaletti.applicationJar.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "categorie_movimenti")
public class CategorieMovimenti {

    @Id
    @Column(name = "categoria_movimento", nullable = false)
    private String categoriaMovimento;

    @Lob
    @Column(name = "icona", nullable = false)
    private byte[] icona;

    public String getCategoriaMovimento() {
        return categoriaMovimento;
    }

    public void setCategoriaMovimento(String categoriaMovimento) {
        this.categoriaMovimento = categoriaMovimento;
    }

    public byte[] getIcona() {
        return icona;
    }

    public void setIcona(byte[] icona) {
        this.icona = icona;
    }
}
