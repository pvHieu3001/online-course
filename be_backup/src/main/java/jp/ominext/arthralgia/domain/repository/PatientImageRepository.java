package jp.ominext.arthralgia.domain.repository;

import jp.ominext.arthralgia.domain.model.PatientImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface PatientImageRepository extends JpaRepository<PatientImage, Integer> {
    @Query(value = "select * from patient_images pi " +
            "where pi.area_type = :areaType " +
            "and pi.date >= :startDate AND pi.date <= :endDate " +
            "and pi.uid = :uid",
            nativeQuery = true)
    PatientImage findOneByDateBetween(@Param("areaType") String areaType,
                                      @Param("startDate") Date startDate,
                                      @Param("endDate") Date endDate,
                                      @Param("uid") String uid);

    @Query(value = "select * from patient_images pi where pi.id = :id and pi.uid in (:uIds)",
            nativeQuery = true)
    PatientImage findByIdAndUIds(@Param("id") String id, @Param("uIds") List<String> uIds);

    @Query(value = "select * from patient_images pi" +
            " where pi.uid = :uid and pi.date >= :startDate and pi.date <= :endDate" +
            " order by pi.date desc, pi.area_type desc",
            nativeQuery = true)
    List<PatientImage> findAllByDateBetweenAndUid(@Param("uid") String uid,
                                                  @Param("startDate") Date startDate,
                                                  @Param("endDate") Date endDate);

    @Query(value = "select * from patient_images pi where pi.uid in (:uIds)" +
            " order by pi.date desc, pi.area_type desc limit :size offset :offset",
            nativeQuery = true)
    List<PatientImage> findAllByUidInWithPaging(@Param("uIds") List<String> uIds,
                                                @Param("size") int size,
                                                @Param("offset") int offset);

    @Modifying
    @Query(value = "delete from patient_images where uid = :uid", nativeQuery = true)
    void deleteByUid(@Param("uid") String uid);
}
