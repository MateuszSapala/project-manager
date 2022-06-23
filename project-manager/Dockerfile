FROM openjdk:17.0.1
COPY target/project-manager-0.0.1-SNAPSHOT.jar ./app/project-manager.jar
EXPOSE 8080
WORKDIR ./app
ENTRYPOINT ["java", "-jar", "project-manager.jar"]