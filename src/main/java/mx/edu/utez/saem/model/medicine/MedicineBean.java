package mx.edu.utez.saem.model.medicine;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mx.edu.utez.saem.model.treatment.TreatmentBean;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "medicine")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class MedicineBean {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 50, nullable = false)
    private String name;
    @Column(length = 20, nullable = false)
    private String presentation;
    @Column(length = 20, nullable = false)
    private String manufacturer;

    @ManyToMany
    @JoinTable(name = "treatment_has_medicine",
                joinColumns = @JoinColumn(name = "medicine_id"),
                inverseJoinColumns = @JoinColumn(name = "treatment_id"))
    Set<TreatmentBean> treatmentBeans = new HashSet<>();
}
