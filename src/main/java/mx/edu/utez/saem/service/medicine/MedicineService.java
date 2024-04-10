package mx.edu.utez.saem.service.medicine;

import lombok.AllArgsConstructor;
import mx.edu.utez.saem.config.ApiResponse;
import mx.edu.utez.saem.model.medicalRecord.MedicalRecordBean;
import mx.edu.utez.saem.model.medicine.MedicineBean;
import mx.edu.utez.saem.model.medicine.MedicineRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.Optional;


@Service
@Transactional
@AllArgsConstructor
public class MedicineService {
    private final MedicineRepository repository;

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getAll(){
        return new ResponseEntity<>(new ApiResponse(repository.findAll(), HttpStatus.OK, "Ok"), HttpStatus.OK);
    }


    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getOnebyId(Long id) {
        Optional<MedicineBean> optionalMedicineBean = repository.findById(id);
        if (optionalMedicineBean.isPresent()) {
            Long id2 = optionalMedicineBean.get().getId();
            System.out.println(id);
            MedicineBean medicineBean = repository.getOne(id2);
            return new ResponseEntity<>(new ApiResponse(medicineBean, HttpStatus.OK, "Recuperado"), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ApiResponse(null, HttpStatus.NOT_FOUND, "No encontrado"), HttpStatus.NOT_FOUND);
        }
    }
    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getOne(String manufacturer, String name) {
        Optional<MedicineBean> optionalMedicineBean = repository.findByManufacturerAndName(manufacturer, name);
        if (optionalMedicineBean.isPresent()) {
            MedicineBean medicineBean = optionalMedicineBean.get();
            return new ResponseEntity<>(new ApiResponse(medicineBean, HttpStatus.OK, "Recuperado"), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ApiResponse(null, HttpStatus.NOT_FOUND, "No encontrado"), HttpStatus.NOT_FOUND);
        }
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> save(MedicineBean medicineBean){
        MedicineBean savedMedicine = repository.saveAndFlush(medicineBean);
        if(savedMedicine!= null)
        return new ResponseEntity<>(new ApiResponse(savedMedicine, HttpStatus.OK, "Guardado Exitosamente"), HttpStatus.OK);
        else {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Error el guardar medicina"), HttpStatus.BAD_REQUEST);
        }
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> update(MedicineBean MedicineBean){
        Optional<MedicineBean> foundMedicineBean = repository.findById(MedicineBean.getId());
        if(foundMedicineBean.isPresent()){
            return new ResponseEntity<>(new ApiResponse(repository.saveAndFlush(MedicineBean), HttpStatus.OK, "Actualización guardada Exitosamente"), HttpStatus.OK);
        } else{
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Esta sección no almacena datos nuevos"), HttpStatus.BAD_REQUEST);
        }
    }

    @Transactional
    public ResponseEntity<ApiResponse> delete(Long id) {
        Optional<MedicineBean> foundMedicineBean = repository.findById(id);
        if (foundMedicineBean.isPresent() ) {
            repository.deleteById(id);
            return new ResponseEntity<>(new ApiResponse(HttpStatus.OK, false, "Registro Eliminado"), HttpStatus.OK);
        }
        return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Error de eliminación"), HttpStatus.BAD_REQUEST);
    }
}
