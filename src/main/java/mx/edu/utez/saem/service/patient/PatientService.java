package mx.edu.utez.saem.service.patient;

import lombok.AllArgsConstructor;
import mx.edu.utez.saem.config.ApiResponse;
import mx.edu.utez.saem.model.address.AddressBean;
import mx.edu.utez.saem.model.patient.PatientBean;
import mx.edu.utez.saem.model.patient.PatientRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class PatientService {
    private final PatientRepository repository;

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getAll(){
        return new ResponseEntity<>(new ApiResponse(repository.findAll(), HttpStatus.OK, "Okey"), HttpStatus.OK);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getOne(Long id) {
        Optional<PatientBean> optionalAddressBean = repository.findById(id);
        if (optionalAddressBean.isPresent()) {
            Long id2 = optionalAddressBean.get().getId();
            System.out.println(id);
            PatientBean address = repository.getOne(id2);
            return new ResponseEntity<>(new ApiResponse(address, HttpStatus.OK, "Recuperado"), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ApiResponse(null, HttpStatus.NOT_FOUND, "No encontrado"), HttpStatus.NOT_FOUND);
        }
    }



    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> save(PatientBean patient){
        Optional<PatientBean> optionalPatientBean = repository.findById(patient.getId());
        if(optionalPatientBean.isPresent())
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Registro duplicado"), HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>(new ApiResponse(repository.saveAndFlush(patient), HttpStatus.OK, "Guardado Exitosamente"), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> update(PatientBean patient){
        Optional<PatientBean> optionalPatientBean = repository.findById(patient.getId());
        if(optionalPatientBean.isPresent()){
            return new ResponseEntity<>(new ApiResponse(repository.saveAndFlush(patient), HttpStatus.OK, "Actualización guardada Exitosamente"), HttpStatus.OK);
        } else{
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Esta sección no almacena datos nuevos"), HttpStatus.BAD_REQUEST);

        }
    }

    @Transactional
    public ResponseEntity<ApiResponse> delete(Long id) {
        Optional<PatientBean> foundCategory = repository.findById(id);
        if (foundCategory.isPresent() ) {
            repository.deleteById(id);
            return new ResponseEntity<>(new ApiResponse(HttpStatus.OK, false, "Paciente Eliminada"), HttpStatus.OK);
        }

        return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Error de eliminación"), HttpStatus.BAD_REQUEST);
    }
}
