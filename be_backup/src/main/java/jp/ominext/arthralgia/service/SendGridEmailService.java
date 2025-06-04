package jp.ominext.arthralgia.service;

import com.sendgrid.Content;
import com.sendgrid.Email;
import com.sendgrid.Mail;
import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import jp.ominext.arthralgia.constant.ErrorMessage;
import jp.ominext.arthralgia.exception.ServiceException;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@Log4j2
public class SendGridEmailService implements EmailService {
    private SendGrid sendGridClient;

    @Autowired
    public SendGridEmailService(SendGrid sendGridClient) {
        this.sendGridClient = sendGridClient;
    }

    @Override
    public void sendText(String from, String to, String subject, String body) {
        Response response = sendEmail(from, to, subject, new Content("text/plain", body));
        log.info("Send mail {} Status Code: {}", to, response.getStatusCode());
    }

    @Override
    public void sendHTML(String from, String to, String subject, String body) {
        Response response = sendEmail(from, to, subject, new Content("text/html", body));
        log.info("Send mail {} Status Code: {}", to, response.getStatusCode());
    }

    private Response sendEmail(String from, String to, String subject, Content content) {
        Mail mail = new Mail(new Email(from), subject, new Email(to), content);
        Request request = new Request();
        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            return this.sendGridClient.api(request);
        } catch (IOException ex) {
            throw new ServiceException("Send mail error! " + ex.getLocalizedMessage(),
                    ErrorMessage.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
