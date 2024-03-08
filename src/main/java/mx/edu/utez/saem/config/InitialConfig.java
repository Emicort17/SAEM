package mx.edu.utez.saem.config;

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
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.time.LocalDate;
import java.util.Optional;

@Configuration
public class InitialConfig implements CommandLineRunner {
    private final PersonRepository personRepository;
    private final UserRepository userRepository;
    private final AdministratorRepository administratorRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;

    public InitialConfig(PersonRepository personRepository, UserRepository userRepository, AdministratorRepository administratorRepository, DoctorRepository doctorRepository, PatientRepository patientRepository) {
        this.personRepository = personRepository;
        this.userRepository = userRepository;
        this.administratorRepository = administratorRepository;
        this.doctorRepository = doctorRepository;
        this.patientRepository = patientRepository;
    }

    @Override
    @Transactional(rollbackFor = SQLException.class)
    public void run(String... args) throws Exception {
        //Admin por defecto
        getOrSaveAdmin(new AdministratorBean("Shago", "1234"));

        PersonBean doctorPerson = getOrSavePerson(new PersonBean(
                "Juan",
                "Carlos",
                "Pérez",
                LocalDate.of(1990, 5, 15),
                "Ciudad de México",
                "ABC123456DEF789",
                "5512345678",
                "Hombre"
        ));
        PersonBean patientPerson = getOrSavePerson(new PersonBean(
                "María",
                "Guadalupe",
                "Martínez",
                LocalDate.of(1985, 8, 20),
                "Monterrey",
                "XYZ987654ABC321",
                "5543210987",
                "Mujer"
        ));

        UserBean doctorUser = getOrSaveUser(new UserBean("doctor@gmail.com", "123", "Activo", doctorPerson));
        UserBean patientUser = getOrSaveUser(new UserBean("patient@gmail.com", "123", "Activo", patientPerson));

       /* saveDoctor(new DoctorBean("12344264123", doctorUser));
        savePatient(new PatientBean(false, patientUser));*/
    }
    @Transactional
    public AdministratorBean getOrSaveAdmin(AdministratorBean admin){
        Optional<AdministratorBean> foundAdmin = administratorRepository.findByUser(admin.getUser());
        return foundAdmin.orElseGet(()-> administratorRepository.saveAndFlush(admin));
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
    public void saveDoctor(DoctorBean doctor){
        doctorRepository.saveAndFlush(doctor);
    }
    @Transactional
    public void savePatient(PatientBean patient){
        patientRepository.saveAndFlush(patient);
    }
}
