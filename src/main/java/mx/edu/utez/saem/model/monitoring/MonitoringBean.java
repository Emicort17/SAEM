package mx.edu.utez.saem.model.monitoring;

import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mx.edu.utez.saem.model.medicalRecord.MedicalRecordBean;

import java.time.LocalDate;

@Entity
@Table(name = "monitoring")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class MonitoringBean {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private Integer viralLoad;
    @Column(nullable = false)
    private Integer ALT;
    @Column(nullable = false)
    private Integer antigen;
    @Column(nullable = false)
    private Integer AST;
    @Column(nullable = false)
    private Integer creatinine;
    @Column(nullable = false)
    private Integer platelets;
    @Column(length = 50, nullable = false)
    private String antiretroviral;
    @Column(columnDefinition = "DATE", nullable = false)
    private LocalDate startDate;
    @Column(columnDefinition = "DATE", nullable = false)
    private LocalDate resultDate;
    @Column(length = 8, nullable = false)
    private String resultViralLoad;
    @Column(columnDefinition = "DATE", nullable = false)
    private LocalDate referenceDate;
    @Column(columnDefinition = "DATE", nullable = false)
    private LocalDate counterReferenceDate;
    @Column(length = 50, nullable = false)
    private String observations;

    @OneToOne
    private MedicalRecordBean medicalRecordBean;
}
