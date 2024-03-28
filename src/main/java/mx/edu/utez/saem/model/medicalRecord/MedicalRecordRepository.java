package mx.edu.utez.saem.model.medicalRecord;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MedicalRecordRepository extends JpaRepository<MedicalRecordBean, Long> {
    Optional<MedicalRecordBean> findByNumber(String number);
}
