package employeebackendapi.employee.entyties.repository;
import employeebackendapi.employee.entity.EmployeeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Repository
public interface EmployeeRepository extends JpaRepository<EmployeeEntity, Long> {
	Page<EmployeeEntity> findAll(Pageable pageable);
	List<EmployeeEntity> findByFirstNameContaining(String name);
}
