package online.course.market.service;

import online.course.market.entity.model.Notification;
import java.util.List;

public interface NotificationService {
    Notification getById(String id);
    List<Notification> getAll();
    Notification save(Notification notification);
    Notification update(Notification notification, String id);
    void deleteById(String id);
} 