package it.danielecaporaletti.applicationJar.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Collections;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final CorsConfigurationSource corsConfigurationSource;

    public SecurityConfig(CorsConfigurationSource corsConfigurationSource) {
        this.corsConfigurationSource = corsConfigurationSource;
    }

    @Bean
    public InMemoryUserDetailsManager userDetailsManager() {

        UserDetails admin = User.builder()
                .username("admin")
                .password("{noop}test123")
                .roles("VIEW","ADMIN")
                .build();

        UserDetails user = User.builder()
                .username("user")
                .password("{noop}test123")
                .roles("VIEW")
                .build();

        return new InMemoryUserDetailsManager(admin, user);
    }

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.setAllowedOriginPatterns(Arrays.asList("http://finanze.danielecaporaletti.it", "http://35.195.199.131")); // Usa setAllowedOriginPatterns invece di setAllowedOrigins
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .addFilter(corsFilter())
                .authorizeRequests(configurer ->
                        configurer
                                .requestMatchers(HttpMethod.GET, "/**").hasAnyRole("VIEW")
                                .requestMatchers(HttpMethod.POST, "/**").hasAnyRole("ADMIN")
                                .requestMatchers(HttpMethod.PUT, "/**").hasAnyRole("ADMIN")
                                .requestMatchers(HttpMethod.DELETE, "/**").hasAnyRole("ADMIN")
                )
                .httpBasic()
                .and()
                .csrf().disable();

        return http.build();
    }


}
