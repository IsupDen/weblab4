package ru.isupden.weblab4.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import ru.isupden.weblab4.model.entity.AppUser;
import ru.isupden.weblab4.model.repo.UserRepository;

@Component
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void create(String username, String password) {
        userRepository.save(new AppUser(username, passwordEncoder.encode(password)));
    }
}
