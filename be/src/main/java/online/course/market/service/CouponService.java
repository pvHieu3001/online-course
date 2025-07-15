package online.course.market.service;

import online.course.market.entity.model.Coupon;
import java.util.List;

public interface CouponService {
    Coupon getById(Integer id);
    List<Coupon> getAll();
    Coupon save(Coupon coupon);
    Coupon update(Coupon coupon, Integer id);
    void deleteById(Integer id);
} 