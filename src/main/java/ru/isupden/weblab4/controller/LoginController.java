package ru.isupden.weblab4.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ru.isupden.weblab4.controller.dto.UserDto;
import ru.isupden.weblab4.model.repo.UserRepository;
import ru.isupden.weblab4.service.UserService;

import java.util.ArrayList;

@RestController
public class LoginController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<ArrayList<String>> newUser(@RequestBody UserDto newUser) {
        ArrayList<String> errors = validateUsername(newUser.getUsername());
        errors.addAll(validatePassword(newUser.getPassword()));
        if (errors.isEmpty()) {
            userService.create(newUser.getUsername(), newUser.getPassword());
            return new ResponseEntity<>( HttpStatus.CREATED );
        }
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    private ArrayList<String> validateUsername(String username) {
        ArrayList<String> usernameErrors = new ArrayList<>();
        if (username != null) {
            if (userRepository.existsAppUserByUsername(username)) {
                usernameErrors.add("Username " + username + " already exists.");
            }
            else if (!username.matches("\\w{3,}")) {
                usernameErrors.add(username + " is not a valid username.");
            }
        } else {
            usernameErrors.add("Username is required.");
        }
        return usernameErrors;
    }

    private ArrayList<String> validatePassword(String password) {
        ArrayList<String> passErrors = new ArrayList<>();
        if (password != null) {
            if (password.length() < 8) {
                passErrors.add("Your password must be at least 8 characters.");
            }
            if (!password.matches(".*[a-zA-Z]+.*")) {
                passErrors.add("Your password must contain at least one letter.");
            }
            if (!password.matches(".*[0-9]+.*")) {
                passErrors.add("Your password must contain at least one digit.");
            }
        } else {
            passErrors.add("Password is required.");
        }
        return passErrors;
    }
}
