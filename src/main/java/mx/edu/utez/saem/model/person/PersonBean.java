package mx.edu.utez.saem.model.person;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mx.edu.utez.saem.model.address.AddressBean;
import mx.edu.utez.saem.model.user.UserBean;

import java.time.LocalDate;

@Entity
@Table(name = "person")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PersonBean {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 20, nullable = false)
    private String name;
    @Column(length = 20, nullable = false)
    private String middleName;
    @Column(length = 20, nullable = false)
    private String lastName;
    @Column(columnDefinition = "DATE", nullable = false)
    private LocalDate birthdate;
    @Column(length = 20, nullable = false)
    private String birthplace;
    @Column(length = 18, nullable = false)
    private String curp;
    @Column(length = 10, nullable = false)
    private String phoneNumber;
    @Column(length = 6, nullable = false)
    private String sex;

    @OneToOne(mappedBy = "personBean")
    private UserBean userBean;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    private AddressBean addressBean;

    public PersonBean(String name, String middleName, String lastName, LocalDate birthdate, String birthplace, String curp, String phoneNumber, String sex) {
        this.name = name;
        this.middleName = middleName;
        this.lastName = lastName;
        this.birthdate = birthdate;
        this.birthplace = birthplace;
        this.curp = curp;
        this.phoneNumber = phoneNumber;
        this.sex = sex;
    }
}
