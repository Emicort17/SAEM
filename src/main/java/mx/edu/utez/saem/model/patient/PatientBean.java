package mx.edu.utez.saem.model.patient;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mx.edu.utez.saem.model.medicalRecord.MedicalRecordBean;
import mx.edu.utez.saem.model.user.UserBean;

@Entity
@Table(name = "patient")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PatientBean {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private boolean external;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private UserBean userBean;

    @OneToOne(mappedBy = "patientBean")
    private MedicalRecordBean medicalRecordBean;

    public PatientBean(boolean external, UserBean userBean) {
        this.external = external;
        this.userBean = userBean;
    }
}
