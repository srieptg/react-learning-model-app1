package employeebackendapi.employee.services;



import employeebackendapi.employee.entity.EmployeeEntity;
import employeebackendapi.employee.model.Employee;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import employeebackendapi.employee.model.Employee;

public interface EmployeeService {
    Employee createEmployee(Employee employee);

    Page<EmployeeEntity> getAllEmployees(Pageable pageable);

    boolean deleteEmployee(Long id);

    Employee getEmployeeById(Long id);
    
    Employee updateEmployee(Long id, Employee employee);

	List<employeebackendapi.employee.entity.EmployeeEntity> searchByName(String name);


}
