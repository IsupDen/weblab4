package ru.isupden.weblab4.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import ru.isupden.weblab4.security.filter.TimeFilter;
import ru.isupden.weblab4.security.filter.UsernameFilter;

@Configuration
public class SecurityConfig {

    private final UserDetailsService userDetails;
    private final PasswordEncoder passwordEncoder;

    public SecurityConfig(UserDetailsService userDetails, PasswordEncoder passwordEncoder) {
        this.userDetails = userDetails;
        this.passwordEncoder = passwordEncoder;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .cors().disable()
                .authorizeHttpRequests(auth -> auth
                        .antMatchers("/",
                                "/favicon.png",
                                "/static/**",
                                "/**/*.json",
                                "/**/*.html")
                        .permitAll()
                        .antMatchers("/register").permitAll()
                        .anyRequest().authenticated()
                )
                .httpBasic().authenticationEntryPoint((request, response, authException) -> response.sendError(HttpStatus.UNAUTHORIZED.value(), HttpStatus.UNAUTHORIZED.getReasonPhrase()));
        http.addFilterAfter(new TimeFilter(), BasicAuthenticationFilter.class);
        http.addFilterAfter(new UsernameFilter(), TimeFilter.class);
        return http.build();
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth)
            throws Exception {
        auth.userDetailsService(userDetails).passwordEncoder(passwordEncoder);
    }
}
