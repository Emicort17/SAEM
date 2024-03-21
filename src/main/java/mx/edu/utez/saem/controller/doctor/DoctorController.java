package mx.edu.utez.saem.controller.doctor;

import lombok.AllArgsConstructor;
import mx.edu.utez.saem.config.ApiResponse;
import mx.edu.utez.saem.controller.doctor.dto.DoctorDto;
import mx.edu.utez.saem.service.doctor.DoctorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/saem/doctor")
@CrossOrigin(origins = {"*"})
@AllArgsConstructor
public class DoctorController {
    private final DoctorService service;

    @PostMapping("/save")
    public ResponseEntity<ApiResponse> registrar(@RequestBody DoctorDto dto) {
        return service.save(dto.toEntity());
    }

    @PutMapping("/update")
    public ResponseEntity<ApiResponse> actualizar(@RequestBody DoctorDto dto){
        return service.update(dto.toEntity());
    }

    @DeleteMapping("/delete/{card}")
    public ResponseEntity<ApiResponse> eliminar(@PathVariable String card) {
        return service.delete(card);
    }

    @GetMapping("/findAll")
    public ResponseEntity<ApiResponse> verTodos(){
        return service.getAll();
    }

    @GetMapping("/findOne/{card}")
    public ResponseEntity<ApiResponse> verUno(@PathVariable String card){
        return service.getOne(card);
    }
}
