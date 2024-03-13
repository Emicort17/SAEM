package mx.edu.utez.saem.model.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserBean, Long> {
    Optional<UserBean> findByEmail(String email);
}
