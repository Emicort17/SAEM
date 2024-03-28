package mx.edu.utez.saem.controller.diagnostic.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mx.edu.utez.saem.model.diagnostic.DiagnosticBean;
import mx.edu.utez.saem.model.doctor.DoctorBean;
import mx.edu.utez.saem.model.medicalRecord.MedicalRecordBean;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class DiagnosticDto {
    private Long id;
    private LocalDate startDate;
    private String result;
    private String disease;
    private MedicalRecordBean medicalRecordBean;
    private DoctorBean doctorBean;

    public DiagnosticBean toEntity() {
        DiagnosticBean diagnosticBean = new DiagnosticBean(startDate, result, disease, medicalRecordBean, doctorBean);
        diagnosticBean.setId(this.id);
        return diagnosticBean;
    }
}
