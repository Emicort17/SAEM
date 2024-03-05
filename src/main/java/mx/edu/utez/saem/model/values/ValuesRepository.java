package mx.edu.utez.saem.model.values;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ValuesRepository extends JpaRepository<ValuesBean, Long> {
}
