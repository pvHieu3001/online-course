package jp.ominext.arthralgia.service;

import jp.ominext.arthralgia.config.LoggedUser;
import jp.ominext.arthralgia.domain.model.Patient;
import jp.ominext.arthralgia.domain.repository.PatientRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;

@Service
@Log4j2
@Qualifier(value = "jwtUserDetailsService")
public class JWTUserDetailsService implements UserDetailsService {
    private final PatientRepository patientRepository;

    @Autowired
    public JWTUserDetailsService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    @Override
    @Transactional
    public LoggedUser loadUserByUsername(String email) {
        Patient patient = patientRepository.findFirstByEmail(email);

        if (patient == null) {
            throw new UsernameNotFoundException("No user found with username: " + email);
        }

        boolean accountNonExpired = true;
        boolean credentialsNonExpired = true;
        boolean accountNonLocked = true;

        return new LoggedUser(patient,
                Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")),
                accountNonExpired,
                accountNonLocked,
                credentialsNonExpired);
    }

}
