package ru.isupden.weblab4.security;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import ru.isupden.weblab4.model.entity.AppUser;
import ru.isupden.weblab4.security.factory.UsernamePasswordAuthenticationTokenFactory;
import ru.isupden.weblab4.service.UserService;


@Component
public class AuthProviderService implements AuthenticationProvider {

    private final UserService userService;
    private final UsernamePasswordAuthenticationTokenFactory usernamePasswordAuthenticationTokenFactory;

    public AuthProviderService(UserService userService, UsernamePasswordAuthenticationTokenFactory usernamePasswordAuthenticationTokenFactory) {
        this.userService = userService;
        this.usernamePasswordAuthenticationTokenFactory = usernamePasswordAuthenticationTokenFactory;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = authentication.getName();
        String password = authentication.getCredentials().toString();
        AppUser u = userService.isUsernameValid(username, password);
        if (u != null) {
            return usernamePasswordAuthenticationTokenFactory.create(u);
        }
        throw new UsernameNotFoundException("Not valid username/password");
    }

    @Override
    public boolean supports(Class<?> aClass) {
        return aClass.equals(UsernamePasswordAuthenticationToken.class);
    }
}
