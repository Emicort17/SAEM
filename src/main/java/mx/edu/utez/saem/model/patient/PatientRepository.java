package mx.edu.utez.saem.model.patient;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PatientRepository extends JpaRepository<PatientBean, Long> {
    Optional<PatientBean> findByUserBeanEmail(String email);
    Boolean existsByUserBeanEmail(String email);
}
