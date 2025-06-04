package jp.ominext.arthralgia.service;

import jp.ominext.arthralgia.domain.model.VerificationToken;
import jp.ominext.arthralgia.domain.repository.VerificationTokenRepository;
import jp.ominext.arthralgia.utils.Dates;
import org.apache.commons.lang3.time.DateUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Service
public class VerificationTokenService {
    private static final int EXPIRATION_HOUR = 24;

    private final VerificationTokenRepository verificationTokenRepository;

    public VerificationTokenService(VerificationTokenRepository verificationTokenRepository) {
        this.verificationTokenRepository = verificationTokenRepository;
    }

    @Transactional
    public VerificationToken createVerificationToken(String token, String uid){
        Date now = Dates.now();
        Date expiredDate = DateUtils.addHours(now, EXPIRATION_HOUR);
        return verificationTokenRepository.save(new VerificationToken(token, expiredDate, uid));
    }

    @Transactional
    public VerificationToken findFirstByToken(String token){
        return verificationTokenRepository.findFirstByToken(token);
    }

    @Transactional
    public VerificationToken findFirstByUid(String uid){
        return verificationTokenRepository.findFirstByToken(uid);
    }

    @Transactional
    public void delete(VerificationToken verificationToken) {
        verificationTokenRepository.delete(verificationToken);
    }

    @Transactional
    public void extendActiveTime(VerificationToken verificationToken) {
        verificationToken.setExpiredDate(DateUtils.addHours(Dates.now(), EXPIRATION_HOUR));
        verificationTokenRepository.save(verificationToken);
    }
}
