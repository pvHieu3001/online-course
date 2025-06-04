package jp.ominext.arthralgia.config;

import com.sendgrid.SendGrid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {
    private UserDetailsService userDetailsService;

    private SendGridConfig sendGridConfig;

    private JwtAuthenticationEntryPoint unauthorizedHandler;

    private JwtRequestFilter jwtRequestFilter;

    @Autowired
    public SpringSecurityConfig(@Qualifier("jwtUserDetailsService") UserDetailsService userDetailsService,
                                SendGridConfig sendGridConfig,
                                JwtAuthenticationEntryPoint unauthorizedHandler,
                                JwtRequestFilter jwtRequestFilter) {
        this.userDetailsService = userDetailsService;
        this.sendGridConfig = sendGridConfig;
        this.unauthorizedHandler = unauthorizedHandler;
        this.jwtRequestFilter = jwtRequestFilter;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .cors().and()
                .csrf().disable() // JWT Token is immune
            .authorizeRequests()
                .antMatchers("/registration", "/registrationConfirm", "/extendActiveTime", "/resendActiveEmail").permitAll()
                .antMatchers("/newPassword","/newPasswordConfirm").permitAll()
                .antMatchers("/login", "/logout").permitAll()
                .antMatchers("/authenticate").permitAll()
                .antMatchers("/swagger-ui/*", "/api-docs*").permitAll() //Swagger-ui
                .anyRequest().authenticated()
                .and()
                    // Handle unauthenticated request
                    .exceptionHandling().authenticationEntryPoint(unauthorizedHandler)
                .and()
                    .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) //no session will be created or used
                .and()
                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
        http.headers().xssProtection().xssProtectionEnabled(true);

        //http.requiresChannel().anyRequest().requiresSecure();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) {
        auth.authenticationProvider(authProvider());
    }

    @Bean
    public DaoAuthenticationProvider authProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public SessionRegistry sessionRegistry() {
        return new SessionRegistryImpl();
    }

    @Bean
    public SendGrid sendGridClient(){
        return new SendGrid(sendGridConfig.getKey());
    }
}
