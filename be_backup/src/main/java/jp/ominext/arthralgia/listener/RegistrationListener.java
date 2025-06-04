package jp.ominext.arthralgia.listener;

import jp.ominext.arthralgia.config.SendGridConfig;
import jp.ominext.arthralgia.constant.ErrorMessage;
import jp.ominext.arthralgia.exception.ServiceException;
import jp.ominext.arthralgia.listener.event.BaseEvent;
import jp.ominext.arthralgia.listener.event.NewPasswordEvent;
import jp.ominext.arthralgia.service.EmailService;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.event.EventListener;
import org.springframework.http.HttpStatus;
import org.springframework.mail.MailException;
import org.springframework.stereotype.Component;

@Component
@Log4j2
public class RegistrationListener {

    private EmailService emailService;

    private SendGridConfig sendGridConfig;

    public RegistrationListener(EmailService emailService,
                                SendGridConfig sendGridConfig) {
        this.emailService = emailService;
        this.sendGridConfig = sendGridConfig;
    }

    @EventListener
    public void onRegistrationCompleteEvent(BaseEvent event) {
        String token = event.getToken();

        String recipientAddress = event.getEmail();
        String confirmationUrl
                = event.getAppUrl() + "/registrationConfirm?token=" + token;
        String message = "こんにちは。<br>" +
                "「きょうのカンセツ」アプリのアカウントを作成しました。<br>" +
                "以下のリンクをクリックしてアカウントをアクティベートしてください。<br>";

        try {
            emailService.sendHTML(sendGridConfig.getFrom(), recipientAddress,
                    event.getSubject(),
                    message + confirmationUrl);

        } catch (MailException e){
            throw new ServiceException("Send active mail error!", ErrorMessage.INTERNAL_SERVER_ERROR,
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @EventListener
    public void onNewPasswordCreateEvent(NewPasswordEvent event) {
        String token = event.getToken();

        String recipientAddress = event.getEmail();
        String confirmationUrl
                = event.getAppUrl() + "/newPasswordConfirm?token=" + token;
        String message = "こんにちは。<br>" +
                "「きょうのカンセツ」アプリのアカウントに対してパスワードを再設定しました。<br>" +
                "以下のリンクをクリックして再設定を確認してください。<br>";

        try {
            emailService.sendHTML(sendGridConfig.getFrom(), recipientAddress,
                    event.getSubject(),
                    message + confirmationUrl);
        } catch (MailException e){
            throw new ServiceException("Send new password confirm mail error!", ErrorMessage.INTERNAL_SERVER_ERROR,
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
