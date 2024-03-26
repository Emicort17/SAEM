package mx.edu.utez.saem.model.labData;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LabDataRepository extends JpaRepository<LabData, Long> {
}
