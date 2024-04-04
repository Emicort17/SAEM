package mx.edu.utez.saem.controller.address.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mx.edu.utez.saem.model.address.AddressBean;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AddressDto {
    private Long id;
    private String state;
    private String town;
    private String zip;
    private String interiorNumber;
    private String exteriorNumber;
    private String street1;
    private String street2;
    private String street3;

    public AddressBean toEntity() {
        AddressBean addressBean = new AddressBean(state, town, zip, interiorNumber, exteriorNumber, street1, street2, street3);
        addressBean.setId(this.id);
        return addressBean;
    }
}
