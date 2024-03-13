package mx.edu.utez.saem.model.administrator;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "administrator")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AdministratorBean {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 5, nullable = false)
    private String user;
    @Column(length = 60, nullable = false)
    private String password;

    public AdministratorBean(String user, String password) {
        this.user = user;
        this.password = password;
    }
}
