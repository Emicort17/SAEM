package mx.edu.utez.saem.model.labData;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mx.edu.utez.saem.model.result.ResultBean;

import java.util.Set;

@Entity
@Table(name = "lab_data")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@JsonIdentityInfo(
        scope = LabDataBean.class,
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class LabDataBean {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private Integer viralLoad;
    @Column (nullable = false)
    private Double alt;
    @Column(length = 20, nullable = false)
    private String antigen;
    @Column (nullable = false)
    private Double ast;
    @Column (nullable = false)
    private Double creatinine;
    @Column(nullable = false)
    private Integer platelets;

    @OneToMany(mappedBy = "labDataBean", cascade = CascadeType.ALL )
    private Set<ResultBean> resultBeans;

    public LabDataBean(Integer viralLoad, Double alt, String antigen, Double ast, Double creatinine, Integer platelets) {
        this.viralLoad = viralLoad;
        this.alt = alt;
        this.antigen = antigen;
        this.ast = ast;
        this.creatinine = creatinine;
        this.platelets = platelets;
    }
}
