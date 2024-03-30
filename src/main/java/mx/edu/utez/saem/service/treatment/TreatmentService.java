package mx.edu.utez.saem.service.treatment;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import mx.edu.utez.saem.config.ApiResponse;
import mx.edu.utez.saem.model.diagnostic.DiagnosticBean;
import mx.edu.utez.saem.model.diagnostic.DiagnosticRepository;
import mx.edu.utez.saem.model.doctor.DoctorBean;
import mx.edu.utez.saem.model.labData.LabDataBean;
import mx.edu.utez.saem.model.medicalRecord.MedicalRecordBean;
import mx.edu.utez.saem.model.medicine.MedicineBean;
import mx.edu.utez.saem.model.medicine.MedicineRepository;
import mx.edu.utez.saem.model.result.ResultBean;
import mx.edu.utez.saem.model.treatment.TreatmentBean;
import mx.edu.utez.saem.model.treatment.TreatmentRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@Transactional
@AllArgsConstructor
public class TreatmentService {
    private final TreatmentRepository repository;
    private final DiagnosticRepository diagnosticRepository;
    private final MedicineRepository medicineRepository;
    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getAll(){
        List<TreatmentBean> treatments = repository.findAll();
        return new ResponseEntity<>(new ApiResponse(treatments, HttpStatus.OK, "Ok"), HttpStatus.OK);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getOne(Long id) {
        Optional<TreatmentBean> optionalTreatmentBean = repository.findById(id);
        return optionalTreatmentBean.map(treatment -> new ResponseEntity<>(new ApiResponse(treatment, HttpStatus.OK, "Recuperado"), HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(new ApiResponse(null, HttpStatus.NOT_FOUND, "No encontrado"), HttpStatus.NOT_FOUND));
    }

    @Transactional
    public ResponseEntity<ApiResponse> save(TreatmentBean treatment){
        // Buscar el diagnóstico asociado
        DiagnosticBean diagnostic = diagnosticRepository.findById(treatment.getDiagnosticBean().getId())
                .orElseThrow(() -> new EntityNotFoundException("Diagnóstico no encontrado con el ID: " + treatment.getDiagnosticBean().getId()));

        treatment.setDiagnosticBean(diagnostic);

        // Preparar un conjunto vacío para las medicinas encontradas
        Set<MedicineBean> foundMedicines = new HashSet<>();

        // Iterar sobre cada MedicineBean en el Set<MedicineBean> de TreatmentBean
        for (MedicineBean medicineBean : treatment.getMedicineBeans()) {
            // Buscar cada MedicineBean por nombre y fabricante
            MedicineBean foundMedicine = medicineRepository.findByManufacturerAndName(medicineBean.getManufacturer(), medicineBean.getName())
                    .orElseThrow(() -> new EntityNotFoundException("Medicina no encontrada con el nombre: " + medicineBean.getName() + " y fabricante: " + medicineBean.getManufacturer()));

            foundMedicine.getTreatmentBeans().add(treatment);
            foundMedicines.add(foundMedicine);

            // Agregar la medicina encontrada al conjunto
            foundMedicines.add(foundMedicine);
        }

        // Asignar el conjunto de medicinas encontradas al TreatmentBean
        treatment.setMedicineBeans(foundMedicines);

        // Guardar el TreatmentBean
        TreatmentBean savedTreatment = repository.save(treatment);
        return new ResponseEntity<>(new ApiResponse(savedTreatment, HttpStatus.OK, "Tratamiento registrado correctamente"), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> update(TreatmentBean updatedTreatment) {
        Optional<TreatmentBean> existingTreatmentOpt = repository.findById(updatedTreatment.getId());
        if (!existingTreatmentOpt.isPresent()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Tratamiento no encontrado"), HttpStatus.BAD_REQUEST);
        }
        TreatmentBean existingTreatment = existingTreatmentOpt.get();

        // Actualizar los campos del tratamiento con los valores del tratamiento actualizado
        existingTreatment.setTreatDate(updatedTreatment.getTreatDate());
        existingTreatment.setIndications(updatedTreatment.getIndications());

        // Buscar el diagnóstico asociado y actualizarlo si es necesario
        DiagnosticBean diagnostic = diagnosticRepository.findById(updatedTreatment.getDiagnosticBean().getId())
                .orElseThrow(() -> new EntityNotFoundException("Diagnóstico no encontrado con el ID: " + updatedTreatment.getDiagnosticBean().getId()));
        existingTreatment.setDiagnosticBean(diagnostic);

        // Preparar un conjunto para las medicinas actualizadas
        Set<MedicineBean> updatedMedicines = new HashSet<>();

        // Iterar sobre cada MedicineBean en el Set<MedicineBean> del TreatmentBean actualizado
        for (MedicineBean updatedMedicine : updatedTreatment.getMedicineBeans()) {
            MedicineBean foundMedicine = medicineRepository.findByManufacturerAndName(updatedMedicine.getManufacturer(), updatedMedicine.getName())
                    .orElseThrow(() -> new EntityNotFoundException("Medicina no encontrada con el nombre: " + updatedMedicine.getName() + " y fabricante: " + updatedMedicine.getManufacturer()));

            // Actualizar la relación entre el tratamiento y la medicina
            foundMedicine.getTreatmentBeans().add(existingTreatment);
            updatedMedicines.add(foundMedicine);
        }

        // Eliminar las relaciones con las medicinas que se quitaron del tratamiento
        Set<MedicineBean> existingMedicines = existingTreatment.getMedicineBeans();
        existingMedicines.removeAll(updatedMedicines);

        // Guardar el tratamiento actualizado
        TreatmentBean savedTreatment = repository.save(existingTreatment);

        // Eliminar las relaciones con las medicinas que se quitaron del tratamiento
        for (MedicineBean removedMedicine : existingMedicines) {
            removedMedicine.getTreatmentBeans().remove(existingTreatment);
            medicineRepository.save(removedMedicine);
        }

        return new ResponseEntity<>(new ApiResponse(savedTreatment, HttpStatus.OK, "Tratamiento actualizado correctamente"), HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<ApiResponse> delete(Long id) {
        Optional<TreatmentBean> foundTreatmentOpt = repository.findById(id);
        if (foundTreatmentOpt.isPresent()) {
            TreatmentBean foundTreatment = foundTreatmentOpt.get();

            // Eliminar las relaciones many-to-many con las medicinas asociadas
            for (MedicineBean medicine : foundTreatment.getMedicineBeans()) {
                medicine.getTreatmentBeans().remove(foundTreatment);
                medicineRepository.save(medicine);
            }

            // Eliminar el tratamiento
            repository.deleteById(id);

            return new ResponseEntity<>(new ApiResponse(HttpStatus.OK, false, "Registro Eliminado"), HttpStatus.OK);
        }

        return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Tratamiento no encontrado"), HttpStatus.BAD_REQUEST);
    }

}
