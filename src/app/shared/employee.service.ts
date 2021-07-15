import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { HttpClient } from '@angular/common/http';
import { EmployeeList } from './employeeList.model';
import { Manager } from './manager.model';
import { Department } from './department.model';
import { SkillSet } from './skillSet.model';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  readonly apiUrl = "http://localhost:53345/api/";

  formData : Employee;  
  employeeList: EmployeeList[];
  managerList: Manager[];
  departmentList: Department[];
  skillSetList: SkillSet[];
  selectedSkillSetList: SkillSet[];


  constructor(private http : HttpClient) { }

  postEmployee(formData : Employee){    
    formData.SelectedSkillSetList = this.selectedSkillSetList;

    // this.selectedSkillSetList.forEach(el =>{
    //   formData.SkillSetList.push(el.SkillSetId,);
    // })

    console.log(formData);
    // angular.forEach(this.selectedSkillSetList, function(value, key){
    //   this.formData.SkillSetList.push(fn);
    // });
    return this.http.post(this.apiUrl + "EmployeeLists", formData);
  }

  getEmployeeList(){
    this.http.get(this.apiUrl + "EmployeeLists").toPromise().
    then(response => {
      this.employeeList = response as EmployeeList[];
      console.log(this.employeeList);
    }); 
    // console.log(this.employeeList);
  }

  getDropDownLists(){    
    this.http.get(this.apiUrl+"EmployeeLists/GetDepartmentDDList").toPromise().
    then(list => this.departmentList = list as Department[]);

    this.http.get(this.apiUrl+ "EmployeeLists/GetManagerDDList").toPromise().
    then(list => this.managerList = list as Manager[]);

    this.http.get(this.apiUrl+ "EmployeeLists/GetSkillSetDDList").toPromise().
    then(list => this.skillSetList = list as SkillSet[]);    
  }

  getSelectedSkillSets(formData : Employee){    
     this.http.put(this.apiUrl + "EmployeeLists/GetSelectedSkillSetList/"+formData.EmpId, null ).toPromise().
     then(list => {
                    this.selectedSkillSetList = list as SkillSet[];                        
                  });
  }
}
