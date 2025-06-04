package jp.ominext.arthralgia.domain.repository;

import jp.ominext.arthralgia.domain.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberRepository extends JpaRepository<Member, String> {
    Member findFirstById(String id);

    Member findFirstByParentUidAndName(String patientId, String name);

    int countAllByParentUidAndNameStartingWith(String patientId, String name);

    @Query(value = "SELECT * FROM members m WHERE m.parent_uid = :patientUid and m.name = :name",
            nativeQuery = true)
    List<Member> getByPatientUidAndName(String patientUid, String name);

    @Query(value = "SELECT * FROM members m WHERE m.parent_uid = :patientUid",
            nativeQuery = true)
    List<Member> findAllByPatientUid(String patientUid);

    Member findFirstByUid(String uId);
}
