package mx.edu.utez.saem.util;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.poi.ss.usermodel.*;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.view.document.AbstractXlsxView;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Component
public class XlsxExportation extends AbstractXlsxView {
    @Override
    protected void buildExcelDocument(Map<String, Object> model, Workbook workbook, HttpServletRequest request, HttpServletResponse response) throws Exception {
        response.setHeader("Content-Disposition", "attachment; filename=\"Pacientes-SAEM.xlsx\"");
        Sheet sheet = workbook.createSheet("Pacientes");

        Row header = sheet.createRow(0);
        Cell headerCell = header.createCell(0);
        headerCell.setCellValue("PACIENTES REGISTRADOS EN SAEM");

        Row headers = sheet.createRow(2);
        String [] columns = {"Status", "CURP", "Nombre", "Apellido Paterno", "Apellido Materno", "Fecha de Nacimiento", "Lugar de Nacimiento", "Sexo", "Teléfono", "Correo", "Código Postal", "Estado", "Municipio", "Número Exterior", "Número Interior", "Calle"};

        for (int i = 0; i < columns.length; i++) {
            Cell cell = headers.createCell(i);
            cell.setCellValue(columns[i]);
        }

        List<Map<String, Object>> patients = (List<Map<String, Object>>) model.get("patients");

        int rowNum = 3;

        for (Map<String, Object> patient : patients) {
            Row row = sheet.createRow(rowNum++);
            String statusText = ((Boolean) patient.get("status")) ? "Activo" : "Inactivo";
            row.createCell(0).setCellValue(statusText);
            row.createCell(1).setCellValue((String) patient.get("curp"));
            row.createCell(2).setCellValue((String) patient.get("name"));
            row.createCell(3).setCellValue((String) patient.get("middleName"));
            row.createCell(4).setCellValue((String) patient.get("lastName"));

            CellStyle cellStyle = workbook.createCellStyle();
            CreationHelper createHelper = workbook.getCreationHelper();
            cellStyle.setDataFormat(createHelper.createDataFormat().getFormat("dd/MM/yyyy"));

            Date birthDate = Date.from(((LocalDate) patient.get("birthDate")).atStartOfDay(ZoneId.systemDefault()).toInstant());

            Cell birthDateCell = row.createCell(5);
            birthDateCell.setCellValue(birthDate);
            birthDateCell.setCellStyle(cellStyle);

            row.createCell(6).setCellValue((String) patient.get("birthPlace"));
            row.createCell(7).setCellValue((String) patient.get("sex"));
            row.createCell(8).setCellValue((String) patient.get("phoneNumber"));
            row.createCell(9).setCellValue((String) patient.get("email"));
            row.createCell(10).setCellValue((String) patient.get("zip"));
            row.createCell(11).setCellValue((String) patient.get("state"));
            row.createCell(12).setCellValue((String) patient.get("town"));
            row.createCell(13).setCellValue((String) patient.get("exteriorNumber"));
            row.createCell(14).setCellValue((String) patient.get("interiorNumber"));
            row.createCell(15).setCellValue((String) patient.get("street"));

            rowNum++;
        }

    }
}
