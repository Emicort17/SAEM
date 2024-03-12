package mx.edu.utez.saem.config;

import mx.edu.utez.saem.model.address.AddressBean;
import mx.edu.utez.saem.model.address.AddressRepository;
import mx.edu.utez.saem.model.administrator.AdministratorBean;
import mx.edu.utez.saem.model.administrator.AdministratorRepository;
import mx.edu.utez.saem.model.doctor.DoctorBean;
import mx.edu.utez.saem.model.doctor.DoctorRepository;
import mx.edu.utez.saem.model.patient.PatientBean;
import mx.edu.utez.saem.model.patient.PatientRepository;
import mx.edu.utez.saem.model.person.PersonBean;
import mx.edu.utez.saem.model.person.PersonRepository;
import mx.edu.utez.saem.model.user.UserBean;
import mx.edu.utez.saem.model.user.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.time.LocalDate;
import java.util.Optional;

@Configuration
public class InitialConfig implements CommandLineRunner {
    private final AddressRepository addressRepository;
    private final PersonRepository personRepository;
    private final UserRepository userRepository;
    private final AdministratorRepository administratorRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    private final PasswordEncoder passwordEncoder;

    public InitialConfig(PersonRepository personRepository, UserRepository userRepository, AdministratorRepository administratorRepository, DoctorRepository doctorRepository, PatientRepository patientRepository, AddressRepository addressRepository, PasswordEncoder passwordEncoder) {
        this.personRepository = personRepository;
        this.userRepository = userRepository;
        this.administratorRepository = administratorRepository;
        this.doctorRepository = doctorRepository;
        this.patientRepository = patientRepository;
        this.addressRepository = addressRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional(rollbackFor = SQLException.class)
    public void run(String... args) throws Exception {
        //Admin por defecto
        saveAdmin(new AdministratorBean("Shago", passwordEncoder.encode("1234")));

        //Direccion de persona doctor
        AddressBean addressPerson = getOrSaveAddress(new AddressBean(
                "Morelos", // Estado
                "Cuernavaca", // Ciudad o Municipio
                "62400", // Código Postal
                "Int. 3", // Número Interior
                "123", // Número Exterior
                "Avenida de los Emperadores", // Calle 1
                "Colonia del Sol", // Calle 2
                "Entre Calle Benito Juárez y Calle Miguel Hidalgo" // Calle 3
        ));
        //Direccion de persona paciente
        // Creando otro objeto de ejemplo
        AddressBean addressPerson2 = getOrSaveAddress(new AddressBean(
                "Morelos", // Estado
                "Cuautla", // Ciudad o Municipio
                "62740", // Código Postal
                "Int. 2", // Número Interior
                "456", // Número Exterior
                "Calle de la Revolución", // Calle 1
                "Barrio de San Juan", // Calle 2
                "Entre Calle Hidalgo y Calle Morelos" // Calle 3
        ));


        //Persona doctor
        PersonBean doctorPerson = getOrSavePerson(new PersonBean(
                "Juan",
                "Carlos",
                "Pérez",
                LocalDate.of(1990, 5, 15),
                "Ciudad de México",
                "ABC123456DEF789",
                "5512345678",
                "Hombre",
                addressPerson
        ));

        //Persona paciente
        PersonBean patientPerson = getOrSavePerson(new PersonBean(
                "María",
                "Guadalupe",
                "Martínez",
                LocalDate.of(1985, 8, 20),
                "Monterrey",
                "XYZ987654ABC321",
                "5543210987",
                "Mujer",
                addressPerson2
        ));

        UserBean doctorUser = getOrSaveUser(new UserBean("doctor@gmail.com", passwordEncoder.encode("123"), true, doctorPerson));
        UserBean patientUser = getOrSaveUser(new UserBean("patient@gmail.com", passwordEncoder.encode("1234"), true, patientPerson));

        DoctorBean doctor = getOrSaveDoctor(new DoctorBean("12344264123", doctorUser));
        PatientBean patient = getOrSavePatient(new PatientBean(false, patientUser));
    }
    @Transactional
    public void saveAdmin(AdministratorBean admin){
        Optional<AdministratorBean> foundAdmin = administratorRepository.findByUser(admin.getUser());
        if(foundAdmin.isEmpty()){
            administratorRepository.saveAndFlush(admin);
        }
    }
    @Transactional
    public AddressBean getOrSaveAddress(AddressBean address){
        Optional<AddressBean> foundAddress = addressRepository.findByZipAndStreet1(address.getZip(), address.getStreet1());
        return foundAddress.orElseGet(()-> addressRepository.saveAndFlush(address));
    }
    @Transactional
    public PersonBean getOrSavePerson(PersonBean person){
        Optional<PersonBean> foundPerson = personRepository.findByCurp(person.getCurp());
        return foundPerson.orElseGet(() -> personRepository.saveAndFlush(person));
    }
    @Transactional
    public UserBean getOrSaveUser(UserBean user){
        Optional<UserBean> foundUser = userRepository.findByEmail(user.getEmail());
        return foundUser.orElseGet(()-> userRepository.saveAndFlush(user));
    }
    @Transactional
    public DoctorBean getOrSaveDoctor(DoctorBean doctor){
        Optional<DoctorBean> foundDoctor = doctorRepository.findByCard(doctor.getCard());
        return foundDoctor.orElseGet(()-> doctorRepository.saveAndFlush(doctor));
    }
    @Transactional
    public PatientBean getOrSavePatient(PatientBean patient){
        Optional<PatientBean> foundPatient = patientRepository.findByUserBeanEmail(patient.getUserBean().getEmail());
        return foundPatient.orElseGet(()-> patientRepository.saveAndFlush(patient));
    }
}
