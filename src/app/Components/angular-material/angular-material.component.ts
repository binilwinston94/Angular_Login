import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor, Hospital } from 'src/app/Models/Hospital';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-angular-material',
  templateUrl: './angular-material.component.html',
  styleUrls: ['./angular-material.component.css']
})
export class AngularMaterialComponent {

  hospitals: Hospital[] = []; // List of hospitals
  doctors: Doctor[] = []; // List of doctors for selected hospital
  selectedHospitalId: number | null = null;
  selectedDoctorId: number | null = null;
  email: string = '';
  additionalInfo: string = '';

  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit() {
    this.authService.getHospitalDetails().subscribe((response) => {
      this.hospitals = response.details;
    });
  }

  onHospitalChange() {
    const selectedHospital = this.hospitals.find(hospital => hospital.hospitalId === (this.selectedHospitalId ?? 0));
    console.log("hospital List:", selectedHospital);
    this.doctors = selectedHospital ? selectedHospital.doctorDetails : [];
    console.log("Doctors List:", this.doctors);
    this.selectedDoctorId = null;
  }

  onSubmit(form: any) {
    
    console.log("Form Data:", form.value);
    if (form.invalid) {
      return;  // If form is invalid, don't proceed further
    }
    const formData = {
      hospitalId: this.selectedHospitalId,
      doctorId: this.selectedDoctorId,
      publicInstruction: this.email,
      privateInstruction: this.additionalInfo,
    };
    this.authService.onSave(formData).subscribe(
      (res) => {

        console.log('Data saved successfully', res);
        if(res.statusCode ==404)
          {
            console.log('response',res);
             alert('User Invalid');
             //this.route.navigate(['/login']);
             
          }
          else{
            console.log('response',res);
            localStorage.setItem('token',res.token);
            this.route.navigate(['/dashboard']);
          }
      },
      (error) => {
        console.error('Error saving data', error);
      }
    );

  }

  

}
