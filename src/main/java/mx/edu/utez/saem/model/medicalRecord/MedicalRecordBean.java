package mx.edu.utez.saem.model.medicalRecord;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
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
@JsonIdentityInfo(
        scope = MedicalRecordBean.class,
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class MedicalRecordBean {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 20, nullable = false)
    private String number;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "patient_id", referencedColumnName = "id", nullable = false)
    private PatientBean patientBean;

    @OneToMany(mappedBy = "medicalRecordBean", cascade = CascadeType.ALL)
    @JsonManagedReference
    private Set<DiagnosticBean> diagnosticBeans;

    public MedicalRecordBean(String number, PatientBean patientBean) {
        this.number = number;
        this.patientBean = patientBean;
    }
}
