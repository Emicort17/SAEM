package mx.edu.utez.saem.controller.auth.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignDto {
    @NotBlank
    @NotEmpty
    private String emailOrUsername;
    @NotBlank
    @NotEmpty
    private String password;
}
