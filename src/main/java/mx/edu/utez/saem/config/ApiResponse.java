package mx.edu.utez.saem.config;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ApiResponse {
    private Object data;
    private HttpStatus status;
    private boolean error;
    private String message;

    public ApiResponse(Object data, HttpStatus status, String message) {
        this.data = data;
        this.status = status;
        this.message = message;
    }

    public ApiResponse(HttpStatus status, boolean error, String message) {
        this.status = status;
        this.error = error;
        this.message = message;
    }
}
