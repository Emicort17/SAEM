package mx.edu.utez.saem.model.address;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mx.edu.utez.saem.model.person.PersonBean;

@Entity
@Table(name = "address")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AddressBean {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 100, nullable = false)
    private String state;
    @Column(length = 100, nullable = false)
    private String town;
    @Column(length = 5, nullable = false)
    private String zip;
    @Column(length = 10, name = "interior_number")
    private String interiorNumber;
    @Column(length = 10, nullable = false, name = "exterior_number")
    private String exteriorNumber;
    @Column(length = 100, nullable = false)
    private String street1;
    @Column(length = 100)
    private String street2;
    @Column(length = 100)
    private String street3;

    @OneToOne(mappedBy = "addressBean")
    private PersonBean personBean;

    public AddressBean(String state, String town, String zip, String interiorNumber, String exteriorNumber, String street1, String street2, String street3) {
        this.state = state;
        this.town = town;
        this.zip = zip;
        this.interiorNumber = interiorNumber;
        this.exteriorNumber = exteriorNumber;
        this.street1 = street1;
        this.street2 = street2;
        this.street3 = street3;
    }
}
