package mx.edu.utez.saem.controller.doctor.dto;


import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
public class ChangeDocPasswordDto {
    private String card;
    private String oldPassword;
    private String newPassword;



}

