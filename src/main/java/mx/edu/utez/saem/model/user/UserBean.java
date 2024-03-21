package mx.edu.utez.saem.model.user;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mx.edu.utez.saem.model.doctor.DoctorBean;
import mx.edu.utez.saem.model.person.PersonBean;

@Entity
@Table(name = "user")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserBean {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 50, nullable = false)
    private String email;
    @Column(length = 60, nullable = false)
    private String password;
    @Column(nullable = false)
    private Boolean status;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "person_id", referencedColumnName = "id", nullable = false)
    private PersonBean personBean;

    @OneToOne(mappedBy = "userBean")
    private DoctorBean doctorBean;

    public UserBean(String email, String password, Boolean status, PersonBean personBean) {
        this.email = email;
        this.password = password;
        this.status = status;
        this.personBean = personBean;
    }
}
