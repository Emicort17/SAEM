package mx.edu.utez.saem.model.medicine;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
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
@JsonIdentityInfo(
        scope = MedicineBean.class,
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
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
    @JsonIgnore
    Set<TreatmentBean> treatmentBeans = new HashSet<>();

    public MedicineBean(String name, String presentation, String manufacturer) {
        this.name = name;
        this.presentation = presentation;
        this.manufacturer = manufacturer;
    }
}
