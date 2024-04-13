package mx.edu.utez.saem.controller.patient;

import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import lombok.AllArgsConstructor;
import mx.edu.utez.saem.config.ApiResponse;
import mx.edu.utez.saem.controller.address.dto.AddressDto;
import mx.edu.utez.saem.controller.patient.dto.ChangePasswordDto;
import mx.edu.utez.saem.controller.patient.dto.PatientDto;
import mx.edu.utez.saem.controller.person.dto.PersonDto;
import mx.edu.utez.saem.controller.user.dto.UserDto;
import mx.edu.utez.saem.model.address.AddressBean;
import mx.edu.utez.saem.model.doctor.DoctorBean;
import mx.edu.utez.saem.model.doctor.DoctorRepository;
import mx.edu.utez.saem.model.patient.PatientBean;
import mx.edu.utez.saem.model.person.PersonBean;
import mx.edu.utez.saem.model.user.UserBean;
import mx.edu.utez.saem.service.patient.PatientService;
import mx.edu.utez.saem.util.ExcelUploadService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import org.apache.poi.ss.usermodel.*;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/saem/patient")
@CrossOrigin(origins = {"*"})
@AllArgsConstructor
public class PatientController {
    private final PatientService service;
    private final DoctorRepository doctorRepository;

    @GetMapping("/exportation")
    public ModelAndView exportPatientsXlsx() {
        ModelAndView mav = new ModelAndView("xlsxExportation");
        ResponseEntity<ApiResponse> responseEntity = service.getAll();
        ApiResponse apiResponse = responseEntity.getBody();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String name = "";
        String fullName = "";
        String roles = "";
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            // Aquí puedes personalizar cómo obtener el nombre completo y el rol
            name = userDetails.getUsername(); // O cualquier método que tengas para obtener el nombre real
            // Doctor
            Optional<DoctorBean> doctor = doctorRepository.findByUserBeanEmail(name);
            fullName = doctor.map(doctorBean -> doctorBean.getUserBean().getPersonBean().getName() + " "
                    + doctorBean.getUserBean().getPersonBean().getMiddleName() + " "
                    + doctorBean.getUserBean().getPersonBean().getLastName()).orElse("");
            roles = userDetails.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.joining(", "));
        }
        if (apiResponse != null && apiResponse.getStatus() == HttpStatus.OK) {
            List<PatientBean> patientsList = (List<PatientBean>) apiResponse.getData();
            List<Map<String, Object>> patientsMaps = patientsList.stream().map(patient -> {
                Map<String, Object> patientMap = new HashMap<>();
                patientMap.put("status", patient.getUserBean().getStatus());
                patientMap.put("curp", patient.getUserBean().getPersonBean().getCurp());
                patientMap.put("name", patient.getUserBean().getPersonBean().getName());
                patientMap.put("middleName", patient.getUserBean().getPersonBean().getMiddleName());
                patientMap.put("lastName", patient.getUserBean().getPersonBean().getLastName());
                patientMap.put("birthDate", patient.getUserBean().getPersonBean().getBirthdate());
                patientMap.put("birthPlace", patient.getUserBean().getPersonBean().getBirthplace());
                patientMap.put("sex", patient.getUserBean().getPersonBean().getSex());
                patientMap.put("phoneNumber", patient.getUserBean().getPersonBean().getPhoneNumber());
                patientMap.put("email", patient.getUserBean().getEmail());
                patientMap.put("zip", patient.getUserBean().getPersonBean().getAddressBean().getZip());
                patientMap.put("state", patient.getUserBean().getPersonBean().getAddressBean().getState());
                patientMap.put("town", patient.getUserBean().getPersonBean().getAddressBean().getTown());
                patientMap.put("exteriorNumber", patient.getUserBean().getPersonBean().getAddressBean().getExteriorNumber());
                patientMap.put("interiorNumber", patient.getUserBean().getPersonBean().getAddressBean().getInteriorNumber());
                patientMap.put("street", patient.getUserBean().getPersonBean().getAddressBean().getStreet1());
                patientMap.put("external", patient.getExternal());
                return patientMap;
            }).collect(Collectors.toList());
            mav.addObject("patients", patientsMaps);
            mav.addObject("generatedByAdmin", name);
            mav.addObject("generatedByDoctor", fullName);
            mav.addObject("role", roles);
        }
        return mav;
    }


    @PostMapping("/import")
    public ResponseEntity<ApiResponse> importPatientsFromExcel(@RequestParam("file") MultipartFile file) {
        if (!ExcelUploadService.isValidExcelFile(file)) {
            return ResponseEntity.badRequest().body(new ApiResponse("El archivo no es un Excel válido", HttpStatus.BAD_REQUEST, "Error: Tipo de archivo no soportado"));
        }
        try {
            return this.service.savePatientsWithExcel(file);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse("Error interno del servidor al procesar el archivo", HttpStatus.INTERNAL_SERVER_ERROR, "Error"));
        }
    }

    @PostMapping("/save")
    public ResponseEntity<ApiResponse> registrar(@RequestBody PatientDto dto) {
        return service.save(dto.toEntity());
    }

    @PutMapping("/update")
    public ResponseEntity<ApiResponse> actualizar(@RequestBody PatientDto dto){
        return service.update(dto.toEntity());
    }

    @DeleteMapping("/delete/{curp}")
    public ResponseEntity<ApiResponse> eliminar(@PathVariable String curp) {
        return service.delete(curp);
    }

    @GetMapping("/findAll")
    public ResponseEntity<ApiResponse> verTodos(){
        return service.getAll();
    }

    @GetMapping("/findOne/{curp}")
    public ResponseEntity<ApiResponse> verUno(@PathVariable String curp){
        return service.getOne(curp);
    }
    @GetMapping("/diagnostic/findAll/{id}")
    public ResponseEntity<ApiResponse> patientDiagnostics(@PathVariable Long id){
        return service.getAllDiagnostics(id);
    }

    @PostMapping("/changePassword")
    public ResponseEntity<ApiResponse> changePassword(@RequestBody ChangePasswordDto changePasswordDto) {
        return service.changePatientPassword(
                changePasswordDto.getCurp(),
                changePasswordDto.getOldPassword(),
                changePasswordDto.getNewPassword());
    }

}

