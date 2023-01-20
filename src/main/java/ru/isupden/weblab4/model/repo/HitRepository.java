package ru.isupden.weblab4.model.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.isupden.weblab4.model.entity.Hit;

@Repository
public interface HitRepository extends JpaRepository<Hit, Long> {
}
