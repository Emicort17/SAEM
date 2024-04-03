package mx.edu.utez.saem.model.doctor;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DoctorRepository extends JpaRepository<DoctorBean, Long>{
    Optional<DoctorBean> findByCard(String card);
    Boolean existsByUserBeanEmail(String email);

    Optional<DoctorBean> findByUserBeanEmail(String email);
}
