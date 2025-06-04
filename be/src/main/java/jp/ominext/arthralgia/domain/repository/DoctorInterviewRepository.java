package jp.ominext.arthralgia.domain.repository;

import jp.ominext.arthralgia.domain.model.DoctorInterview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;


@Repository
public interface DoctorInterviewRepository extends JpaRepository<DoctorInterview, Integer> {
    @Query(value = "SELECT * FROM doctor_interviews di WHERE di.date >= :startDate AND di.date <= :endDate AND di.uid = :uid",
            nativeQuery = true)
    DoctorInterview findByDateBetweenAndUId(@Param("startDate") Date startDate,
                                     @Param("endDate") Date endDate,
                                     @Param("uid") String uId);

    @Query(value = "SELECT * FROM doctor_interviews di WHERE di.uid in (:uIds) order by di.date desc limit :size offset :offset",
            nativeQuery = true)
    List<DoctorInterview> findAllByUIdInWithPaging(@Param("uIds") List<String> uIds,
                                                   @Param("size") int size,
                                                   @Param("offset") int offset);

    @Modifying
    @Query(value = "delete from doctor_interviews where uid = :uid", nativeQuery = true)
    void deleteByUid(@Param("uid") String uid);
}
