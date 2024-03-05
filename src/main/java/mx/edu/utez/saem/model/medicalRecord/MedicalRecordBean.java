package mx.edu.utez.saem.model.medicalRecord;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mx.edu.utez.saem.model.diagnostic.DiagnosticBean;
import mx.edu.utez.saem.model.patient.PatientBean;

import java.util.Set;


@Entity
@Table(name = "medical_record")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class MedicalRecordBean {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 20, nullable = false)
    private String number;

    @OneToOne
    private PatientBean patientBean;

    @OneToMany(mappedBy = "medicalRecordBean", cascade = CascadeType.ALL )
    private Set<DiagnosticBean> diagnosticBeans;
}
