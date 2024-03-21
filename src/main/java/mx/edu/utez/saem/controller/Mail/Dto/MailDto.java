package mx.edu.utez.saem.controller.Mail.Dto;

public class MailDto {
    private String toEmail;
    private String subject;
    private String body;

    public MailDto(String toEmail, String subject, String body) {
        this.toEmail = toEmail;
        this.subject = subject;
        this.body = body;
    }

    public MailDto() {

    }

    public String getToEmail() {
        return toEmail;
    }

    public void setToEmail(String toEmail) {
        this.toEmail = toEmail;
    }
}
