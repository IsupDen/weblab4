package ru.isupden.weblab4.model.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Hit {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private double x;
    private double y;
    private double r;
    private Boolean result;
    private String curTime;
    private long executionTime;
    @ManyToOne
    private AppUser user;

    public Hit(double x, double y, double r) {
        this.x = x;
        this.y = y;
        this.r = r;
        result = false;
    }
}
