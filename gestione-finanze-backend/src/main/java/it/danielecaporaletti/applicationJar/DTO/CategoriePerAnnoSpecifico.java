package it.danielecaporaletti.applicationJar.DTO;

public class CategoriePerAnnoSpecifico {

    private String categoria;

    public CategoriePerAnnoSpecifico() {}

    public CategoriePerAnnoSpecifico(String categoria) {
        this.categoria = categoria;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }
}
