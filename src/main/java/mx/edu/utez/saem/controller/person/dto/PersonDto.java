package mx.edu.utez.saem.controller.person.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mx.edu.utez.saem.model.address.AddressBean;
import mx.edu.utez.saem.model.person.PersonBean;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PersonDto {
    private Long id;
    private String name;
    private String middleName;
    private String lastName;
    private LocalDate birthdate;
    private String birthplace;
    private String curp;
    private String phoneNumber;
    private String sex;
    private AddressBean addressBean;

    public PersonBean toEntity() {
        PersonBean personBean = new PersonBean(name, middleName, lastName, birthdate, birthplace, curp, phoneNumber, sex, addressBean);
        personBean.setId(this.id);
        return personBean;
    }
}
