package ru.isupden.weblab4.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import ru.isupden.weblab4.model.entity.AppUser;
import ru.isupden.weblab4.model.repo.UserRepository;

import java.util.Base64;

@Component
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void create(String username, String password) {
        userRepository.save(new AppUser(username, passwordEncoder.encode(password), "USER"));
    }

    public AppUser isUsernameValid(String username, String pass) {
        if (!StringUtils.hasText(username) || !StringUtils.hasText(pass)) {
            return null;
        }
        String password = new String(Base64.getDecoder().decode(pass.getBytes()));
        AppUser u = userRepository.findByUsername(username);
        if (u == null) {
            return null;
        }
        if (!passwordEncoder.matches(password, u.getPassword())) {
            return null;
        }
        return u;
    }

    public AppUser isUsernameValid(String auth) {
        if (!StringUtils.hasText(auth)) {
            return null;
        }
        auth = new String(Base64.getDecoder().decode(auth));
        String password = auth.split(":")[1];
        AppUser u = userRepository.findByUsername(auth.split(":")[0]);
        if (u == null) {
            return null;
        }
        if (!passwordEncoder.matches(password, u.getPassword())) {
            return null;
        }
        return u;
    }
}
