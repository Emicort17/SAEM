package mx.edu.utez.saem.controller.medicalRecord.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mx.edu.utez.saem.model.medicalRecord.MedicalRecordBean;
import mx.edu.utez.saem.model.patient.PatientBean;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class MedicalRecordDto {
    private Long id;
    private String number;
    private PatientBean patientBean;

    public MedicalRecordBean toEntity() {
        MedicalRecordBean medicalRecordBean = new MedicalRecordBean(number, patientBean);
        medicalRecordBean.setId(this.id);
        return medicalRecordBean;
    }
}
