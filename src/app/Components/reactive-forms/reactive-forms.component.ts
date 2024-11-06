import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Doctor, Hospital } from 'src/app/Models/Hospital';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.css']
})
export class ReactiveFormsComponent implements OnInit{

  hospitalForm: FormGroup;
  hospitals: Hospital[] = [];
  doctors: Doctor[] = [];

  constructor( private fb: FormBuilder, private authService: AuthService,private router: Router) 
  
  {
    // Initialize the form group with FormBuilder
    this.hospitalForm = this.fb.group({
      hospital: [null, Validators.required],
      doctor: [{ value: null, disabled: true }, Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
      additionalInfo: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Fetch the hospital details from the service
    this.authService.getHospitalDetails().subscribe((response) => {
      this.hospitals = response.details;
    });

    // Handle changes on the hospital dropdown
    this.hospitalForm.get('hospital')?.valueChanges.subscribe((selectedHospitalId) => {
      const selectedHospital = this.hospitals.find(hospital => hospital.hospitalId === selectedHospitalId);
      this.doctors = selectedHospital ? selectedHospital.doctorDetails : [];
      if (this.doctors.length > 0) {
        this.hospitalForm.get('doctor')?.enable();
      } else {
        this.hospitalForm.get('doctor')?.disable();
      }
      this.hospitalForm.get('doctor')?.setValue(null);
    });
  }

  onSubmit() {
    if (this.hospitalForm.invalid) {
      return;
    }

    const formData = {
      hospitalId: this.hospitalForm.value.hospital,
      doctorId: this.hospitalForm.value.doctor,
      publicInstruction: this.hospitalForm.value.email,
      privateInstruction: this.hospitalForm.value.additionalInfo,
    };

    this.authService.onSave(formData).subscribe(
      (res) => {
        if (res.statusCode === 404) {
          alert('User Invalid');
          // Uncomment below if redirection to login is needed
          // this.router.navigate(['/login']);
        } else {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/dashboard']);
        }
      },
      (error) => {
        console.error('Error saving data', error);
      }
    );
  }

}
