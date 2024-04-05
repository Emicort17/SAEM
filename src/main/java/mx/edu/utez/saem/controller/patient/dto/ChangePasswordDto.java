package mx.edu.utez.saem.controller.patient.dto;


import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
public class ChangePasswordDto {
    private String curp;
    private String oldPassword;
    private String newPassword;



}

