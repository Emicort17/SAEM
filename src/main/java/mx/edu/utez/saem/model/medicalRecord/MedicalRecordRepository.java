package mx.edu.utez.saem.model.medicalRecord;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicalRecordRepository extends JpaRepository<MedicalRecordBean, Long> {
}
