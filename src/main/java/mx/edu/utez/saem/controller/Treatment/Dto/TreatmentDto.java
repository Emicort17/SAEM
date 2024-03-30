package mx.edu.utez.saem.controller.Treatment.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mx.edu.utez.saem.model.diagnostic.DiagnosticBean;
import mx.edu.utez.saem.model.medicine.MedicineBean;
import mx.edu.utez.saem.model.treatment.TreatmentBean;

import java.time.LocalDate;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class TreatmentDto {

    private Long id;
    private LocalDate treatDate;
    private String indications;
    private DiagnosticBean diagnosticBean;
    private Set<MedicineBean> medicineBeanSet;

    public TreatmentBean toEntity() {
        TreatmentBean treatmentBean = new TreatmentBean(treatDate, indications, diagnosticBean,medicineBeanSet);
        treatmentBean.setId(this.id);
        return treatmentBean;
    }
}
