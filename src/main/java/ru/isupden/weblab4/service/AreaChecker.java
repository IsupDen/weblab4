package ru.isupden.weblab4.service;

import org.springframework.stereotype.Component;
import ru.isupden.weblab4.model.entity.Hit;

@Component
public class AreaChecker {

    public void check(Hit hit) {
        hit.setResult(inSquare(hit.getX(), hit.getY(), hit.getR())
                || inTriangle(hit.getX(), hit.getY(), hit.getR())
                || inCircle(hit.getX(), hit.getY(), hit.getR()));
    }

    private boolean inSquare(double x, double y, double r) {
        return  (x <= 0 && x >= -r) && (y <= 0 && y >= -r);
    }

    private boolean inTriangle(double x, double y, double r) {
        return  x <= 0 && y >= 0 && y <= 2 * x + r;
    }

    private boolean inCircle(double x, double y, double r) {
        return  x >= 0 && y <= 0 && x * x + y * y <= 0.25 * r * r;
    }
}
