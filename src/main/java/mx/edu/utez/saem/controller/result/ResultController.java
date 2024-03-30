package mx.edu.utez.saem.controller.result;

import lombok.AllArgsConstructor;
import mx.edu.utez.saem.config.ApiResponse;
import mx.edu.utez.saem.controller.doctor.dto.DoctorDto;
import mx.edu.utez.saem.controller.result.Dto.ResultDto;
import mx.edu.utez.saem.service.result.ResultService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/saem/result")
@CrossOrigin(origins = {"*"})
@AllArgsConstructor
public class ResultController {
    private final ResultService service;

    @PostMapping("/save")
    public ResponseEntity<ApiResponse> registrar(@RequestBody ResultDto dto) {
        return service.save(dto.toEntity());
    }

    @PutMapping("/update")
    public ResponseEntity<ApiResponse> actualizar(@RequestBody ResultDto dto){
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
