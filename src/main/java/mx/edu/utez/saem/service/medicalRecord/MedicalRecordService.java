package mx.edu.utez.saem.service.medicalRecord;

import lombok.AllArgsConstructor;
import mx.edu.utez.saem.model.medicalRecord.MedicalRecordRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@AllArgsConstructor
public class MedicalRecordService {
    private final MedicalRecordRepository repository;
}
