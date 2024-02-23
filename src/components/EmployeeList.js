import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";
import Employee from './Employee';
import styles from "./Home.module.css";

const EmployeeList = () => {
  const navigate = useNavigate();
  
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);
  const [first,setFirst]=useState(false);
  const [last,setLast]=useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(2);
  const [sortfield, setsortField] = useState("firstName");
  const [sortorder, setSortorder] = useState('asc');
  const [totalPages, setTotalPages] = useState(0);
  const [totalElement, setTotalElement] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await EmployeeService.getEmployees(page,pageSize,sortfield,sortorder);
        const { content, totalPages,first,last,totalElements } = response.data;
        console.log(response.data);
        setTotalElement(totalElements);
        setFirst(first);
        setLast(last);
        setTotalPages(totalPages);
        setEmployees(content);
        console.log(response.data)
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [page,pageSize,sortfield,sortorder]);

  
  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/search?name=${query}`);
      console.log(response.data);
      setEmployees(response.data);
    } catch (error) {
      console.error("Error searching employee:", error);
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    handleSearch();
  };

  const deleteEmployee = (e, id) => {
    e.preventDefault();
   const decision= window.confirm("Are you sure want Delete");
   if(decision){
    EmployeeService.deleteEmployee(id).then((res) => {
      if (employees) {
        setEmployees((prevElement) => {
          return prevElement.filter((employee) => employee.id !== id);
        });
      }
    });
  }
  };


  
  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handlePageSizeChange = (e) => {
    setPageSize(parseInt(e.target.value));
  };

  return (
    <>
    <div className="container mx-auto my-8">
      <div className="h-12">
        <button
          onClick={() => navigate("/addEmployee")}
          className="rounded bg-slate-600 text-white px-6 py-2 font-semibold"style={{float: "left"}}>
          Add Employee
        </button>
        {/* <input
        type="text"
        placeholder="Search..." 
        className="rounded bg-slate-600 text-white px-6 py-2 font-semibold"style={{float: "right"}}>
          
        </input> */}
       <input
            className="rounded bg-slate-600 text-white px-6 py-2 font-semibold"style={{float: "right"}}
            type="text"
            placeholder="Search Employee "
            value={query}
            onChange={handleChange}
          />
      </div>
      <div className="flex shadow border-b">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                First Name
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                Last Name
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                Email ID
              </th>
              <th className="text-right font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                Actions
              </th>
            </tr>
          </thead>
          {!loading && (
            <tbody className="bg-white">
              {Array.isArray(employees) && employees.map((employee) => (
                <Employee
                  employee={employee}
                  deleteEmployee={deleteEmployee}
                  key={employee.id} ></Employee>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>


<div className={styles.pagination}>
<div className={styles.row1}>
<p>Total Employee : {totalElement}</p>
</div>
<button
onClick={()=>{setSortorder((sortorder=="desc")?"asc":"desc")}}
className={`${styles.button}`} // Add styles based on the disabled state
>
sort
</button>
<div className={styles.row2}>
<button
onClick={handlePrevPage}
disabled={first} // Disable the Previous button if it's the first page
className={`${styles.button} ${first ? styles.disabled : ''}`} // Add styles based on the disabled state
>
Previous
</button>
<button
onClick={handleNextPage}
disabled={last} // Disable the Next button if it's the last page
className={`${styles.button} ${last ? styles.disabled : ''}`} // Add styles based on the disabled state
>
Next
</button>
<span>Page:</span>
<select value={page} onChange={(e) => setPage(parseInt(e.target.value))}>
{Array.from({ length: totalPages }, (_, index) => (
<option key={index} value={index}>{index + 1}</option>
))}
</select>
<span>of {totalPages}</span>
<span> | Results per page:</span>
<select value={pageSize} onChange={handlePageSizeChange}>
<option value="2">2</option>
<option value="3">3</option>
<option value="5">5</option>
</select>
</div>
</div>
</>
  );
};

export default EmployeeList;
