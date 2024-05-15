package mx.edu.utez.saem.model.treatment;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mx.edu.utez.saem.model.diagnostic.DiagnosticBean;
import mx.edu.utez.saem.model.medicine.MedicineBean;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "treatment")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@JsonIdentityInfo(
        scope = TreatmentBean.class,
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class TreatmentBean {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "DATE", nullable = false)
    private LocalDate treatDate;
    @Column(columnDefinition = "TEXT", nullable = false)
    private String indications;

    @ManyToOne(optional = false)
    @JoinColumn(name = "treatment_id")
    private DiagnosticBean diagnosticBean;

    @ManyToMany(mappedBy = "treatmentBeans")
    Set<MedicineBean> medicineBeans;

    public TreatmentBean(LocalDate treatDate, String indications, DiagnosticBean diagnosticBean, Set<MedicineBean> medicineBeans) {
        this.treatDate = treatDate;
        this.indications = indications;
        this.diagnosticBean = diagnosticBean;
        this.medicineBeans = medicineBeans;
    }
}
