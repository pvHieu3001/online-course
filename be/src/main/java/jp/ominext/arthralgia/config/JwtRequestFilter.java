package jp.ominext.arthralgia.config;

import jp.ominext.arthralgia.service.JWTUserDetailsService;
import jp.ominext.arthralgia.service.PatientService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@Log4j2
public class JwtRequestFilter extends OncePerRequestFilter {
    private JWTUserDetailsService jwtUserDetailsService;

    private JwtTokenUtil jwtTokenUtil;

    private PatientService patientService;

    @Autowired
    public JwtRequestFilter(JWTUserDetailsService jwtUserDetailsService,
                            JwtTokenUtil jwtTokenUtil,
                            @Lazy PatientService patientService) {
        this.jwtUserDetailsService = jwtUserDetailsService;
        this.jwtTokenUtil = jwtTokenUtil;
        this.patientService = patientService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            // Get the token validate it
            String jwtToken = jwtTokenUtil.getJwtFromRequest(request);

            if (StringUtils.hasText(jwtToken) && jwtTokenUtil.validateToken(jwtToken)) {
                String username = jwtTokenUtil.getUsernameFromToken(jwtToken);
                LoggedUser loggedUser = this.jwtUserDetailsService.loadUserByUsername(username);

                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                        loggedUser, null, loggedUser.getAuthorities());
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authenticationToken);

                // Update last login time
                patientService.updateLastLogin(loggedUser.getId());
            }
        } catch (Exception e) {
            log.error("Could not set user authentication in security context {}", e.getLocalizedMessage());
        }

        filterChain.doFilter(request, response);
    }

}
