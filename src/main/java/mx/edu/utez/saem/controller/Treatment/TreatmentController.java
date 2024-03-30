package mx.edu.utez.saem.controller.Treatment;

import lombok.AllArgsConstructor;
import mx.edu.utez.saem.config.ApiResponse;
import mx.edu.utez.saem.controller.Treatment.Dto.TreatmentDto;
import mx.edu.utez.saem.service.treatment.TreatmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/saem/treatment")
@CrossOrigin(origins = {"*"})
@AllArgsConstructor
public class TreatmentController {
    private final TreatmentService service;

    @PostMapping("/save")
    public ResponseEntity<ApiResponse> registrar(@RequestBody TreatmentDto dto) {
        return service.save(dto.toEntity());
    }

    @PutMapping("/update")
    public ResponseEntity<ApiResponse> actualizar(@RequestBody TreatmentDto dto){
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
}
