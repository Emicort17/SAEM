package mx.edu.utez.saem.model.administrator;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdministratorRepository extends JpaRepository<AdministratorBean, Long> {
}
