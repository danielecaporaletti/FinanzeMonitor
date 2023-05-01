package it.danielecaporaletti.applicationJar.DAO;

import it.danielecaporaletti.applicationJar.entity.Conti;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path="conti")
public interface ContiRepository extends JpaRepository<Conti, String> {
}
