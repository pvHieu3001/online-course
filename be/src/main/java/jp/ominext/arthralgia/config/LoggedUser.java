package jp.ominext.arthralgia.config;

import jp.ominext.arthralgia.domain.model.Patient;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Date;
import java.util.Set;

@Data
public class LoggedUser implements UserDetails {
    private String id;
    private String password;
    private final String username;
    private final Set<GrantedAuthority> authorities;
    private final boolean accountNonExpired;
    private final boolean accountNonLocked;
    private final boolean credentialsNonExpired;
    private final boolean enabled;
    private final Date lastLogin;

    public LoggedUser(Patient patient, Set<GrantedAuthority> authorities,
                      boolean accountNonExpired,
                      boolean accountNonLocked,
                      boolean credentialsNonExpired) {
        this.username = patient.getEmail();
        this.password = patient.getPassword();
        this.id = patient.getId();
        this.authorities = authorities;
        this.accountNonExpired = accountNonExpired;
        this.accountNonLocked = accountNonLocked;
        this.credentialsNonExpired = credentialsNonExpired;
        this.enabled = patient.isEnabled();
        this.lastLogin = patient.getLastLogin();
    }
}
