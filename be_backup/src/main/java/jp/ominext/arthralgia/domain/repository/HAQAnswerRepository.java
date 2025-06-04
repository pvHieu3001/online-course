package jp.ominext.arthralgia.domain.repository;

import jp.ominext.arthralgia.domain.model.HAQAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;


@Repository
public interface HAQAnswerRepository extends JpaRepository<HAQAnswer, Integer> {
    @Query(value = "SELECT * FROM haq_answers ha " +
            "WHERE date(ha.date) = date(:date) " +
            "AND ha.uid = :uid " +
            "ORDER BY ha.date desc LIMIT :size",
            nativeQuery = true)
    List<HAQAnswer> findByDateAndUId(@Param("date") Date date,
                                     @Param("uid") String uId,
                                     @Param("size") int size);

    @Query(value = "SELECT * FROM haq_answers ha WHERE ha.uid in (:uIds) " +
            "ORDER BY ha.date desc limit :size offset :offset",
            nativeQuery = true)
    List<HAQAnswer> findAllByUIdInWithPaging(@Param("uIds") List<String> uIds,
                                             @Param("size") int size,
                                             @Param("offset") int offset);

    @Modifying
    @Query(value = "delete from haq_answers where uid = :uid", nativeQuery = true)
    void deleteByUid(@Param("uid") String uid);

    @Modifying
    @Query(value = "delete from haq_answers where uid = :uid AND date(date) = date(:date) ", nativeQuery = true)
    void deleteByUidAndDate(@Param("uid") String uid,
                            @Param("date") Date date);
}
