package ru.isupden.weblab4.model.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.isupden.weblab4.model.entity.AppUser;

public interface UserRepository extends JpaRepository<AppUser, Long> {
    AppUser findByUsername(String username);
    boolean existsAppUserByUsername(String username);
}
