import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../Models/Customer';
import { HospitalResponse } from '../Models/Hospital';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://localhost:7263/api/Token';
  private apiUrl = 'https://localhost:7124/api/Customer';

  constructor(private http: HttpClient) { }
  
  login(username: string, password: string): Observable<any> {
    const params = new HttpParams().set('username', username).set('password', password);
    return this.http.get(`${this.baseUrl}/LoginUsers`, { params });
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  onlogin(obj :any) : Observable<any>
  {   
         return this.http.post(`${this.baseUrl}/login`,obj)

  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl+'/GetAllusers');
  }

  getHospitalDetails(): Observable<HospitalResponse> {
    return this.http.get<HospitalResponse>(this.apiUrl+'/GetAllHospitalDetails');
  }

  onSave(obj :any) : Observable<any>
  {   
         return this.http.post(`${this.apiUrl}/SavetheAps`,obj)

  }
}
