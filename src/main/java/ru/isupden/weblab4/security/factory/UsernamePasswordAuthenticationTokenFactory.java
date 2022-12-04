package ru.isupden.weblab4.security.factory;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import ru.isupden.weblab4.model.entity.AppUser;

import java.util.Collections;

@Component
public class UsernamePasswordAuthenticationTokenFactory {

    public UsernamePasswordAuthenticationToken create(AppUser u) {
        SimpleGrantedAuthority simpleGrantedAuthority = new SimpleGrantedAuthority(u.getRole());
        return new UsernamePasswordAuthenticationToken(u.getUsername(), u.getPassword(), Collections.singletonList(simpleGrantedAuthority));
    }

}
