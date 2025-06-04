package jp.ominext.arthralgia.domain.repository;

import jp.ominext.arthralgia.domain.model.AffectedArea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface AffectedAreaRepository extends JpaRepository<AffectedArea, Integer> {
    @Query(value = "SELECT * FROM affected_areas aa WHERE aa.date >= :startDate AND aa.date <= :endDate AND aa.uid = :uid",
            nativeQuery = true)
    List<AffectedArea> findAllByDateBetweenAndUId(@Param("startDate") Date startDate,
                                                  @Param("endDate") Date endDate,
                                                  @Param("uid") String uId);

    @Query(value = "SELECT * FROM affected_areas aa " +
            "WHERE date(aa.date) = date(:date) " +
            "AND aa.uid = :uid " +
            "AND aa.recorder = :recorder " +
            "ORDER BY aa.date desc LIMIT :size",
            nativeQuery = true)
    List<AffectedArea> findByDateAndUIdAndRecorder(@Param("date") Date date,
                                       @Param("uid") String uId,
                                       @Param("recorder") String recorder,
                                       @Param("size") int size);

    @Query(value = "SELECT * FROM affected_areas aa WHERE aa.uid in (:uIds) " +
            "order by aa.date, aa.recorder, aa.area desc limit :size offset :offset",
            nativeQuery = true)
    List<AffectedArea> findAllByUIdInWithPaging(@Param("uIds") List<String> uIds,
                                                @Param("size") int size,
                                                @Param("offset") int offset);

    @Query(value = "SELECT * FROM affected_areas aa "
                + "WHERE aa.date >= :startDate AND aa.date <= :endDate "
                + "AND aa.uid = :uid "
                + "AND aa.area = :area "
                + "AND aa.recorder = :recorder",
            nativeQuery = true)
    AffectedArea checkExistLoggingArea(@Param("startDate") Date startDate,
                                       @Param("endDate") Date endDate,
                                       @Param("uid") String uId,
                                       @Param("area") String area,
                                       @Param("recorder") String recorder);

    @Modifying
    @Query(value = "delete from affected_areas where uid = :uid", nativeQuery = true)
    void deleteByUid(@Param("uid") String uid);

    @Modifying
    @Query(value = "delete from affected_areas where uid = :uid and date(date) = date(:date) and recorder = :recorder",
            nativeQuery = true)
    void deleteByUidAndDateAndRecorder(@Param("uid") String uid,
                            @Param("date") Date date,
                            @Param("recorder") String recorder);
}
