package uni.lodz.pl.projectmanager;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@Slf4j
@SpringBootApplication
public class ProjectManagerApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProjectManagerApplication.class, args);
        log.info("Swagger available at: http://localhost:8080/swagger-ui/index.html?configUrl=/v3/api-docs");
    }

}
