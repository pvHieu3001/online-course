package online.course.market.service;

import online.course.market.entity.model.Order;
import java.util.List;

public interface OrderService {
    Order getById(Integer id);
    List<Order> getAll();
    Order save(Order order);
    Order update(Order order, Integer id);
    void deleteById(Integer id);
} 