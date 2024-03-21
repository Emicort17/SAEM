package mx.edu.utez.saem.controller.patient;

import lombok.AllArgsConstructor;
import mx.edu.utez.saem.config.ApiResponse;
import mx.edu.utez.saem.controller.patient.dto.PatientDto;
import mx.edu.utez.saem.service.patient.PatientService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/saem/patient")
@CrossOrigin(origins = {"*"})
@AllArgsConstructor
public class PatientController {
    private final PatientService service;

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
