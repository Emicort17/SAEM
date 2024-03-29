package mx.edu.utez.saem.controller.result.Dto;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mx.edu.utez.saem.model.diagnostic.DiagnosticBean;
import mx.edu.utez.saem.model.labData.LabDataBean;
import mx.edu.utez.saem.model.result.ResultBean;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
@JsonIdentityInfo(
        scope = ResultBean.class,
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class ResultDto {
    private Long id;
    private LocalDate resultDate;
    private DiagnosticBean diagnosticBean;
    private LabDataBean labDataBean;

    public ResultBean toEntity() {
        ResultBean resultBean = new ResultBean(resultDate, diagnosticBean, labDataBean);
        resultBean.setId(this.id);
        return resultBean;
    }

}
