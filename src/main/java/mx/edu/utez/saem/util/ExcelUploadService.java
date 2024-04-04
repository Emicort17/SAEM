package mx.edu.utez.saem.util;

import mx.edu.utez.saem.model.address.AddressBean;
import mx.edu.utez.saem.model.patient.PatientBean;
import mx.edu.utez.saem.model.person.PersonBean;
import mx.edu.utez.saem.model.user.UserBean;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class ExcelUploadService {

    private static PasswordEncoder passwordEncoder;

    @Autowired
    public ExcelUploadService(PasswordEncoder passwordEncoder) {
        ExcelUploadService.passwordEncoder = passwordEncoder;
    }
    public static boolean isValidExcelFile(MultipartFile file){
        return Objects.equals(file.getContentType(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    }

    public static List<PatientBean> getPatientsDataFromExcel(InputStream inputStream){
        List<PatientBean> patients = new ArrayList<>();
        try (XSSFWorkbook workbook = new XSSFWorkbook(inputStream)) {
            XSSFSheet sheet = workbook.getSheet("Pacientes");
            for (Row row : sheet) {
                if (row.getRowNum() == 0) continue;

                String statusText = getCellStringValue(row.getCell(0));
                boolean status = "Activo".equalsIgnoreCase(statusText);
                String curp = getCellStringValue(row.getCell(1));
                String name = getCellStringValue(row.getCell(2));
                String middleName = getCellStringValue(row.getCell(3));
                String lastName = getCellStringValue(row.getCell(4)); // Opcional
                LocalDate birthDate = getCellDateValue(row.getCell(5));
                String birthPlace = getCellStringValue(row.getCell(6));
                String sex = getCellStringValue(row.getCell(7));
                String phoneNumber = getCellStringValue(row.getCell(8));
                String email = getCellStringValue(row.getCell(9));
                String zip = getCellStringValue(row.getCell(10));
                String state = getCellStringValue(row.getCell(11));
                String town = getCellStringValue(row.getCell(12));
                String exteriorNumber = getCellStringValue(row.getCell(13));
                String interiorNumber = getCellStringValue(row.getCell(14)); // Opcional
                String street1 = getCellStringValue(row.getCell(15));
                String street2 = getCellStringValue(row.getCell(16)); // Opcional
                String street3 = getCellStringValue(row.getCell(17)); // Opcional
                String externalText = getCellStringValue(row.getCell(18));
                boolean external = "Si".equalsIgnoreCase(externalText);
                String password = getCellStringValue(row.getCell(19));

                String encodedPassword = passwordEncoder.encode(password);

                AddressBean addressBean = new AddressBean(state, town, zip, interiorNumber, exteriorNumber, street1, street2, street3);
                PersonBean personBean = new PersonBean(name, middleName, lastName, birthDate, birthPlace, curp, phoneNumber, sex, addressBean);
                UserBean userBean = new UserBean(email, encodedPassword, status, personBean);
                PatientBean patient = new PatientBean(external, userBean);

                patients.add(patient);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return patients;
    }

    private static String getCellStringValue(Cell cell) {
        if (cell == null) return "";
        cell.setCellType(CellType.STRING);
        return cell.getStringCellValue();
    }

    private static LocalDate getCellDateValue(Cell cell) {
        if (cell == null || cell.getCellType() != CellType.NUMERIC || !DateUtil.isCellDateFormatted(cell)) {
            return null;
        }
        return Instant.ofEpochMilli(cell.getDateCellValue().getTime()).atZone(ZoneId.systemDefault()).toLocalDate();
    }
}
