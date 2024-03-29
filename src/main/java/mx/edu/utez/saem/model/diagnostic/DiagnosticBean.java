package mx.edu.utez.saem.model.diagnostic;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
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
@JsonIdentityInfo(
        scope = DiagnosticBean.class,
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class DiagnosticBean {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "DATE", nullable = false)
    private LocalDate startDate;
    @Column(length = 20, nullable = false)
    private String result;
    @Column(length = 20, nullable = false)
    private String disease;

    @ManyToOne(cascade = CascadeType.ALL, optional = false)
    @JoinColumn(name = "medicalRecord_id", referencedColumnName = "id")
    private MedicalRecordBean medicalRecordBean;

    @ManyToOne(cascade = CascadeType.ALL, optional = false)
    @JoinColumn(name = "doctor_id", referencedColumnName = "id")
    private DoctorBean doctorBean;

    @OneToMany(mappedBy = "diagnosticBean", cascade = CascadeType.ALL )
    private Set<TreatmentBean> treatmentBeans;

    @OneToMany(mappedBy = "diagnosticBean", cascade = CascadeType.ALL )
    private Set<ResultBean> resultBeans;

    public DiagnosticBean(LocalDate startDate, String result, String disease, MedicalRecordBean medicalRecordBean, DoctorBean doctorBean) {
        this.startDate = startDate;
        this.result = result;
        this.disease = disease;
        this.medicalRecordBean = medicalRecordBean;
        this.doctorBean = doctorBean;
    }
}
