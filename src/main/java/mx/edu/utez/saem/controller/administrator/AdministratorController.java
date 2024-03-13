package mx.edu.utez.saem.controller.administrator;

import lombok.AllArgsConstructor;
import mx.edu.utez.saem.config.ApiResponse;
import mx.edu.utez.saem.controller.administrator.dto.AdministratorDto;
import mx.edu.utez.saem.service.administrator.AdministratorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/saem/administrator")
@CrossOrigin(origins = {"*"})
@AllArgsConstructor
public class AdministratorController {
    private final AdministratorService service;

    @PostMapping("/save")
    public ResponseEntity<ApiResponse> registrar(@RequestBody AdministratorDto dto) {
        return service.save(dto.toEntity());
    }

    @PutMapping("/update")
    public ResponseEntity<ApiResponse> actualizar(@RequestBody AdministratorDto dto){
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
