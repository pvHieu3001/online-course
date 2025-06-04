package jp.ominext.arthralgia.domain.repository;

import jp.ominext.arthralgia.domain.model.BarometricPressure;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BarometricPressureRepository extends JpaRepository<BarometricPressure, String> {
    @Query(value = "SELECT * FROM barometric_pressures bp " +
            "WHERE bp.uid in (:uIds) order by bp.date desc limit :size offset :offset",
            nativeQuery = true)
    List<BarometricPressure> findAllByUIdInWithPaging(@Param("uIds") List<String> uIds,
                                                      @Param("size") int size,
                                                      @Param("offset") int offset);

    @Query(value = "SELECT count(*) FROM barometric_pressures bp WHERE date(bp.date) = date(:date)", nativeQuery = true)
    int countByDate(String date);

    @Query(value = "SELECT * FROM barometric_pressures bp WHERE date(bp.date) = date(:date) " +
            "and uid = :uid order by bp.date asc limit :size",
            nativeQuery = true)
    List<BarometricPressure> getTopByDateAndUid(String date, String uid, int size);

    @Procedure(procedureName = "insert_symptoms_data")
    int insertFullSymptomsByDate(String date);

    @Modifying
    @Query(value = "delete from barometric_pressures where uid = :uid", nativeQuery = true)
    void deleteByUid(@Param("uid") String uid);
}
