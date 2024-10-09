package com.AppFSPH.AppFSPH;

import org.slf4j.Logger;
import org.springframework.boot.Banner;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;

@SpringBootApplication
public class AppFsphApplication extends SpringBootServletInitializer {

    private static final Logger logger = LoggerFactory.getLogger(AppFsphApplication.class);

    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(AppFsphApplication.class);
        app.setBannerMode(Banner.Mode.OFF); // Desabilita o banner de inicialização
        app.setAdditionalProfiles("dev"); // Define o perfil ativo como "dev"
        app.run(args);
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(AppFsphApplication.class);
    }

    @Bean
    @Profile("dev")
    public CommandLineRunner runInDevProfile() {
        return args -> {
            logger.info("Aplicação iniciada no perfil 'dev'.");
            if (args.length > 0) {
                logger.info("Argumentos da linha de comando:");
                for (String arg : args) {
                    logger.info(arg);
                }
            }
        };
    }

    @Bean
    @Profile("prod")
    public CommandLineRunner runInProdProfile() {
        return args -> {
            logger.info("Aplicação iniciada no perfil 'prod'.");
            if (args.length > 0) {
                logger.info("Argumentos da linha de comando:");
                for (String arg : args) {
                    logger.info(arg);
                }
            }
        };
    }
}
