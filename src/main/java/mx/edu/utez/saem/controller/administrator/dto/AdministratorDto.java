package mx.edu.utez.saem.controller.administrator.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mx.edu.utez.saem.model.administrator.AdministratorBean;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AdministratorDto {
    private Long id;
    private String user;
    private String password;

    public AdministratorBean toEntity() {
        AdministratorBean administratorBean = new AdministratorBean(user, password);
        administratorBean.setId(this.id);
        return administratorBean;
    }
}
