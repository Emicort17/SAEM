package mx.edu.utez.saem.model.address;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AddressRepository extends JpaRepository<AddressBean, Long> {
    Optional<AddressBean> findByZipAndStreet1(String zip, String street1);
}
