package mx.edu.utez.saem.service.doctor;

import lombok.AllArgsConstructor;
import mx.edu.utez.saem.config.ApiResponse;
import mx.edu.utez.saem.model.address.AddressBean;
import mx.edu.utez.saem.model.address.AddressRepository;
import mx.edu.utez.saem.model.doctor.DoctorBean;
import mx.edu.utez.saem.model.doctor.DoctorRepository;
import mx.edu.utez.saem.model.person.PersonBean;
import mx.edu.utez.saem.model.person.PersonRepository;
import mx.edu.utez.saem.model.user.UserBean;
import mx.edu.utez.saem.model.user.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class DoctorService {
    private final AddressRepository addressRepository;
    private final PersonRepository personRepository;
    private final UserRepository userRepository;
    private final DoctorRepository repository;
    private final PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getAll(){
        List<DoctorBean> doctors = repository.findAll();
        return new ResponseEntity<>(new ApiResponse(doctors, HttpStatus.OK, "Ok"), HttpStatus.OK);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getOne(String card) {
        Optional<DoctorBean> optionalDoctorBean = repository.findByCard(card);
        return optionalDoctorBean.map(doctor -> new ResponseEntity<>(new ApiResponse(doctor, HttpStatus.OK, "Recuperado"), HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(new ApiResponse(null, HttpStatus.NOT_FOUND, "No encontrado"), HttpStatus.NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getOneCurp(String curp) {
        Optional<DoctorBean> optionalDoctorBean = repository.findByUserBeanPersonBeanCurp(curp);
        Optional<String> optionalDoctorCard = optionalDoctorBean
                .map(doctor -> doctor.getCard());
        return optionalDoctorCard
                .map(card -> new ResponseEntity<>(new ApiResponse(card, HttpStatus.OK, "Recuperado"), HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(new ApiResponse(null, HttpStatus.NOT_FOUND, "No encontrado"), HttpStatus.NOT_FOUND));
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> save(DoctorBean doctor){
        String card = doctor.getCard();
        String email = doctor.getUserBean().getEmail();

        if (repository.findByCard(card).isPresent()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "La cédula del doctor ya está registrada."), HttpStatus.BAD_REQUEST);
        }

        Optional<UserBean> userByEmail = userRepository.findByEmail(email);
        if (userByEmail.isPresent() && !email.endsWith("d")) {
            email += "d";
        }

        if (userRepository.findByEmail(email).isPresent()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "El correo del doctor ya está registrado."), HttpStatus.BAD_REQUEST);
        }


        // Guardar la dirección
        AddressBean savedAddress = addressRepository.save(doctor.getUserBean().getPersonBean().getAddressBean());

        // Guardar los datos personales
        PersonBean personBean = doctor.getUserBean().getPersonBean();
        personBean.setAddressBean(savedAddress);
        PersonBean savedPerson = personRepository.save(personBean);

        // Configurar y guardar los datos del usuario
        UserBean userBean = doctor.getUserBean();
        userBean.setEmail(email);
        userBean.setPersonBean(savedPerson);
        userBean.setPassword(passwordEncoder.encode(userBean.getPassword()));
        UserBean savedUser = userRepository.save(userBean);

        // Configurar y guardar los datos del doctor
        doctor.setUserBean(savedUser);
        DoctorBean savedDoctor = repository.saveAndFlush(doctor);

        return new ResponseEntity<>(new ApiResponse(savedDoctor, HttpStatus.OK, "Guardado Exitosamente"), HttpStatus.OK);
    }


    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> update(DoctorBean updatedDoctor) {
        if (updatedDoctor.getCard() == null) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "La cedula del doctor es necesaria para la actualización"), HttpStatus.BAD_REQUEST);
        }

        Optional<DoctorBean> foundDoctorOpt = repository.findByCard(updatedDoctor.getCard());
        if (!foundDoctorOpt.isPresent()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND, true, "Doctor no encontrado"), HttpStatus.NOT_FOUND);
        }

        DoctorBean foundDoctor = foundDoctorOpt.get();

        UserBean updatedUser = updatedDoctor.getUserBean();
        UserBean foundUser = foundDoctor.getUserBean();

        foundUser.setEmail(updatedUser.getEmail());
        foundUser.setPassword((updatedUser.getPassword()));
        foundUser.setStatus(updatedUser.getStatus());

        PersonBean updatedPerson = updatedUser.getPersonBean();
        PersonBean foundPerson = foundUser.getPersonBean();

        foundPerson.setName(updatedPerson.getName());
        foundPerson.setMiddleName(updatedPerson.getMiddleName());
        foundPerson.setLastName(updatedPerson.getLastName());
        foundPerson.setBirthdate(updatedPerson.getBirthdate());
        foundPerson.setBirthplace(updatedPerson.getBirthplace());
        foundPerson.setCurp(updatedPerson.getCurp());
        foundPerson.setPhoneNumber(updatedPerson.getPhoneNumber());
        foundPerson.setSex(updatedPerson.getSex());

        AddressBean updatedAddress = updatedPerson.getAddressBean();
        AddressBean foundAddress = foundPerson.getAddressBean();

        foundAddress.setState(updatedAddress.getState());
        foundAddress.setTown(updatedAddress.getTown());
        foundAddress.setZip(updatedAddress.getZip());
        foundAddress.setInteriorNumber(updatedAddress.getInteriorNumber());
        foundAddress.setExteriorNumber(updatedAddress.getExteriorNumber());
        foundAddress.setStreet1(updatedAddress.getStreet1());
        foundAddress.setStreet2(updatedAddress.getStreet2());
        foundAddress.setStreet3(updatedAddress.getStreet3());

        DoctorBean savedDoctor = repository.saveAndFlush(foundDoctor);

        return new ResponseEntity<>(new ApiResponse(savedDoctor, HttpStatus.OK, "Actualización guardada Exitosamente"), HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<ApiResponse> delete(String card) {
        Optional<DoctorBean> foundDoctor = repository.findByCard(card);
        if (foundDoctor.isPresent()) {
            repository.delete(foundDoctor.get());
            return new ResponseEntity<>(new ApiResponse(HttpStatus.OK, false, "Registro Eliminado"), HttpStatus.OK);
        }
        return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND, true, "Doctor no encontrado"), HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<ApiResponse> changeDoctorPassword(String card, String oldPassword, String newPassword) {
        Optional<DoctorBean> optionalDoctor = repository.findByCard(card);
        if (!optionalDoctor.isPresent()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND, true, "Doctor no encontrado"), HttpStatus.NOT_FOUND);
        }

        DoctorBean doctor = optionalDoctor.get();
        UserBean user = doctor.getUserBean();

        // Verifica si la contraseña actual es correcta
        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "contraseña incorrecta"), HttpStatus.NOT_FOUND);
        }

        // Encripta y actualiza la nueva contraseña
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user); // Asume que tienes un método save en tu UserRepository

        return new ResponseEntity<>(new ApiResponse(HttpStatus.OK, false, "contraseña actualizada de forma exitosa"), HttpStatus.OK);
    }


}
