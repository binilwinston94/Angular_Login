import { Component } from '@angular/core';
import { IdDetails, PersonalDetails } from 'src/app/Models/Personal';
import { ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-personal-template',
  templateUrl: './personal-template.component.html',
  styleUrls: ['./personal-template.component.css']
})
export class PersonalTemplateComponent {

  constructor(private cdr: ChangeDetectorRef) { }

  idDetailsList = new MatTableDataSource<IdDetails>();
  personalDetails: PersonalDetails = {
    name: '',
    nationality: '',
    dateOfBirth: '',
    passportNo: 0,
    profession: ''
  };

  //idDetailsList: IdDetails[] = [];

  newIdDetail: IdDetails = {
    name: '',
    idNo: 0,
    issuePlace: '',
    issueDate: '',
    expiryDate: ''
  };

  //   addIdDetail(): void {
  //     if (this.newIdDetail.name && this.newIdDetail.idNo && this.newIdDetail.issuePlace) {
  //         this.idDetailsList = [...this.idDetailsList, { ...this.newIdDetail }];
  //         this.newIdDetail = { name: '', idNo: 0, issuePlace: '', issueDate: '', expiryDate: '' };
  //     } else {
  //         console.error('All fields are required for ID details.');
  //     }
  // }

  trackById(index: number, item: IdDetails): number {
    return item.idNo; // Assuming idNo is unique for each ID detail
  }
  // deleteIdDetail(index: number): void {
  //   this.idDetailsList.splice(index, 1);
  //   console.log('Delete:', this.idDetailsList);

  //   this.cdr.detectChanges(); // Triggers change detection manually
  // }

  addIdDetail(): void {
    if (this.newIdDetail.name && this.newIdDetail.idNo && this.newIdDetail.issuePlace){
      this.idDetailsList.data = [...this.idDetailsList.data, { ...this.newIdDetail }];
      this.newIdDetail = { name: '', idNo: 0, issuePlace: '', issueDate: '', expiryDate: '' };
    }
    else{
      console.error('All fields are required for ID details.');
      alert('All Id details are required for Id detail');
    }
    
  }

  deleteIdDetail(index: number): void {
    const data = this.idDetailsList.data;
    data.splice(index, 1);
    this.idDetailsList.data = [...data]; // Setting a new array reference
  }
  saveForm(): void {
    const requestData = {
      details: this.personalDetails,
      idList: this.idDetailsList
    };
    console.log('Data to send to API:', requestData);
    // Send requestData to the API
  }


}
