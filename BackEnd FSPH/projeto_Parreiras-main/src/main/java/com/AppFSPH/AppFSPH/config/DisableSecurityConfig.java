package com.AppFSPH.AppFSPH.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class DisableSecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()  // Desativa CSRF
            .authorizeHttpRequests((requests) -> requests
                .anyRequest().permitAll() // Permite todas as requisições
            );
        return http.build();
    }
}
