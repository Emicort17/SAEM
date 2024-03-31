package mx.edu.utez.saem.controller.patient;

import lombok.AllArgsConstructor;
import mx.edu.utez.saem.config.ApiResponse;
import mx.edu.utez.saem.controller.patient.dto.PatientDto;
import mx.edu.utez.saem.model.patient.PatientBean;
import mx.edu.utez.saem.service.patient.PatientService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/saem/patient")
@CrossOrigin(origins = {"*"})
@AllArgsConstructor
public class PatientController {
    private final PatientService service;

    @GetMapping("/exportation")
    public ModelAndView exportPatientsXlsx() {
        ModelAndView mav = new ModelAndView("xlsxExportation");
        ResponseEntity<ApiResponse> responseEntity = service.getAll();
        ApiResponse apiResponse = responseEntity.getBody();
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
                return patientMap;
            }).collect(Collectors.toList());
            mav.addObject("patients", patientsMaps);
        }
        return mav;
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
}
