package it.danielecaporaletti.applicationJar.DAO;


import it.danielecaporaletti.applicationJar.entity.Movimenti;
import it.danielecaporaletti.applicationJar.projection.InlineMovimenti;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import java.util.List;

@RepositoryRestResource(path="movimenti", excerptProjection = InlineMovimenti.class)
public interface MovimentiRepository extends JpaRepository<Movimenti, Integer> {

    @RestResource(path = "findByYearAndMonthAndSignAndCategoriaAndNomeConto")
    @Query("SELECT m FROM Movimenti m "
            + "JOIN m.categoriaMovimento cm "
            + "JOIN m.conto c "
            + "WHERE (:year is null or year(m.data) = :year) and "
            + "(:month is null or month(m.data) = :month) and "
            + "(:sign is null or SIGN(m.movimento) = :sign) and "
            + "(:categoria is null or cm.categoriaMovimento = :categoria) and "
            + "(:nomeConto is null or c.nomeConto = :nomeConto)")
    List<Movimenti> findByYearAndMonthAndSignAndCategoriaAndNomeConto(
            @Param("year") Integer year,
            @Param("month") Integer month,
            @Param("sign") Integer sign,
            @Param("categoria") String categoria,
            @Param("nomeConto") String nomeConto);

    @Query("SELECT MONTH(m.data) as mese, " +
            "SUM(CASE WHEN m.movimento > 0 THEN m.movimento ELSE 0 END) as Entrate, " +
            "SUM(CASE WHEN m.movimento < 0 THEN ABS(m.movimento) ELSE 0 END) as Uscite " +
            "FROM Movimenti m " +
            "WHERE YEAR(m.data) = :year " +
            "GROUP BY mese " +
            "ORDER BY mese ASC")
    List<Object[]> findMonthlyFromYear(
            @Param("year") Integer year);

    @Query("SELECT YEAR(m.data) as anno, " +
            "SUM(CASE WHEN m.movimento > 0 THEN m.movimento ELSE 0 END) as Entrate, " +
            "SUM(CASE WHEN m.movimento < 0 THEN ABS(m.movimento) ELSE 0 END) as Uscite " +
            "FROM Movimenti m " +
            "GROUP BY anno " +
            "ORDER BY anno ASC")
    List<Object[]> findYearSummaryAsc();

    @Query("SELECT YEAR(m.data) as anno, " +
            "SUM(CASE WHEN m.movimento > 0 THEN m.movimento ELSE 0 END) as Entrate, " +
            "SUM(CASE WHEN m.movimento < 0 THEN ABS(m.movimento) ELSE 0 END) as Uscite " +
            "FROM Movimenti m " +
            "GROUP BY anno " +
            "ORDER BY anno DESC")
    List<Object[]> findYearSummaryDesc();

    @Query(value = "SELECT SUM(m.movimento) as somma_uscite " +
            "FROM Movimenti m JOIN m.categoriaMovimento c " +
            "WHERE c.categoriaMovimento = :categoria AND m.movimento < 0 AND EXTRACT(YEAR FROM m.data) = :year")
    List<Object[]> findYearSommaUscite(
            @Param("categoria") String categoria,
            @Param("year") Integer year
    );

    @Query(value = "SELECT SUM(m.movimento) as somma_entrate " +
            "FROM Movimenti m JOIN m.categoriaMovimento c " +
            "WHERE c.categoriaMovimento = :categoria AND m.movimento > 0 AND EXTRACT(YEAR FROM m.data) = :year")
    List<Object[]> findYearSommaEntrate(
            @Param("categoria") String categoria,
            @Param("year") Integer year
    );

    @Query(value = "SELECT DISTINCT c.categoriaMovimento as categoria " +
            "FROM Movimenti m JOIN m.categoriaMovimento c " +
            "WHERE EXTRACT(YEAR FROM m.data) = :year AND m.movimento < 0")
    List<Object[]> findCategorieDiUsictePerAnnoSpecifico(
            @Param("year") Integer year
    );

    @Query(value = "SELECT DISTINCT c.categoriaMovimento as categoria " +
            "FROM Movimenti m JOIN m.categoriaMovimento c " +
            "WHERE EXTRACT(YEAR FROM m.data) = :year AND m.movimento > 0")
    List<Object[]> findCategorieDiEntratePerAnnoSpecifico(
            @Param("year") Integer year
    );

}
