package mx.edu.utez.saem.service.result;

import lombok.AllArgsConstructor;
import mx.edu.utez.saem.config.ApiResponse;
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
    public ResponseEntity<ApiResponse> save(ResultBean LabData){
        Optional<ResultBean> optionalResultBean = repository.findById(LabData.getId());
        if(optionalResultBean.isPresent())
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Registro duplicado"), HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>(new ApiResponse(repository.saveAndFlush(LabData), HttpStatus.OK, "Guardado Exitosamente"), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> update(ResultBean LabData){
        Optional<ResultBean> foundLabData = repository.findById(LabData.getId());
        if(foundLabData.isPresent()){
            return new ResponseEntity<>(new ApiResponse(repository.saveAndFlush(LabData), HttpStatus.OK, "Actualización guardada Exitosamente"), HttpStatus.OK);
        } else{
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Esta sección no almacena datos nuevos"), HttpStatus.BAD_REQUEST);
        }
    }

    @Transactional
    public ResponseEntity<ApiResponse> delete(Long id) {
        Optional<ResultBean> foundLabData = repository.findById(id);
        if (foundLabData.isPresent() ) {
            repository.deleteById(id);
            return new ResponseEntity<>(new ApiResponse(HttpStatus.OK, false, "Registro Eliminado"), HttpStatus.OK);
        }
        return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Error de eliminación"), HttpStatus.BAD_REQUEST);
    }
}
