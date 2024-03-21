package mx.edu.utez.saem.model.treatment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TreatmentRepository extends JpaRepository<TreatmentBean, Long> {
}
