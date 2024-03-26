package mx.edu.utez.saem.model.result;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mx.edu.utez.saem.model.diagnostic.DiagnosticBean;
import mx.edu.utez.saem.model.labData.LabDataBean;

import java.time.LocalDate;

@Entity
@Table(name = "result")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ResultBean {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 20, nullable = false)
    private String quantity;
    @Column(columnDefinition = "DATE", nullable = false)
    private LocalDate resultDate;

    @ManyToOne(cascade = CascadeType.ALL, optional = false)
    @JoinColumn(name = "diagnostic_id")
    private DiagnosticBean diagnosticBean;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "lab_data_id", nullable = false)
    private LabDataBean labDataBean;
}
