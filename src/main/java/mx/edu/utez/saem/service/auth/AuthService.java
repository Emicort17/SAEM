package mx.edu.utez.saem.service.auth;

import jakarta.transaction.Transactional;
import mx.edu.utez.saem.config.ApiResponse;
import mx.edu.utez.saem.controller.auth.dto.SignedDto;
import mx.edu.utez.saem.model.administrator.AdministratorBean;
import mx.edu.utez.saem.model.user.UserBean;
import mx.edu.utez.saem.security.jwt.JwtProvider;
import mx.edu.utez.saem.service.administrator.AdministratorService;
import mx.edu.utez.saem.service.user.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AccountExpiredException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@jakarta.transaction.Transactional
public class AuthService {
    private final UserService userService;
    private final AdministratorService administratorService;
    private final JwtProvider provider;
    private final AuthenticationManager manager;

    public AuthService(UserService userService, JwtProvider provider, AuthenticationManager manager, AdministratorService administratorService) {
        this.userService = userService;
        this.provider = provider;
        this.manager = manager;
        this.administratorService = administratorService;
    }

    @Transactional
    public ResponseEntity<ApiResponse> signIn(String emailOrUsername, String password) {
        try {
            Optional<UserBean> foundUser = userService.findUserByEmail(emailOrUsername);
            Optional<AdministratorBean> foundAdmin = administratorService.findAdminByUsername(emailOrUsername);

            if (foundUser.isEmpty() && foundAdmin.isEmpty()) {
                return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "UserNotFound"), HttpStatus.BAD_REQUEST);
            }

            if(foundUser.isPresent()) {
                if(!foundUser.get().getStatus()) {
                    return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "UserNotEnabled"), HttpStatus.BAD_REQUEST);
                }
            }

            Authentication auth = manager.authenticate(
                    new UsernamePasswordAuthenticationToken(emailOrUsername, password)
            );
            SecurityContextHolder.getContext().setAuthentication(auth);
            String token = provider.generateToken(auth);
            /*Payload - DTO (token, attrs)*/

            SignedDto signedDto = new SignedDto(token, "Bearer", foundUser.isPresent()? foundUser:foundAdmin, userService.getAuthorities(emailOrUsername).stream().toList());

            return new ResponseEntity<>(new ApiResponse(signedDto, HttpStatus.OK,"Token generado"), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            String message = "CredentialsMismatch";
            if (e instanceof DisabledException)
                message = "UserDisabled";
            if (e instanceof AccountExpiredException)
                message = "Expiro";
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, message), HttpStatus.UNAUTHORIZED);
        }
    }
}
