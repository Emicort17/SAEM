package mx.edu.utez.saem.util;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.view.document.AbstractXlsxView;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Component
public class XlsxExportation extends AbstractXlsxView {
    @Override
    protected void buildExcelDocument(Map<String, Object> model, Workbook workbook, HttpServletRequest request, HttpServletResponse response) throws Exception {
        response.setHeader("Content-Disposition", "attachment; filename=\"Pacientes-SAEM.xlsx\"");
        Sheet sheet = workbook.createSheet("Pacientes");

        // Creación de estilos para encabezado, cabeceras de columna y celdas de datos
        CellStyle headerStyle = workbook.createCellStyle();
        Font headerFont = workbook.createFont();
        headerFont.setBold(true);
        headerFont.setFontHeightInPoints((short) 14);
        headerStyle.setFont(headerFont);
        headerStyle.setAlignment(HorizontalAlignment.CENTER);
        headerStyle.setFillForegroundColor(IndexedColors.LIGHT_GREEN.getIndex());
        headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        CellStyle columnHeaderStyle = workbook.createCellStyle();
        Font columnFont = workbook.createFont();
        columnFont.setBold(true);
        columnHeaderStyle.setFont(columnFont);
        columnHeaderStyle.setFillForegroundColor(IndexedColors.SKY_BLUE.getIndex());
        columnHeaderStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        columnHeaderStyle.setBorderBottom(BorderStyle.MEDIUM);
        columnHeaderStyle.setBorderTop(BorderStyle.MEDIUM);
        columnHeaderStyle.setBorderRight(BorderStyle.MEDIUM);
        columnHeaderStyle.setBorderLeft(BorderStyle.MEDIUM);

        CellStyle dateHeaderStyle = workbook.createCellStyle();
        Font dateHeaderFont = workbook.createFont();
        dateHeaderFont.setBold(true);
        dateHeaderStyle.setFont(dateHeaderFont);
        dateHeaderStyle.setAlignment(HorizontalAlignment.CENTER);
        dateHeaderStyle.setFillForegroundColor(IndexedColors.LIGHT_YELLOW.getIndex());
        dateHeaderStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        CellStyle cellStyle = workbook.createCellStyle();
        cellStyle.setBorderBottom(BorderStyle.THIN);
        cellStyle.setBorderTop(BorderStyle.THIN);
        cellStyle.setBorderRight(BorderStyle.THIN);
        cellStyle.setBorderLeft(BorderStyle.THIN);

        // Configurar la zona horaria y la fecha de generación
        ZoneId zoneId = ZoneId.of("America/Mexico_City");
        ZonedDateTime now = ZonedDateTime.now(zoneId);
        String formattedDateTime = now.format(DateTimeFormatter.ofPattern("HH:mm dd MMMM yyyy"));
        
        // Cabeceras de columna
        String[] columns = {"Status", "CURP", "Nombre", "Apellido Paterno", "Apellido Materno",
                "Fecha de Nacimiento", "Lugar de Nacimiento", "Sexo", "Teléfono", "Correo", "Código Postal",
                "Estado", "Municipio", "Número Exterior", "Número Interior", "Calle", "Externo"};
        Row headersRow = sheet.createRow(2);
        for (int i = 0; i < columns.length; i++) {
            Cell cell = headersRow.createCell(i);
            cell.setCellValue(columns[i]);
            cell.setCellStyle(columnHeaderStyle);
        }

        // Aplicar estilo al encabezado principal
        Row headerRow = sheet.createRow(0);
        Cell headerCell = headerRow.createCell(0);
        headerCell.setCellValue("PACIENTES REGISTRADOS EN SAEM");
        headerCell.setCellStyle(headerStyle);
        sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, columns.length - 1));

        // Encabezado de fecha
        Row dateHeaderRow = sheet.createRow(1);
        Cell dateHeaderCell = dateHeaderRow.createCell(0);

        String role = "";
        String generatedBy = "";
        if (model.get("role").equals("ADMIN_ROLE")) {
            role = "Administrador";
            generatedBy = model.get("generatedByAdmin").toString();
        } else if (model.get("role").equals("DOCTOR_ROLE")) {
            role = "Médico";
            generatedBy = model.get("generatedByDoctor").toString();
        }
        dateHeaderCell.setCellValue("Generado: " + formattedDateTime + ", por: " + role + " " + generatedBy);
        dateHeaderCell.setCellStyle(dateHeaderStyle);
        sheet.addMergedRegion(new CellRangeAddress(1, 1, 0, columns.length - 1));

        // Llenado de datos de pacientes
        List<Map<String, Object>> patients = (List<Map<String, Object>>) model.get("patients");
        int rowNum = 3;
        for (Map<String, Object> patient : patients) {
            Row row = sheet.createRow(rowNum++);

            Boolean status = (Boolean) patient.get("status");
            String statusText = (status != null && status) ? "Activo" : "Inactivo";
            row.createCell(0).setCellValue(statusText);

            row.createCell(1).setCellValue((String) patient.get("curp"));
            row.createCell(2).setCellValue((String) patient.get("name"));
            row.createCell(3).setCellValue((String) patient.get("middleName"));
            row.createCell(4).setCellValue((String) patient.get("lastName"));

            // Configuración de la celda de fecha de nacimiento
            Cell birthDateCell = row.createCell(5);
            Object birthDateObj = patient.get("birthDate");
            if (birthDateObj instanceof LocalDate) {
                LocalDate birthDate = (LocalDate) birthDateObj;
                birthDateCell.setCellValue(Date.from(birthDate.atStartOfDay(zoneId).toInstant()));
                CellStyle dateCellStyle = workbook.createCellStyle();
                CreationHelper createHelper = workbook.getCreationHelper();
                dateCellStyle.setDataFormat(createHelper.createDataFormat().getFormat("dd/MM/yyyy"));
                birthDateCell.setCellStyle(dateCellStyle);
            }

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
            Boolean external = (Boolean) patient.get("external");
            String externalText = (external != null && external) ? "Sí" : "No"; // Asumiendo que quieres mostrar "Sí"/"No"
            row.createCell(16).setCellValue(externalText);

            // Aplicar estilo de celda a cada celda de datos del paciente
            for(int i = 0; i < columns.length; i++) {
                Cell cell = row.getCell(i);
                if (cell != null) {
                    cell.setCellStyle(cellStyle);
                }
            }
        }

        // Ajustar automáticamente el tamaño de todas las columnas para adaptarse al contenido
        for (int i = 0; i < columns.length; i++) {
            sheet.autoSizeColumn(i);
        }
    }
}
