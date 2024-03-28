package mx.edu.utez.saem.model.doctor;

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
import mx.edu.utez.saem.model.user.UserBean;

import java.util.Set;

@Entity
@Table(name = "doctor")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class DoctorBean {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 20, nullable = false)
    private String card;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    @JsonManagedReference("user-doctor")
    private UserBean userBean;

    @OneToMany(mappedBy = "doctorBean", cascade = CascadeType.ALL )
    private Set<DiagnosticBean> diagnosticBeans;

    public DoctorBean(String card, UserBean userBean) {
        this.card = card;
        this.userBean = userBean;
    }
}
