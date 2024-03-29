package mx.edu.utez.saem.model.result;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
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
@JsonIdentityInfo(
        scope = ResultBean.class,
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class ResultBean {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "DATE", nullable = false)
    private LocalDate resultDate;

    @ManyToOne( optional = false)
    @JoinColumn(name = "diagnostic_id")
    private DiagnosticBean diagnosticBean;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "lab_data_id", nullable = false)
    private LabDataBean labDataBean;

    public ResultBean(LocalDate resultDate, DiagnosticBean diagnosticBean, LabDataBean labDataBean) {
        this.resultDate = resultDate;
        this.diagnosticBean = diagnosticBean;
        this.labDataBean = labDataBean;
    }
}
