package mx.edu.utez.saem.service.administrator;

import lombok.AllArgsConstructor;
import mx.edu.utez.saem.config.ApiResponse;
import mx.edu.utez.saem.model.administrator.AdministratorBean;
import mx.edu.utez.saem.model.administrator.AdministratorRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class AdministratorService {
    private final AdministratorRepository repository;

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getAll(){
        return new ResponseEntity<>(new ApiResponse(repository.findAll(), HttpStatus.OK, "Ok"), HttpStatus.OK);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getOne(Long id) {
        Optional<AdministratorBean> optionalAdministratorBean = repository.findById(id);
        if (optionalAdministratorBean.isPresent()) {
            Long id2 = optionalAdministratorBean.get().getId();
            System.out.println(id);
            AdministratorBean administrator = repository.getOne(id2);
            return new ResponseEntity<>(new ApiResponse(administrator, HttpStatus.OK, "Recuperado"), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ApiResponse(null, HttpStatus.NOT_FOUND, "No encontrado"), HttpStatus.NOT_FOUND);
        }
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> save(AdministratorBean administrator){
        // Verifica si ya existe al menos un registro de Administrator
        if(repository.existsByIdIsNotNull()) {
            // Si ya existe, devuelve un estado HTTP que indique que la operación no está permitida
            return new ResponseEntity<>(new ApiResponse(null, HttpStatus.FORBIDDEN, "Ya existe un administrador. No se pueden crear más."), HttpStatus.FORBIDDEN);
        }
        // Si no existe ningún registro, procede a guardar el nuevo administrador
        return new ResponseEntity<>(new ApiResponse(repository.saveAndFlush(administrator), HttpStatus.OK, "Guardado Exitosamente"), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> update(AdministratorBean administrator){
        if (administrator.getId() == null) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "El ID no puede ser null"), HttpStatus.BAD_REQUEST);
        }
        Optional<AdministratorBean> foundAdministrator = repository.findById(administrator.getId());
        if(foundAdministrator.isPresent()){
            return new ResponseEntity<>(new ApiResponse(repository.saveAndFlush(administrator), HttpStatus.OK, "Actualización guardada Exitosamente"), HttpStatus.OK);
        } else{
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Esta sección no almacena datos nuevos"), HttpStatus.BAD_REQUEST);
        }
    }

    @Transactional
    public ResponseEntity<ApiResponse> delete(Long id) {
        Optional<AdministratorBean> foundAdministrator = repository.findById(id);
        if (foundAdministrator.isPresent() ) {
            repository.deleteById(id);
            return new ResponseEntity<>(new ApiResponse(HttpStatus.OK, false, "Registro Eliminado"), HttpStatus.OK);
        }
        return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Error de eliminación"), HttpStatus.BAD_REQUEST);
    }
}
