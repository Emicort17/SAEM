package mx.edu.utez.saem.service.diagnostic;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import mx.edu.utez.saem.config.ApiResponse;
import mx.edu.utez.saem.model.diagnostic.DiagnosticBean;
import mx.edu.utez.saem.model.diagnostic.DiagnosticRepository;
import mx.edu.utez.saem.model.doctor.DoctorBean;
import mx.edu.utez.saem.model.doctor.DoctorRepository;
import mx.edu.utez.saem.model.medicalRecord.MedicalRecordBean;
import mx.edu.utez.saem.model.medicalRecord.MedicalRecordRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@Transactional
@AllArgsConstructor
public class DiagnosticService {
    private final DiagnosticRepository repository;
    private final MedicalRecordRepository medicalRecordRepository;
    private final DoctorRepository doctorRepository;

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getAll(){
        List<DiagnosticBean> diagnostics = repository.findAll();
        return new ResponseEntity<>(new ApiResponse(diagnostics, HttpStatus.OK, "Ok"), HttpStatus.OK);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getOne(Long id) {
        Optional<DiagnosticBean> optionalDiagnosticBean = repository.findById(id);
        return optionalDiagnosticBean.map(diagnostic -> new ResponseEntity<>(new ApiResponse(diagnostic, HttpStatus.OK, "Recuperado"), HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(new ApiResponse(null, HttpStatus.NOT_FOUND, "No encontrado"), HttpStatus.NOT_FOUND));
    }

    @Transactional
    public ResponseEntity<ApiResponse> save(DiagnosticBean diagnostic){
        MedicalRecordBean medicalRecord = medicalRecordRepository.findByNumber(diagnostic.getMedicalRecordBean().getNumber())
                .orElseThrow(() -> new EntityNotFoundException("Expediente no encontrado con el número: " + diagnostic.getMedicalRecordBean().getNumber()));

        DoctorBean doctor = doctorRepository.findByCard(diagnostic.getDoctorBean().getCard())
                .orElseThrow(() -> new EntityNotFoundException("Médico no encontrado con la cedula: " + diagnostic.getDoctorBean().getCard()));

        diagnostic.setMedicalRecordBean(medicalRecord);
        diagnostic.setDoctorBean(doctor);

        DiagnosticBean savedDiagnostic = repository.save(diagnostic);
        return new ResponseEntity<>(new ApiResponse(savedDiagnostic, HttpStatus.OK, "Diagnóstico registrado correctamente"), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> update(DiagnosticBean diagnostic) {
        Optional<DiagnosticBean> foundDiagnosticOpt = repository.findById(diagnostic.getId());
        if (!foundDiagnosticOpt.isPresent()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND, true, "Diagnóstico no encontrado"), HttpStatus.NOT_FOUND);
        }

        DiagnosticBean foundDiagnostic = foundDiagnosticOpt.get();

        foundDiagnostic.setStartDate(diagnostic.getStartDate());
        foundDiagnostic.setResult(diagnostic.getResult());
        foundDiagnostic.setDisease(diagnostic.getDisease());

        MedicalRecordBean medicalRecord = medicalRecordRepository.findByNumber(diagnostic.getMedicalRecordBean().getNumber())
                .orElseThrow(() -> new EntityNotFoundException("Expediente no encontrado con el número: " + diagnostic.getMedicalRecordBean().getNumber()));
        foundDiagnostic.setMedicalRecordBean(medicalRecord);

        DoctorBean doctor = doctorRepository.findByCard(diagnostic.getDoctorBean().getCard())
                .orElseThrow(() -> new EntityNotFoundException("Médico no encontrado con la cedula: " + diagnostic.getDoctorBean().getCard()));
        foundDiagnostic.setDoctorBean(doctor);

        DiagnosticBean savedDiagnostic = repository.save(foundDiagnostic);
        return new ResponseEntity<>(new ApiResponse(savedDiagnostic, HttpStatus.OK, "Diagnóstico actualizado correctamente"), HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<ApiResponse> delete(Long id) {
        Optional<DiagnosticBean> foundDiagnostic = repository.findById(id);
        if (foundDiagnostic.isPresent()) {
            repository.deleteById(id);
            return new ResponseEntity<>(new ApiResponse(HttpStatus.OK, false, "Diagnóstico eliminado"), HttpStatus.OK);
        }
        return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND, true, "Diagnóstico no encontrado"), HttpStatus.NOT_FOUND);
    }
    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> findByMedicalRecordNumber(String number) {
        Optional<MedicalRecordBean> medicalRecordOpt = medicalRecordRepository.findByNumber(number);
        if (!medicalRecordOpt.isPresent()) {
            return new ResponseEntity<>(new ApiResponse(null, HttpStatus.NOT_FOUND, "Registro médico no encontrado"), HttpStatus.NOT_FOUND);
        }
        Set<DiagnosticBean> diagnostics = medicalRecordOpt.get().getDiagnosticBeans();
        if (diagnostics.isEmpty()) {
            return new ResponseEntity<>(new ApiResponse(diagnostics, HttpStatus.NOT_FOUND, "No se encontraron diagnósticos para el número de registro médico proporcionado"), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(new ApiResponse(diagnostics, HttpStatus.OK, "Diagnósticos encontrados"), HttpStatus.OK);
    }


}
