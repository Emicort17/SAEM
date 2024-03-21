package mx.edu.utez.saem.service.medicalRecord;

import lombok.AllArgsConstructor;
import mx.edu.utez.saem.config.ApiResponse;
import mx.edu.utez.saem.model.medicalRecord.MedicalRecordBean;
import mx.edu.utez.saem.model.medicalRecord.MedicalRecordRepository;
import mx.edu.utez.saem.model.patient.PatientBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class MedicalRecordService {
    private final MedicalRecordRepository repository;

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getAll(){
        return new ResponseEntity<>(new ApiResponse(repository.findAll(), HttpStatus.OK, "Ok"), HttpStatus.OK);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getOne(Long id) {
        Optional<MedicalRecordBean> optionalMedicalRecordBean = repository.findById(id);
        if (optionalMedicalRecordBean.isPresent()) {
            Long id2 = optionalMedicalRecordBean.get().getId();
            System.out.println(id);
            MedicalRecordBean medicalRecord = repository.getOne(id2);
            return new ResponseEntity<>(new ApiResponse(medicalRecord, HttpStatus.OK, "Recuperado"), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ApiResponse(null, HttpStatus.NOT_FOUND, "No encontrado"), HttpStatus.NOT_FOUND);
        }
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> save(MedicalRecordBean medicalRecord){
        Optional<MedicalRecordBean> optionalMedicalRecordBean = repository.findById(medicalRecord.getId());
        if(optionalMedicalRecordBean.isPresent())
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Registro duplicado"), HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>(new ApiResponse(repository.saveAndFlush(medicalRecord), HttpStatus.OK, "Guardado Exitosamente"), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> update(MedicalRecordBean medicalRecord){
        Optional<MedicalRecordBean> foundMedicalRecord = repository.findById(medicalRecord.getId());
        if(foundMedicalRecord.isPresent()){
            return new ResponseEntity<>(new ApiResponse(repository.saveAndFlush(medicalRecord), HttpStatus.OK, "Actualización guardada Exitosamente"), HttpStatus.OK);
        } else{
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Esta sección no almacena datos nuevos"), HttpStatus.BAD_REQUEST);
        }
    }

    @Transactional
    public ResponseEntity<ApiResponse> delete(Long id) {
        Optional<MedicalRecordBean> foundMedicalRecord = repository.findById(id);
        if (foundMedicalRecord.isPresent() ) {
            repository.deleteById(id);
            return new ResponseEntity<>(new ApiResponse(HttpStatus.OK, false, "Registro Eliminado"), HttpStatus.OK);
        }
        return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Error de eliminación"), HttpStatus.BAD_REQUEST);
    }
}
