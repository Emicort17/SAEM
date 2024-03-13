package mx.edu.utez.saem.controller.auth;

import mx.edu.utez.saem.config.ApiResponse;
import mx.edu.utez.saem.controller.auth.dto.SignDto;
import mx.edu.utez.saem.service.auth.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"*"})
public class AuthController {
    private final AuthService service;

    public AuthController(AuthService service) {
        this.service = service;
    }
    @PostMapping("/signIn")
    public ResponseEntity<ApiResponse> signIn(@RequestBody SignDto dto){
        return service.signIn(dto.getEmailOrUsername(), dto.getPassword());
    }
}