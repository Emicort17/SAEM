package mx.edu.utez.saem.service.Email;
import mx.edu.utez.saem.model.administrator.AdministratorBean;
import mx.edu.utez.saem.model.user.UserBean;
import mx.edu.utez.saem.service.administrator.AdministratorService;
import mx.edu.utez.saem.service.user.UserService;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.Optional;
import java.util.Random;

@Service
public class EmailSenderServiceImpl implements EmailSenderService {
    private final JavaMailSender mailSender;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;


    public EmailSenderServiceImpl(JavaMailSender mailSender, UserService userService, PasswordEncoder passwordEncoder) {
        this.mailSender = mailSender;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    public static String generateRandomPassword() {
        StringBuilder password = new StringBuilder();
        Random random = new Random();

        for (int i = 0; i < 5; i++) {
            password.append(random.nextInt(10));
        }

        for (int i = 0; i < 2; i++) {
            char randomChar = (char) (random.nextInt(26) + 'a');
            password.append(randomChar);
        }

        for (int i = 0; i < password.length(); i++) {
            int randomIndex = random.nextInt(password.length());
            char temp = password.charAt(i);
            password.setCharAt(i, password.charAt(randomIndex));
            password.setCharAt(randomIndex, temp);
        }

        return password.toString();
    }
    @Override
    public Boolean sendEmail_password(String toEmail){
        Optional<UserBean> foundUser = userService.findUserByEmail(toEmail);
        if(toEmail.endsWith("p")){//a ver si asi
            toEmail = toEmail.substring(0, toEmail.length()-1);
        }else if(toEmail.endsWith("d")){
            toEmail = toEmail.substring(0, toEmail.length()-1);
        }
        if(foundUser.isPresent()){
            String saemTempPassword = generateRandomPassword();

            foundUser.get().setPassword(passwordEncoder.encode(saemTempPassword));
            userService.update(foundUser.get());

            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("SAEMcor@gmail.com");
            message.setTo(toEmail);
            message.setText( "Hola "+ foundUser.get().getPersonBean().getName() + " Su nueva contraseña es " + saemTempPassword
                    + ", por favor cambie su contraseña dentro de la aplicación después de iniciar sesión.");
            message.setSubject("Recuperación de contraseña");
            mailSender.send(message);

            return true;
        }
        return false;
    }
}
