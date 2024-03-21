package mx.edu.utez.saem.model.treatment;

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
public class TreatmentBean {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "DATE", nullable = false)
    private LocalDate treatDate;
    @Column(length = 30, nullable = false)
    private String indications;

    @ManyToOne(cascade = CascadeType.ALL, optional = false)
    @JoinColumn(name = "treatment_id")
    private DiagnosticBean diagnosticBean;

    @ManyToMany(mappedBy = "treatmentBeans")
    Set<MedicineBean> medicineBeans;
}
