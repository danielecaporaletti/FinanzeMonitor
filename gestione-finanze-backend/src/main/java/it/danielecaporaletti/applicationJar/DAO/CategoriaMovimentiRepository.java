package it.danielecaporaletti.applicationJar.DAO;

import it.danielecaporaletti.applicationJar.entity.CategorieMovimenti;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path="categorie_movimenti")
public interface CategoriaMovimentiRepository extends JpaRepository<CategorieMovimenti, String> {
}
