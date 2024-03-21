package mx.edu.utez.saem.controller.doctor.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mx.edu.utez.saem.model.doctor.DoctorBean;
import mx.edu.utez.saem.model.user.UserBean;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class DoctorDto {
    private Long id;
    private String card;
    private UserBean userBean;

    public DoctorBean toEntity() {
        DoctorBean doctorBean = new DoctorBean(card, userBean);
        doctorBean.setId(this.id);
        return doctorBean;
    }
}
