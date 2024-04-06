package mx.edu.utez.saem.controller.diagnostic;

import lombok.AllArgsConstructor;
import mx.edu.utez.saem.config.ApiResponse;
import mx.edu.utez.saem.controller.diagnostic.dto.DiagnosticDto;
import mx.edu.utez.saem.service.diagnostic.DiagnosticService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/saem/diagnostic")
@CrossOrigin(origins = {"*"})
@AllArgsConstructor
public class DiagnosticController {
    private final DiagnosticService service;

    @PostMapping("/save")
    public ResponseEntity<ApiResponse> registrar(@RequestBody DiagnosticDto dto) {
        return service.save(dto.toEntity());
    }

    @PutMapping("/update")
    public ResponseEntity<ApiResponse> actualizar(@RequestBody DiagnosticDto dto){
        return service.update(dto.toEntity());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ApiResponse> eliminar(@PathVariable Long id) {
        return service.delete(id);
    }

    @GetMapping("/findAll")
    public ResponseEntity<ApiResponse> verTodos(){
        return service.getAll();
    }

    @GetMapping("/findOne/{id}")
    public ResponseEntity<ApiResponse> verUno(@PathVariable Long id){
        return service.getOne(id);
    }

    @GetMapping("/findbyNumber/{number}")
    public ResponseEntity<ApiResponse> findbyNumber(@PathVariable String number){return service.findByMedicalRecordNumber(number);
    }
}
