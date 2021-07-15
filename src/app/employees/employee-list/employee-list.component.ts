import { Component, OnInit } from '@angular/core';
import { EmployeeList } from 'src/app/shared/employeeList.model';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Employee } from 'src/app/shared/employee.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  private toaster : ToastrService;
  emp : Employee  = {
    EmpId : null,
    Name : '',
    DOB : null,
    EmailId : '',
    Mobile : '',
    Address: '',
    ManagerId : 0,
    DeptId : 0, 
    IsActive: true,
    SelectedSkillSetList: null
  };
  constructor(public service: EmployeeService) { 
    this.service.getEmployeeList();
  }
  
  ngOnInit(): void {  }

  populateForm(empList: EmployeeList){       
    let savedDate = new Date(empList.DOB);
    // console.log(savedDate.getMonth()+"-"+savedDate.getDate()+"-"+savedDate.getFullYear());
    // console.log(new Date(savedDate.getMonth()+"-"+savedDate.getDate()+"-"+savedDate.getFullYear()))
    this.emp.Name = empList.Name;
    
    this.emp.DOB = {
      "year": savedDate.getFullYear(),
      "month": savedDate.getMonth(),
      "day": savedDate.getDate()
    };

    this.emp.EmpId = empList.EmpId;
    this.emp.EmailId = empList.EmailId;
    this.emp.Mobile = empList.Mobile;
    this.emp.Address = empList.Address;
    this.emp.DeptId = empList.DeptId;
    this.emp.ManagerId = empList.ManagerId;  

    this.service.formData = this.emp;  

    try{      
      this.service.getSelectedSkillSets(this.service.formData);      
    }
    catch(error){
      console.log("Error in calling : "+ error);
    }
  }
}
