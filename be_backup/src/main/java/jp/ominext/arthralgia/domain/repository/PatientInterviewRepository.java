package jp.ominext.arthralgia.domain.repository;

import jp.ominext.arthralgia.domain.model.PatientInterview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface PatientInterviewRepository extends JpaRepository<PatientInterview, Integer> {
    @Query(value = "SELECT * FROM patient_interviews pi WHERE pi.date >= :startDate AND pi.date <= :endDate AND pi.uid = :uid",
            nativeQuery = true)
    PatientInterview findByDateBetweenAndUId(@Param("startDate") Date startDate,
                                             @Param("endDate") Date endDate,
                                             @Param("uid") String uId);

    @Query(value = "SELECT * FROM patient_interviews pi WHERE pi.uid in (:uIds)" +
            " ORDER BY pi.date desc limit :size offset :offset",
            nativeQuery = true)
    List<PatientInterview> findAllByUIdInWithPaging(@Param("uIds") List<String> uIds,
                                                  @Param("size") int size,
                                                  @Param("offset") int offset);

    @Modifying
    @Query(value = "delete from patient_interviews where uid = :uid", nativeQuery = true)
    void deleteByUid(@Param("uid") String uid);
}
