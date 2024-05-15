package mx.edu.utez.saem.model.diagnostic;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiagnosticRepository extends JpaRepository<DiagnosticBean, Long> {
    List<DiagnosticBean> findAllByOrderByStartDateDesc();

    List<DiagnosticBean> findAllByMedicalRecordBean_PatientBean_UserBean_IdOrderByStartDateDesc(Long id);
}
