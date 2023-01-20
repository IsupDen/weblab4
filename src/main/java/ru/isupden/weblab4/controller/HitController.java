package ru.isupden.weblab4.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.isupden.weblab4.model.entity.Hit;
import ru.isupden.weblab4.controller.dto.HitDto;
import ru.isupden.weblab4.service.HitManager;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/hits")
public class HitController {

    private final HitManager manager;

    public HitController(HitManager manager) {
        this.manager = manager;
    }

    @PostMapping
    public Hit addHit(@RequestBody HitDto newHit, @RequestAttribute String username, @RequestAttribute LocalDateTime startTime) {
        return manager.addHit(newHit, username, startTime);
    }

    @GetMapping
    public List<Hit> getHits() {
        return manager.getHits();
    }

    @DeleteMapping
    public void deleteAll(@RequestAttribute String username) {
        manager.deleteAll(username);
    }
}
