import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: '`app-add-employee`',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  dropdownSettings = {};
  
  constructor(public service : EmployeeService,
              private toaster : ToastrService) { 
                this.getDropDownLists();         

  }

  ngOnInit(): void {
    this.refreshForm();

    this.dropdownSettings  = {
      singleSelection: false,
      idField: "SkillSetId",  // form service skillSetList 
      textField: "SkillSetName",  //form service skillSetList 
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  refreshForm(form? : NgForm){
    if(form != null){
      form.resetForm();
    }

    this.service.formData = {
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
    }
  }

  onSubmit(form : NgForm){
    form.value.DOB = form.value.DOB["month"]+"-"+form.value.DOB["day"]+"-"+ form.value.DOB["year"];    
    this.insertRecord(form);
    console.log(form.value);
  }

  insertRecord(form : NgForm){      
    this.service.postEmployee(form.value).subscribe(
      res => {        
        this.toaster.success("Added Successfully","Add New");
        this.refreshForm(form);
      }
    );

  }

  getDropDownLists(){
    this.service.getDropDownLists();
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
}
