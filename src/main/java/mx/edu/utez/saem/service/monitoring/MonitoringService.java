package mx.edu.utez.saem.service.monitoring;

import lombok.AllArgsConstructor;
import mx.edu.utez.saem.model.monitoring.MonitoringRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@AllArgsConstructor
public class MonitoringService {
    private final MonitoringRepository repository;
}
