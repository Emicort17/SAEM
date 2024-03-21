package mx.edu.utez.saem.service.address;

import lombok.AllArgsConstructor;
import mx.edu.utez.saem.config.ApiResponse;
import mx.edu.utez.saem.model.address.AddressBean;
import mx.edu.utez.saem.model.address.AddressRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;
import java.sql.SQLException;
@Service
@Transactional
@AllArgsConstructor
public class AddressService {
    private final AddressRepository repository;

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getAll(){
        return new ResponseEntity<>(new ApiResponse(repository.findAll(), HttpStatus.OK, "Ok"), HttpStatus.OK);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getOne(Long id) {
        Optional<AddressBean> optionalAddressBean = repository.findById(id);
        if (optionalAddressBean.isPresent()) {
            Long id2 = optionalAddressBean.get().getId();
            System.out.println(id);
            AddressBean address = repository.getOne(id2);
            return new ResponseEntity<>(new ApiResponse(address, HttpStatus.OK, "Recuperado"), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ApiResponse(null, HttpStatus.NOT_FOUND, "No encontrado"), HttpStatus.NOT_FOUND);
        }
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> save(AddressBean address){
        Optional<AddressBean> addressBeanOptional = repository.findById(address.getId());
        if(addressBeanOptional.isPresent())
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Registro duplicado"), HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>(new ApiResponse(repository.saveAndFlush(address), HttpStatus.OK, "Guardado Exitosamente"), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> update(AddressBean address){
        Optional<AddressBean> foundAddress = repository.findById(address.getId());
        if(foundAddress.isPresent()){
            return new ResponseEntity<>(new ApiResponse(repository.saveAndFlush(address), HttpStatus.OK, "Actualización guardada Exitosamente"), HttpStatus.OK);
        } else{
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Esta sección no almacena datos nuevos"), HttpStatus.BAD_REQUEST);
        }
    }

    @Transactional
    public ResponseEntity<ApiResponse> delete(Long id) {
        Optional<AddressBean> foundAddress = repository.findById(id);
        if (foundAddress.isPresent() ) {
            repository.deleteById(id);
            return new ResponseEntity<>(new ApiResponse(HttpStatus.OK, false, "Registro Eliminado"), HttpStatus.OK);
        }
        return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Error de eliminación"), HttpStatus.BAD_REQUEST);
    }
}
