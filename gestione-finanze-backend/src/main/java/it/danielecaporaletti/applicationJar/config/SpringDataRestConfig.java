package it.danielecaporaletti.applicationJar.config;

import it.danielecaporaletti.applicationJar.entity.CategorieMovimenti;
import it.danielecaporaletti.applicationJar.entity.Conti;
import it.danielecaporaletti.applicationJar.entity.Movimenti;
import it.danielecaporaletti.applicationJar.entity.MovimentiMensili;
import it.danielecaporaletti.applicationJar.projection.InlineMovimenti;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class SpringDataRestConfig implements WebMvcConfigurer {

    @Bean
    public RepositoryRestConfigurer repositoryRestConfigurer() {
        return RepositoryRestConfigurer.withConfig(config -> {
            config.exposeIdsFor(CategorieMovimenti.class, Conti.class, Movimenti.class, MovimentiMensili.class);
            config.getProjectionConfiguration().addProjection(InlineMovimenti.class);
        });
    }
}
