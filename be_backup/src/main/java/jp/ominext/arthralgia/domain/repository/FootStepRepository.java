package jp.ominext.arthralgia.domain.repository;

import jp.ominext.arthralgia.domain.model.Footstep;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface FootStepRepository extends JpaRepository<Footstep, String> {
    @Query(value = "SELECT * FROM footsteps ft WHERE ft.date >= :startDate AND ft.date <= :endDate AND ft.uid = :uid",
            nativeQuery = true)
    Footstep findFirstByDateBetweenAndUId(@Param("startDate") Date startDate,
                                   @Param("endDate") Date endDate,
                                   @Param("uid") String uId);

    @Query(value = "SELECT * FROM footsteps ft WHERE ft.date >= :startDate AND ft.date <= :endDate AND ft.uid = :uid",
            nativeQuery = true)
    List<Footstep> findAllByDateBetweenAndUId(@Param("startDate") Date startDate,
                                                @Param("endDate") Date endDate,
                                                @Param("uid") String uId);

    @Query(value = "SELECT * FROM footsteps ft WHERE ft.uid in (:uIds) order by ft.date desc limit :size offset :offset",
            nativeQuery = true)
    List<Footstep> findAllByUIdInWithPaging(@Param("uIds") List<String> uIds,
                                            @Param("size") int size,
                                            @Param("offset") int offset);

    @Modifying
    @Query(value = "delete from footsteps where uid = :uid", nativeQuery = true)
    void deleteByUid(@Param("uid") String uid);
}
