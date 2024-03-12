package mx.edu.utez.saem.model.administrator;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdministratorRepository extends JpaRepository<AdministratorBean, Long> {
    Optional<AdministratorBean> findById(Long id);
    Optional<AdministratorBean> findByUser(String user);
    // Método para verificar si ya existen registros
    boolean existsByIdIsNotNull();
    Boolean existsByUser(String user);
}
