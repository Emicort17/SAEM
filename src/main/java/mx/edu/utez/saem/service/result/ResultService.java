package mx.edu.utez.saem.service.result;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import mx.edu.utez.saem.config.ApiResponse;
import mx.edu.utez.saem.model.diagnostic.DiagnosticBean;
import mx.edu.utez.saem.model.diagnostic.DiagnosticRepository;
import mx.edu.utez.saem.model.labData.LabDataBean;
import mx.edu.utez.saem.model.labData.LabDataRepository;
import mx.edu.utez.saem.model.result.ResultBean;
import mx.edu.utez.saem.model.result.ResultRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class ResultService {
    private final ResultRepository repository;
    private final LabDataRepository labDataRepository;
    private final DiagnosticRepository diagnosticRepository;

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getOne(Long id) {
        Optional<ResultBean> optionalResultBean = repository.findById(id);
        if (optionalResultBean.isPresent()) {
            Long id2 = optionalResultBean.get().getId();
            System.out.println(id);
            ResultBean LabData = repository.getOne(id2);
            return new ResponseEntity<>(new ApiResponse(LabData, HttpStatus.OK, "Recuperado"), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ApiResponse(null, HttpStatus.NOT_FOUND, "No encontrado"), HttpStatus.NOT_FOUND);
        }
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> save(ResultBean result){
        DiagnosticBean diagnosticBean = diagnosticRepository.findById(result.getDiagnosticBean().getId())
                .orElseThrow(() -> new EntityNotFoundException("Diagnostico no encontrado con el número: " + result.getDiagnosticBean().getId().longValue()));

        LabDataBean savedLabDataBean = labDataRepository.save(result.getLabDataBean());

        result.setDiagnosticBean(diagnosticBean);
        result.setLabDataBean(savedLabDataBean);

        ResultBean saveResult = repository.save(result);
        return new ResponseEntity<>(new ApiResponse(saveResult, HttpStatus.OK, "Guardado Exitosamente"), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> update(ResultBean result) {
        Optional<ResultBean> foundResultOpt = repository.findById(result.getId());
        if (foundResultOpt.isPresent()) {
            ResultBean foundResult = foundResultOpt.get();

            foundResult.setResultDate(result.getResultDate());

            DiagnosticBean diagnostic = diagnosticRepository.findById(result.getDiagnosticBean().getId())
                    .orElseThrow(() -> new EntityNotFoundException("Diagnostico no encontrado"));
            foundResult.setDiagnosticBean(diagnostic);

            LabDataBean labData = labDataRepository.findById(result.getLabDataBean().getId())
                    .orElseThrow(() -> new EntityNotFoundException("Datos de laboratorio no encontrados"));
            labData.setAlt(result.getLabDataBean().getAlt());
            labData.setAntigen(result.getLabDataBean().getAntigen());
            labData.setAst(result.getLabDataBean().getAst());
            labData.setCreatinine(result.getLabDataBean().getCreatinine());
            labData.setPlatelets(result.getLabDataBean().getPlatelets());
            labData.setViralLoad(result.getLabDataBean().getViralLoad());

            foundResult.setLabDataBean(labData);

            return new ResponseEntity<>(new ApiResponse(repository.saveAndFlush(foundResult), HttpStatus.OK, "Actualización guardada Exitosamente"), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Resultado no encontrado"), HttpStatus.BAD_REQUEST);
        }
    }


    @Transactional
    public ResponseEntity<ApiResponse> delete(Long id) {
        Optional<ResultBean> foundLabData = repository.findById(id);
        if (foundLabData.isPresent()) {
            repository.deleteById(id);
            return new ResponseEntity<>(new ApiResponse(HttpStatus.OK, false, "Registro Eliminado"), HttpStatus.OK);
        }
        return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Error de eliminación"), HttpStatus.BAD_REQUEST);
    }
}
