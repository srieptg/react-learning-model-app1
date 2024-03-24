package employeebackendapi.employee.services;


import employeebackendapi.employee.entity.EmployeeEntity;
import employeebackendapi.employee.entyties.repository.EmployeeRepository;
import employeebackendapi.employee.model.Employee;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.util.StringUtils;

@Service
//@NoArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

	private EmployeeRepository employeeRepository;

	public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
		this.employeeRepository = employeeRepository;
	}

	@Override
	public Employee createEmployee(Employee employee) {
		EmployeeEntity employeeEntity = new EmployeeEntity();

		BeanUtils.copyProperties(employee, employeeEntity);
		employeeRepository.save(employeeEntity);
		return employee;
	}

	@Override
	public boolean deleteEmployee(Long id) {
		EmployeeEntity employee = employeeRepository.findById(id).get();
		employeeRepository.delete(employee);
		return true;
	}

	@Override
	public Employee getEmployeeById(Long id) {
		EmployeeEntity employeeEntity = employeeRepository.findById(id).get();
		Employee employee = new Employee();
		BeanUtils.copyProperties(employeeEntity, employee);
		return employee;
	}

	@Override
	public Employee updateEmployee(Long id, Employee employee) {
		EmployeeEntity employeeEntity = employeeRepository.findById(id).get();
		employeeEntity.setEmailId(employee.getEmailId());
		employeeEntity.setFirstName(employee.getFirstName());
		employeeEntity.setLastName(employee.getLastName());

		employeeRepository.save(employeeEntity);
		return employee;
	}

	@Override
	public Page<EmployeeEntity> getAllEmployees(Pageable pageable) {
		return employeeRepository.findAll(pageable);
	}

//	  public List<Employee> searchEmployee(EmployeeEntity employeeentity) {
//		  Employee employee = new Employee();
//	        ExampleMatcher matcher = ExampleMatcher.matching()
//	                .withIgnoreCase()
//	                .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING)
//	                .withIgnorePaths("id");
//
//	        if (StringUtils.hasLength(employeeentity.getFirstName())) {
//	        	
//	        	employee.setFirstName(employeeentity.getFirstName());
//	            matcher = matcher.withMatcher("actor", ExampleMatcher.GenericPropertyMatchers.contains());
//	        }
//
//	        
//
//	        Example<Employee> example = Example.of(employee, matcher);
//
//	        return employeeRepository.findAll(example);
//	    }

	public List<EmployeeEntity> searchByName(String name) {
		return employeeRepository.findByFirstNameContaining(name);
	}
}
