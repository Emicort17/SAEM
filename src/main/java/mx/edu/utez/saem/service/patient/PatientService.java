package mx.edu.utez.saem.service.patient;

import lombok.AllArgsConstructor;
import mx.edu.utez.saem.config.ApiResponse;
import mx.edu.utez.saem.model.address.AddressBean;
import mx.edu.utez.saem.model.address.AddressRepository;
import mx.edu.utez.saem.model.medicalRecord.MedicalRecordBean;
import mx.edu.utez.saem.model.medicalRecord.MedicalRecordRepository;
import mx.edu.utez.saem.model.patient.PatientBean;
import mx.edu.utez.saem.model.patient.PatientRepository;
import mx.edu.utez.saem.model.person.PersonBean;
import mx.edu.utez.saem.model.person.PersonRepository;
import mx.edu.utez.saem.model.user.UserBean;
import mx.edu.utez.saem.model.user.UserRepository;
import mx.edu.utez.saem.util.ExcelUploadService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Random;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class PatientService {
    private final AddressRepository addressRepository;
    private final PersonRepository personRepository;
    private final UserRepository userRepository;
    private final PatientRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final MedicalRecordRepository medicalRecordRepository;

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getAll(){
        List<PatientBean> patients = repository.findAll();
        return new ResponseEntity<>(new ApiResponse(patients, HttpStatus.OK, "Ok"), HttpStatus.OK);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getOne(String curp) {
        Optional<PatientBean> optionalPatientBean = repository.findByUserBeanPersonBeanCurp(curp);
        return optionalPatientBean.map(patient -> new ResponseEntity<>(new ApiResponse(patient, HttpStatus.OK, "Recuperado"), HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(new ApiResponse(null, HttpStatus.NOT_FOUND, "No encontrado"), HttpStatus.NOT_FOUND));
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> save(PatientBean patient){
        String curp = patient.getUserBean().getPersonBean().getCurp();
        if(repository.findByUserBeanPersonBeanCurp(curp).isPresent()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "El curp del paciente ya está registrado."), HttpStatus.BAD_REQUEST);
        }

        AddressBean savedAddress = addressRepository.save(patient.getUserBean().getPersonBean().getAddressBean());

        PersonBean personBean = patient.getUserBean().getPersonBean();
        personBean.setAddressBean(savedAddress);
        PersonBean savedPerson = personRepository.save(personBean);

        UserBean userBean = patient.getUserBean();
        userBean.setPersonBean(savedPerson);
        userBean.setPassword(passwordEncoder.encode(userBean.getPassword()));
        UserBean savedUser = userRepository.save(userBean);

        patient.setUserBean(savedUser);


        PatientBean savedPatient = repository.saveAndFlush(patient);


        String formatnumber = String.format("%04d", savedPatient.getId());

        char inicialNombre = savedPatient.getUserBean().getPersonBean().getName().charAt(0);
        char inicialApellido = savedPatient.getUserBean().getPersonBean().getMiddleName().charAt(0);
        char inicialApellido2 = savedPatient.getUserBean().getPersonBean().getLastName().isEmpty() ? 'X' : savedPatient.getUserBean().getPersonBean().getLastName().charAt(0);

        String numExp = inicialNombre + "" + inicialApellido + "" + inicialApellido2 + formatnumber;

        MedicalRecordBean medicalRecordBean = new MedicalRecordBean();

        medicalRecordBean.setNumber(numExp);
        medicalRecordBean.setPatientBean(savedPatient);
        medicalRecordBean.setDiagnosticBeans(null);

        MedicalRecordBean savemedicalrecord = medicalRecordRepository.save(medicalRecordBean);

        return new ResponseEntity<>(new ApiResponse(savedPatient, HttpStatus.OK, "Guardado Exitosamente"), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> update(PatientBean updatedPatient) {
        if (updatedPatient.getUserBean().getPersonBean().getCurp() == null) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "El curp del paciente es necesario para la actualización"), HttpStatus.BAD_REQUEST);
        }

        Optional<PatientBean> foundPatientOpt = repository.findByUserBeanPersonBeanCurp(updatedPatient.getUserBean().getPersonBean().getCurp());
        if (!foundPatientOpt.isPresent()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND, true, "Paciente no encontrado"), HttpStatus.NOT_FOUND);
        }

        PatientBean foundPatient = foundPatientOpt.get();

        UserBean updatedUser = updatedPatient.getUserBean();
        UserBean foundUser = foundPatient.getUserBean();

        foundUser.setEmail(updatedUser.getEmail());
        foundUser.setPassword(updatedUser.getPassword());
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

        PatientBean savedPatient = repository.saveAndFlush(foundPatient);

        return new ResponseEntity<>(new ApiResponse(savedPatient, HttpStatus.OK, "Actualización guardada Exitosamente"), HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<ApiResponse> delete(String curp) {
        Optional<PatientBean> foundPatient = repository.findByUserBeanPersonBeanCurp(curp);
        if (foundPatient.isPresent()) {
            repository.delete(foundPatient.get());
            return new ResponseEntity<>(new ApiResponse(HttpStatus.OK, false, "Registro Eliminado"), HttpStatus.OK);
        }
        return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND, true, "Paciente no encontrado"), HttpStatus.NOT_FOUND);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> savePatientsWithExcel(MultipartFile file) {
        if (!ExcelUploadService.isValidExcelFile(file)) {
            return ResponseEntity.badRequest().body(new ApiResponse("El archivo no es un Excel válido", HttpStatus.BAD_REQUEST, "Error"));
        }

        try {
            List<PatientBean> patients = ExcelUploadService.getPatientsDataFromExcel(file.getInputStream());

            if (patients.isEmpty()) {
                return ResponseEntity.badRequest().body(new ApiResponse("El archivo Excel está vacío.", HttpStatus.BAD_REQUEST, "Error"));
            }

            boolean atLeastOnePatientAdded = false;

            for (PatientBean patient : patients) {
                String curp = patient.getUserBean().getPersonBean().getCurp();
                if (repository.findByUserBeanPersonBeanCurp(curp).isPresent()) {
                    continue;
                }

                PatientBean savedPatient = savePatientAndAssignRecordNumber(patient);
                atLeastOnePatientAdded = true; // Marca que al menos un paciente fue agregado
            }

            if (!atLeastOnePatientAdded) {
                return ResponseEntity.ok(new ApiResponse("Ningún paciente nuevo fue agregado. Todos los CURP ya existen en el sistema.", HttpStatus.OK, "Éxito pero sin cambios"));
            }

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse("Error al leer el archivo Excel", HttpStatus.INTERNAL_SERVER_ERROR, "Error"));
        }

        return ResponseEntity.ok(new ApiResponse("Todos los pacientes nuevos han sido agregados exitosamente", HttpStatus.OK, "Éxito"));
    }

    private PatientBean savePatientAndAssignRecordNumber(PatientBean patient) {
        PatientBean savedPatient = repository.saveAndFlush(patient);

        String formatNumber = String.format("%04d", savedPatient.getId());
        char inicialNombre = savedPatient.getUserBean().getPersonBean().getName().charAt(0);
        char inicialApellido = savedPatient.getUserBean().getPersonBean().getMiddleName().charAt(0);
        char inicialApellido2 = savedPatient.getUserBean().getPersonBean().getLastName().isEmpty() ? 'X' : savedPatient.getUserBean().getPersonBean().getLastName().charAt(0);
        String numExp = inicialNombre + "" + inicialApellido + "" + inicialApellido2 + formatNumber;

        MedicalRecordBean medicalRecordBean = new MedicalRecordBean();
        medicalRecordBean.setNumber(numExp);
        medicalRecordBean.setPatientBean(savedPatient);
        medicalRecordRepository.save(medicalRecordBean);

        savedPatient.setMedicalRecordBean(medicalRecordBean);
        return repository.save(savedPatient); // Devuelve el paciente guardado con el expediente médico asociado.
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> changePatientPassword(String curp, String oldPassword, String newPassword) {
        // Buscar al paciente por CURP
        Optional<PatientBean> patientOpt = repository.findByUserBeanPersonBeanCurp(curp);
        if (!patientOpt.isPresent()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND, true, "Paciente no encontrado"), HttpStatus.NOT_FOUND);
        }

        // Verificar que la contraseña actual es correcta
        UserBean user = patientOpt.get().getUserBean();
        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "contraseña incorrecta"), HttpStatus.NOT_FOUND);
        }

        // Actualizar a la nueva contraseña
        String encodedNewPassword = passwordEncoder.encode(newPassword);
        user.setPassword(encodedNewPassword);
        userRepository.save(user);

        return new ResponseEntity<>(new ApiResponse(HttpStatus.OK, false, "contraseña actualizada de forma exitosa"), HttpStatus.OK);
    }

}
