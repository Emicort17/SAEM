package mx.edu.utez.saem.util;

import mx.edu.utez.saem.model.address.AddressBean;
import mx.edu.utez.saem.model.patient.PatientBean;
import mx.edu.utez.saem.model.person.PersonBean;
import mx.edu.utez.saem.model.user.UserBean;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class ExcelUploadService {
    public static boolean isValidExcelFile(MultipartFile file){
        return Objects.equals(file.getContentType(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    }

    public static List<PatientBean> getPatientsDataFromExcel(InputStream inputStream){
        List<PatientBean> patients = new ArrayList<>();
        try (XSSFWorkbook workbook = new XSSFWorkbook(inputStream)) {
            XSSFSheet sheet = workbook.getSheet("Pacientes");
            for (Row row : sheet) {
                if (row.getRowNum() == 0) continue; // Omitir la primera fila si contiene encabezados

                // Extrae los datos de la fila y guárdalos en tus entidades correspondientes
                String statusText = row.getCell(0).getStringCellValue();
                boolean status = "Activo".equalsIgnoreCase(statusText);
                String curp = row.getCell(1).getStringCellValue();
                String name = row.getCell(2).getStringCellValue();
                String middleName = row.getCell(3).getStringCellValue();
                String lastName = row.getCell(4).getStringCellValue();
                LocalDate birthDate = row.getCell(5).getLocalDateTimeCellValue().toLocalDate();
                String birthPlace = row.getCell(6).getStringCellValue();
                String sex = row.getCell(7).getStringCellValue();
                String phoneNumber = row.getCell(8).getStringCellValue();
                String email = row.getCell(9).getStringCellValue();
                String zip = row.getCell(10).getStringCellValue();
                String state = row.getCell(11).getStringCellValue();
                String town = row.getCell(12).getStringCellValue();
                String exteriorNumber = row.getCell(13).getStringCellValue();
                String interiorNumber = (row.getCell(14) != null) ? row.getCell(14).getStringCellValue() : "";
                String street1 = row.getCell(15).getStringCellValue();
                String street2 = (row.getCell(16) != null) ? row.getCell(16).getStringCellValue() : "";
                String street3 = (row.getCell(17) != null) ? row.getCell(17).getStringCellValue() : "";
                String externalText = row.getCell(18).getStringCellValue();
                boolean external = "Si".equalsIgnoreCase(externalText);
                String password = row.getCell(19).getStringCellValue();

                AddressBean addressBean = new AddressBean(state, town, zip, interiorNumber, exteriorNumber, street1, street2, street3);
                PersonBean personBean = new PersonBean(name, middleName, lastName, birthDate, birthPlace, curp, phoneNumber, sex, addressBean);
                UserBean userBean = new UserBean(email, password, status, personBean);
                PatientBean patient = new PatientBean(external, userBean);

                patients.add(patient);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return patients;
    }
}
