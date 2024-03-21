package mx.edu.utez.saem.controller.Mail;

import lombok.AllArgsConstructor;
import mx.edu.utez.saem.config.ApiResponse;
import mx.edu.utez.saem.service.Email.EmailSenderService;
import mx.edu.utez.saem.controller.Mail.Dto.MailDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/saem/auth/recover")
@CrossOrigin(origins = {"*"})
public class EmailSenderController {
    private final EmailSenderService service;

    public EmailSenderController(EmailSenderService service) {
        this.service = service;
    }

    @PostMapping("/send-mail")
    public ResponseEntity<ApiResponse> sendEmail(@RequestBody MailDto email) {
        if(this.service.sendEmail_password(email.getToEmail())){
            return new ResponseEntity<>(new ApiResponse(HttpStatus.OK, false, "Correo enviado correctamente"), HttpStatus.OK);
        }
        return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "error al mandar el correo"), HttpStatus.BAD_REQUEST);
    }
}
