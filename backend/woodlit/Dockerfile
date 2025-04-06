FROM openjdk:21-jdk
WORKDIR /app/backend
COPY target/woodlit-0.0.1-SNAPSHOT.war /app.war
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "/app.war"]