package it.danielecaporaletti.applicationJar.projection;

import it.danielecaporaletti.applicationJar.entity.CategorieMovimenti;
import it.danielecaporaletti.applicationJar.entity.Conti;
import it.danielecaporaletti.applicationJar.entity.Movimenti;
import org.springframework.data.rest.core.config.Projection;

import java.math.BigDecimal;
import java.util.Date;

@Projection(name = "inlineMovimenti", types = {Movimenti.class})
public interface InlineMovimenti {
    int getId();
    Date getData();
    BigDecimal getMovimento();
    CategorieMovimenti getCategoriaMovimento();
    Conti getConto();
}
