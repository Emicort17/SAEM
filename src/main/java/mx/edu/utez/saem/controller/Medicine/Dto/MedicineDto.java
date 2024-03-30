package mx.edu.utez.saem.controller.Medicine.Dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mx.edu.utez.saem.model.medicine.MedicineBean;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class MedicineDto {
    private Long id;
    private String name;
    private String presentation;
    private String manufacturer;

    public MedicineBean toEntity() {
        MedicineBean medicineBean = new MedicineBean(name, presentation, manufacturer);
        medicineBean.setId(this.id);
        return medicineBean;
    }

}
