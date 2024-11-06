import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/Models/Customer';
import { AuthService } from 'src/app/Services/auth.service';
//import { Customer } from '../Models/Customer';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{


          players: Customer[] = [];
          playerForm: FormGroup;

          constructor(private authService: AuthService, private route: Router,private fb: FormBuilder) { 
            this.playerForm = this.fb.group({
              playersArray: this.fb.array([])
            });
          }
  
          ngOnInit(): void {
            //this.fetchPlayers();
            this.loadcustomers();
          }
        
          fetchPlayers(): void {
            this.authService.getCustomers().subscribe(
              (response) => {
                this.players = response;
                //this.initPlayerForm();
              },
              (error) => {
                console.error('Error fetching players:', error);
                alert('Error please check');
              }
            );
          }
          initPlayerForm(): void {
            this.players.forEach(player => {
              const playerGroup = this.fb.group({
                id: new FormControl(player.id),
                name: new FormControl(player.name),
                location: new FormControl(player.location),
                email: new FormControl(player.email)
              });
              //this.playerForm.get('playersArray')?.push(playerGroup);
            });
          }
          loadcustomers()
          {
            this.authService.getCustomers().subscribe((res:any) =>{
              console.log('Login successful', res);
                this.players = res;
                
            }
            )
          }
        

}
