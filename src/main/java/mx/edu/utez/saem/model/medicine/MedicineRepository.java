package mx.edu.utez.saem.model.medicine;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MedicineRepository extends JpaRepository<MedicineBean, Long> {

    Optional<MedicineBean> findByManufacturerAndName(String Manufacturer, String Name);
}
