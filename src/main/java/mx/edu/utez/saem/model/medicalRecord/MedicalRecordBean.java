package mx.edu.utez.saem.model.medicalRecord;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mx.edu.utez.saem.model.monitoring.MonitoringBean;

import java.time.LocalDate;

@Entity
@Table(name = "medical_record")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class MedicalRecordBean {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 4, nullable = false)
    private String disease;
    @Column(length = 8, nullable = false)
    private String result;
    @Column(columnDefinition = "DATE", nullable = false)
    private LocalDate date;
    @Column(nullable = false)
    private Integer year;

    @OneToOne(mappedBy = "medicalRecordBean")
    private MonitoringBean monitoringBean;
}
