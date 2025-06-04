package jp.ominext.arthralgia.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import jp.ominext.arthralgia.utils.Dates;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
@Log4j2
public class JwtTokenUtil implements Serializable {

    private static final long serialVersionUID = -2550185165626007488L;

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expirationInMs}")
    private int expiration;

    /**
     * Get JWT token
     * @param request {@link HttpServletRequest}
     * @return token
     */
    public String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7, bearerToken.length());
        }
        return null;
    }

    /**
     * Retrieve username from jwt token
     * @param token Token
     * @return Username
     */
    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    /**
     * Retrieve userId from jwt token
     * @param token Token
     * @param claimKey Custom key
     * @return UserId
     */
    public String getUserIdFromToken(String token, String claimKey) {
        return getCustomClaimFromToken(token, claimKey);
    }

    /**
     * Retrieve expiration date from jwt token
     * @param token Token
     * @return {@link Date}
     */
    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }


    /**
     *
     * @param token Token
     * @param claimsResolver Claims info resolver
     * @return {@link T}
     */
    private  <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    /**
     *
     * @param token Token
     * @param customKey Custom key
     * @return Custom value
     */
    private String getCustomClaimFromToken(String token, String customKey) {
        final Claims claims = getAllClaimsFromToken(token);
        return (String) claims.get(customKey);
    }

    /**
     * Retrieve information from token
     * @param token Token
     * @return {@link Claims}
     */
    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
    }
    //check if the token has expired
    private Boolean isTokenExpired(String token) {
        final Date expirationDate = getExpirationDateFromToken(token);
        return expirationDate.before(new Date());
    }

    /**
     * Generate Token for user
     * @param loggedUser {@link LoggedUser}
     * @return token
     */
    public String generateToken(LoggedUser loggedUser) {
        Map<String, Object> claims = new HashMap<>();

        // Add claim into
        claims.put("id", loggedUser.getId());

        if (loggedUser.getLastLogin() != null) {
            claims.put("last_login", Dates.format(loggedUser.getLastLogin(), Dates.ISO_ZONED_DATETIME_FORMAT));
        }

        return doGenerateToken(claims, loggedUser.getUsername());
    }

    /**
     * Generate Token
     * @param claims Claim
     * @param subject Subject
     * @return token
     */
    private String doGenerateToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                //.setExpiration(new Date(System.currentTimeMillis() + expiration)) Non expired
                .signWith(SignatureAlgorithm.HS512, secret).compact();
    }

    /**
     * Validate token
     * @param token Token
     * @return {@link Boolean}
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(secret).parseClaimsJws(token);
            return true;
        } catch (SignatureException ex) {
            log.error("Invalid JWT signature");
        } catch (MalformedJwtException ex) {
            log.error("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            log.error("Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            log.error("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            log.error("JWT claims string is empty.");
        }
        return false;
    }
}
