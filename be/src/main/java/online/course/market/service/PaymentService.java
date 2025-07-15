package online.course.market.service;

import online.course.market.entity.model.Payment;
import java.util.List;

public interface PaymentService {
    Payment getById(Integer id);
    List<Payment> getAll();
    Payment save(Payment payment);
    Payment update(Payment payment, Integer id);
    void deleteById(Integer id);
} 