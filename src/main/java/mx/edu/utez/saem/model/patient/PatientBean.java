package mx.edu.utez.saem.model.patient;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
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
    @Column(columnDefinition = "DATE", nullable = false)
    private LocalDate birthdate;
    @Column(length = 20, nullable = false)
    private String phoneNumber;
    @Column(nullable = false)
    private Integer age;
    @Column(length = 100, nullable = false)
    private String birthState;
    @Column(length = 50, nullable = false)
    private String gender;
    @Column(length = 18, nullable = false)
    private String curp;
}
