import { Component, OnInit } from '@angular/core';
import { Doctor, Hospital } from 'src/app/Models/Hospital';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {

  hospitals: Hospital[] = []; // List of hospitals
  doctors: Doctor[] = []; // List of doctors for selected hospital
  selectedHospitalId: number | null = null;
  selectedDoctorId: number | null = null;
  additionalInfo1: string = '';
  additionalInfo2: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getHospitalDetails().subscribe((response) => {
      this.hospitals = response.details;
    });
  }

  onHospitalChange() {
    const selectedHospital = this.hospitals.find(hospital => hospital.hospitalId === Number(this.selectedHospitalId ?? 0));
    this.doctors = selectedHospital ? selectedHospital.doctorDetails : [];
    this.selectedDoctorId = null;
  }

  onSubmit(form: any) {
    console.log("Form Data:", form.value);
  }

  onHospitalsChange() {
    console.log("Selected Hospital ID:", this.selectedHospitalId);
    const selectedHospital = this.hospitals.find(hospital => hospital.hospitalId === Number(this.selectedHospitalId ?? 0));
    console.log("hospitalList:", selectedHospital);

    this.doctors = selectedHospital ? selectedHospital.doctorDetails : [];
    console.log("Doctors List:", this.doctors);
    this.selectedDoctorId = null; // Reset doctor selection
  }

 
}
