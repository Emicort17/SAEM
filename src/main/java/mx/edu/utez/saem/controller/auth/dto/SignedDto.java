package mx.edu.utez.saem.controller.auth.dto;

import lombok.Value;
import org.springframework.security.core.GrantedAuthority;

import java.util.List;

@Value
public class SignedDto {
    String token;
    String tokenType;
    Object user;
    List<? extends GrantedAuthority> authorities;
}
