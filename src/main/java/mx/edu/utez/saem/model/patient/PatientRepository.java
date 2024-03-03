package mx.edu.utez.saem.model.patient;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<PatientBean, Long> {
}
