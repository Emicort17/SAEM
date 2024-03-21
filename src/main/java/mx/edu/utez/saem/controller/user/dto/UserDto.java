package mx.edu.utez.saem.controller.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mx.edu.utez.saem.model.person.PersonBean;
import mx.edu.utez.saem.model.user.UserBean;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserDto {
    private Long id;
    private String email;
    private String password;
    private Boolean status;
    private PersonBean personBean;

    public UserBean toEntity() {
        UserBean userBean = new UserBean(email, password, status, personBean);
        userBean.setId(this.id);
        return userBean;
    }
}
