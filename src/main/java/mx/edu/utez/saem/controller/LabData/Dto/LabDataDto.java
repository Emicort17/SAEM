package mx.edu.utez.saem.controller.LabData.Dto;

import mx.edu.utez.saem.model.labData.LabDataBean;


public class LabDataDto {
    private Long id;
    private Integer viralLoad;
    private Double alt;
    private String antigen;
    private Double ast;
    private Double creatinine;
    private Integer platelets;


    public LabDataBean toEntity() {
        LabDataBean labDataBean = new LabDataBean(viralLoad, alt, antigen, ast, creatinine, platelets);
        labDataBean.setId(this.id);
        return labDataBean;
    }
}
