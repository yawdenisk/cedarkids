package org.yawdenisk.woodlit.Configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.core.DelegatingOAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtValidators;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Map;

@Configuration
public class SecurityConfig {

    // Настройка CORS
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of(
                "http://localhost:3000",
                "http://localhost:8080",
                "https://cedarkids.eu"
        ));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);
        configuration.setExposedHeaders(List.of("Authorization"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    // Исправленный конвертер ролей Keycloak
    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter grantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();

        // Кастомная логика извлечения ролей из Keycloak JWT
        grantedAuthoritiesConverter.setAuthorityPrefix("ROLE_");

        JwtAuthenticationConverter converter = new JwtAuthenticationConverter();
        converter.setJwtGrantedAuthoritiesConverter(jwt -> {
            Collection<String> authorities;

            // Попробуем извлечь роли из разных мест в JWT
            Map<String, Object> realmAccess = jwt.getClaimAsMap("realm_access");
            if (realmAccess != null && realmAccess.containsKey("roles")) {
                authorities = (Collection<String>) realmAccess.get("roles");
                return authorities.stream()
                        .map(role -> "ROLE_" + role)
                        .map(org.springframework.security.core.authority.SimpleGrantedAuthority::new)
                        .collect(java.util.stream.Collectors.toList());
            }

            // Если не нашли в realm_access, попробуем resource_access
            Map<String, Object> resourceAccess = jwt.getClaimAsMap("resource_access");
            if (resourceAccess != null) {
                for (Object client : resourceAccess.values()) {
                    if (client instanceof Map) {
                        Map<String, Object> clientMap = (Map<String, Object>) client;
                        if (clientMap.containsKey("roles")) {
                            authorities = (Collection<String>) clientMap.get("roles");
                            return authorities.stream()
                                    .map(role -> "ROLE_" + role)
                                    .map(org.springframework.security.core.authority.SimpleGrantedAuthority::new)
                                    .collect(java.util.stream.Collectors.toList());
                        }
                    }
                }
            }

            return Arrays.asList();
        });
        return converter;
    }

    // Настройка JwtDecoder с дополнительной валидацией
    @Bean
    public JwtDecoder jwtDecoder() {
        NimbusJwtDecoder jwtDecoder = NimbusJwtDecoder
                .withJwkSetUri("https://cedarkids.eu/auth/realms/cedarkids/protocol/openid-connect/certs")
                .build();

        // Добавим дополнительные валидаторы
        OAuth2TokenValidator<Jwt> withIssuer = JwtValidators.createDefaultWithIssuer("https://cedarkids.eu/auth/realms/cedarkids");
        OAuth2TokenValidator<Jwt> withAudience = new DelegatingOAuth2TokenValidator<>(withIssuer);

        jwtDecoder.setJwtValidator(withAudience);
        return jwtDecoder;
    }

    // Основная конфигурация SecurityFilterChain
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                // Разрешаем preflight (OPTIONS) и публичные endpoint'ы
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers(
                                "/api/user/getUserDetails",
                                "/api/user/create",
                                "/api/user/login",
                                "/api/user/logout",
                                "/api/user/update",
                                "/api/order/create",
                                "/api/deliveryDetails/create",
                                "/api/deliveryDetails/update",
                                "/api/product/get/**",
                                "/api/product/getAll",
                                "/api/review/upload"
                        ).permitAll()
                        // Остальные защищены ролью ADMIN
                        .anyRequest().hasRole("ADMIN")
                )
                // Настройка OAuth2 Resource Server с JWT
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(jwt -> jwt
                                .decoder(jwtDecoder())
                                .jwtAuthenticationConverter(jwtAuthenticationConverter())
                        )
                )
                // Stateless сессия
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }
}