package com.hanin.pda;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan("com.hanin.pda")
@SpringBootApplication
public class HaninpdaApplication {

    public static void main(String[] args) {

        System.setProperty("spring.devtools.restart.enabled", "true");
        SpringApplication.run(HaninpdaApplication.class, args);
    }

}
