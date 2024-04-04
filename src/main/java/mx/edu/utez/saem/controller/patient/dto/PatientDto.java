package mx.edu.utez.saem.controller.patient.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mx.edu.utez.saem.model.patient.PatientBean;
import mx.edu.utez.saem.model.user.UserBean;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PatientDto {
    private Long id;
    private boolean external;
    private UserBean userBean;

    public PatientDto(boolean external, UserBean userBean) {
        this.external = external;
        this.userBean = userBean;
    }

    public PatientBean toEntity() {
        PatientBean patientBean = new PatientBean(external, userBean);
        patientBean.setId(this.id);
        return patientBean;
    }


}
