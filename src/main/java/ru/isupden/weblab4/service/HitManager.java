package ru.isupden.weblab4.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.isupden.weblab4.model.entity.Hit;
import ru.isupden.weblab4.controller.dto.HitDto;
import ru.isupden.weblab4.model.repo.HitRepository;
import ru.isupden.weblab4.model.repo.UserRepository;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class HitManager {

    @Autowired
    private HitRepository hitRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AreaChecker checker;

    public Hit addHit(HitDto hit, String username, LocalDateTime startTime) {
        Hit newHit = new Hit(hit.getX(), hit.getY(), hit.getR());
        checker.check(newHit);
        newHit.setUser(userRepository.findByUsername(username));
        newHit.setExecutionTime(LocalDateTime.now(ZoneOffset.UTC).minusNanos(startTime.getNano()).getNano());
        newHit.setCurTime(LocalDateTime.now(ZoneOffset.UTC).minusMinutes(hit.getTimeZone()).format(DateTimeFormatter.ofPattern("HH:mm:ss dd/MM/yyyy")));
        hitRepository.save(newHit);
        return newHit;
    }

    public List<Hit> getHits() {
        List<Hit> hits = hitRepository.findAll();
        Collections.reverse(hits);
        return hits;
    }

    public void deleteAll(String username) {
        List<Hit> hits = hitRepository.findAll().stream().filter(hit -> hit.getUser().getUsername().equals(username)).toList();
        hitRepository.deleteAll(hits);
    }
}
