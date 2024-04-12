package com.keyvany.keyvany;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan("com.keyvany.keyvany")
@SpringBootApplication
public class KeyvanyApplication {

    public static void main(String[] args) {

        System.setProperty("spring.devtools.restart.enabled", "true");
        SpringApplication.run(KeyvanyApplication.class, args);
    }

}
