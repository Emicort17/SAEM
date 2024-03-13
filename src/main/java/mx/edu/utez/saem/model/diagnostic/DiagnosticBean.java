package mx.edu.utez.saem.model.diagnostic;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mx.edu.utez.saem.model.doctor.DoctorBean;
import mx.edu.utez.saem.model.medicalRecord.MedicalRecordBean;
import mx.edu.utez.saem.model.result.ResultBean;
import mx.edu.utez.saem.model.treatment.TreatmentBean;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "diagnostic")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class DiagnosticBean {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "DATE", nullable = false)
    private LocalDate startDate;
    @Column(length = 20, nullable = false)
    private String result;

    @ManyToOne(cascade = CascadeType.ALL, optional = false)
    @JoinColumn(name = "medicalRecord_id")
    private MedicalRecordBean medicalRecordBean;

    @ManyToOne(cascade = CascadeType.ALL, optional = false)
    @JoinColumn(name = "doctor_id")
    private DoctorBean doctorBean;

    @OneToMany(mappedBy = "diagnosticBean", cascade = CascadeType.ALL )
    private Set<TreatmentBean> treatmentBeans;

    @OneToMany(mappedBy = "diagnosticBean", cascade = CascadeType.ALL )
    private Set<ResultBean> resultBeans;
}
