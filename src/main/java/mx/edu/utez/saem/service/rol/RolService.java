package mx.edu.utez.saem.service.rol;

import lombok.AllArgsConstructor;
import mx.edu.utez.saem.config.ApiResponse;
import mx.edu.utez.saem.model.patient.PatientBean;
import mx.edu.utez.saem.model.rol.RolBean;
import mx.edu.utez.saem.model.rol.RolRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class RolService {
    private final RolRepository repository;

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getAll(){
        return new ResponseEntity<>(new ApiResponse(repository.findAll(), HttpStatus.OK, "Okey"), HttpStatus.OK);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getOne(Long id) {
        Optional<RolBean> rolBeanOptional = repository.findById(id);
        if (rolBeanOptional.isPresent()) {
            Long id2 = rolBeanOptional.get().getId();
            System.out.println(id);
            RolBean rol = repository.getOne(id2);
            return new ResponseEntity<>(new ApiResponse(rol, HttpStatus.OK, "Recuperado"), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ApiResponse(null, HttpStatus.NOT_FOUND, "No encontrado"), HttpStatus.NOT_FOUND);
        }
    }



    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> save(RolBean rol){
        Optional<RolBean> rolBeanOptional = repository.findById(rol.getId());
        if(rolBeanOptional.isPresent())
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Registro duplicado"), HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>(new ApiResponse(repository.saveAndFlush(rol), HttpStatus.OK, "Guardado Exitosamente"), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> update(RolBean rol){
        Optional<RolBean> foundRol = repository.findById(rol.getId());
        if(foundRol.isPresent()){
            return new ResponseEntity<>(new ApiResponse(repository.saveAndFlush(rol), HttpStatus.OK, "Actualización guardada Exitosamente"), HttpStatus.OK);
        } else{
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Esta sección no almacena datos nuevos"), HttpStatus.BAD_REQUEST);

        }
    }

    @Transactional
    public ResponseEntity<ApiResponse> delete(Long id) {
        Optional<RolBean> foundRol = repository.findById(id);
        if (foundRol.isPresent() ) {
            repository.deleteById(id);
            return new ResponseEntity<>(new ApiResponse(HttpStatus.OK, false, "Rol Eliminada"), HttpStatus.OK);
        }

        return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Error de eliminación"), HttpStatus.BAD_REQUEST);
    }
}
