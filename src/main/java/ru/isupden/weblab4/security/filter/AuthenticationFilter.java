package ru.isupden.weblab4.security.filter;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import ru.isupden.weblab4.model.entity.AppUser;
import ru.isupden.weblab4.security.SecurityAppContext;
import ru.isupden.weblab4.security.factory.UsernamePasswordAuthenticationTokenFactory;
import ru.isupden.weblab4.service.UserService;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class AuthenticationFilter extends OncePerRequestFilter {

    private static final String AUTHORIZATION = "Authorization";
    private static final int BEGIN_INDEX = 6;

    private final UserService userService;
    private final UsernamePasswordAuthenticationTokenFactory usernamePasswordAuthenticationTokenFactory;
    private final SecurityAppContext securityAppContext;

    public AuthenticationFilter(UserService userService, UsernamePasswordAuthenticationTokenFactory usernamePasswordAuthenticationTokenFactory, SecurityAppContext securityAppContext) {
        this.userService = userService;
        this.usernamePasswordAuthenticationTokenFactory = usernamePasswordAuthenticationTokenFactory;
        this.securityAppContext = securityAppContext;
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
        String authToken = request.getHeader(AUTHORIZATION);
        if (authToken != null) {
            authToken = authToken.substring(BEGIN_INDEX).trim();
            SecurityContext context = securityAppContext.getContext();
            if(context.getAuthentication() == null) {
                AppUser u = userService.isUsernameValid(authToken);
                if(u != null) {
                    Authentication authentication = usernamePasswordAuthenticationTokenFactory.create(u);
                    context.setAuthentication(authentication);
                    request.setAttribute("username", u.getUsername());

                }
            }

        }
        chain.doFilter(request, response);
    }

}
