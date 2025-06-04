package jp.ominext.arthralgia.domain.repository;

import jp.ominext.arthralgia.domain.model.Measurement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface MeasurementRepository extends JpaRepository<Measurement, Integer> {
    @Query(value = "SELECT * FROM measurements m WHERE m.date >= :startDate AND m.date <= :endDate AND m.uid = :uid",
            nativeQuery = true)
    Measurement findByDateBetweenAndUId(@Param("startDate") Date startDate,
                                        @Param("endDate") Date endDate,
                                        @Param("uid") String uid);

    @Query(value = "SELECT * FROM measurements m WHERE m.uid in (:uIds) order by m.date desc limit :size offset :offset",
            nativeQuery = true)
    List<Measurement> findAllByUIdInWithPaging(@Param("uIds") List<String> uIds,
                                               @Param("size") int size,
                                               @Param("offset") int offset);

    @Modifying
    @Query(value = "delete from measurements where uid = :uid", nativeQuery = true)
    void deleteByUid(@Param("uid") String uid);
}
