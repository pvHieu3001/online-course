package online.course.market.service;

import online.course.market.config.LoggedUser;
import online.course.market.domain.model.User;
import online.course.market.domain.repository.UserRepository;
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
    private final UserRepository patientRepository;

    @Autowired
    public JWTUserDetailsService(UserRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    @Override
    @Transactional
    public LoggedUser loadUserByUsername(String email) {
        User patient = patientRepository.findFirstByEmail(email);

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
