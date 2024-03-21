package mx.edu.utez.saem.model.medicine;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicineRepository extends JpaRepository<MedicineBean, Long> {
}
