package it.danielecaporaletti.applicationJar.DAO;

import it.danielecaporaletti.applicationJar.entity.MovimentiMensili;
import it.danielecaporaletti.applicationJar.entity.MovimentiMensiliId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "movimenti_mensili", path = "movimenti_mensili")
public interface MovimentiMensiliRepository extends JpaRepository<MovimentiMensili, MovimentiMensiliId> {

    @Query("SELECT m.id.anno " +
            "FROM MovimentiMensili m " +
            "GROUP BY m.id.anno " +
            "ORDER BY m.id.anno DESC")
    List<Object[]> findYears();
}
