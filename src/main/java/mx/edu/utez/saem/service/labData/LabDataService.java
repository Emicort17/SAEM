package mx.edu.utez.saem.service.labData;

import lombok.AllArgsConstructor;
import mx.edu.utez.saem.config.ApiResponse;
import mx.edu.utez.saem.model.labData.LabDataBean;
import mx.edu.utez.saem.model.labData.LabDataRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class LabDataService {
    private final LabDataRepository repository;

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getOne(Long id) {
        Optional<LabDataBean> optionalLabData = repository.findById(id);
        if (optionalLabData.isPresent()) {
            Long id2 = optionalLabData.get().getId();
            System.out.println(id);
            LabDataBean LabDataBean = repository.getOne(id2);
            return new ResponseEntity<>(new ApiResponse(LabDataBean, HttpStatus.OK, "Recuperado"), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ApiResponse(null, HttpStatus.NOT_FOUND, "No encontrado"), HttpStatus.NOT_FOUND);
        }
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> save(LabDataBean LabDataBean){
        Optional<LabDataBean> optionalLabData = repository.findById(LabDataBean.getId());
        if(optionalLabData.isPresent())
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Registro duplicado"), HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>(new ApiResponse(repository.saveAndFlush(LabDataBean), HttpStatus.OK, "Guardado Exitosamente"), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> update(LabDataBean LabDataBean){
        Optional<LabDataBean> foundLabData = repository.findById(LabDataBean.getId());
        if(foundLabData.isPresent()){
            return new ResponseEntity<>(new ApiResponse(repository.saveAndFlush(LabDataBean), HttpStatus.OK, "Actualización guardada Exitosamente"), HttpStatus.OK);
        } else{
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Esta sección no almacena datos nuevos"), HttpStatus.BAD_REQUEST);
        }
    }

    @Transactional
    public ResponseEntity<ApiResponse> delete(Long id) {
        Optional<LabDataBean> foundLabData = repository.findById(id);
        if (foundLabData.isPresent() ) {
            repository.deleteById(id);
            return new ResponseEntity<>(new ApiResponse(HttpStatus.OK, false, "Registro Eliminado"), HttpStatus.OK);
        }
        return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Error de eliminación"), HttpStatus.BAD_REQUEST);
    }
}
