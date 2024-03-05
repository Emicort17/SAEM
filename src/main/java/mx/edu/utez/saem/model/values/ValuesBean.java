package mx.edu.utez.saem.model.values;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mx.edu.utez.saem.model.result.ResultBean;

import java.util.Set;

@Entity
@Table(name = "values")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ValuesBean {
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

    @OneToMany(mappedBy = "valuesBean", cascade = CascadeType.ALL )
    private Set<ResultBean> resultBeans;

}
