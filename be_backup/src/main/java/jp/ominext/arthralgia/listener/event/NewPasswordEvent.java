package jp.ominext.arthralgia.listener.event;

import lombok.Getter;
import org.springframework.context.ApplicationEvent;

import java.util.Locale;

public class NewPasswordEvent extends ApplicationEvent {
    @Getter
    private final String appUrl;
    @Getter
    private final Locale locale;
    @Getter
    private final String email;
    @Getter
    private final String token;
    @Getter
    private final String subject;

    public NewPasswordEvent(String token, String email, String subject, Locale locale, String appUrl) {
        super(token);

        this.token = token;
        this.email = email;
        this.subject = subject;
        this.locale = locale;
        this.appUrl = appUrl;
    }
}
