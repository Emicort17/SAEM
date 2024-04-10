package mx.edu.utez.saem.controller.Medicine;

import lombok.AllArgsConstructor;
import mx.edu.utez.saem.config.ApiResponse;
import mx.edu.utez.saem.controller.Medicine.Dto.MedicineDto;
import mx.edu.utez.saem.controller.result.Dto.ResultDto;
import mx.edu.utez.saem.service.medicine.MedicineService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/saem/medicine")
@CrossOrigin(origins = {"*"})
@AllArgsConstructor
public class MedicineController {
  private final MedicineService service;

    @PostMapping("/save")
    public ResponseEntity<ApiResponse> registrar(@RequestBody MedicineDto dto) {
        return service.save(dto.toEntity());
    }

    @PutMapping("/update")
    public ResponseEntity<ApiResponse> actualizar(@RequestBody MedicineDto dto){
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

    @GetMapping("/findOne")
    public ResponseEntity<ApiResponse> verUno(@RequestBody Map<String, String> requestParams) {
        String manufacturer = requestParams.get("manufacturer");
        String name = requestParams.get("name");
        return service.getOne(manufacturer, name);
    }

    @GetMapping("/getOne/{id}")
    public ResponseEntity<ApiResponse> verUno(@PathVariable Long id){
        return service.getOnebyId(id);
    }

}
