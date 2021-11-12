import { Component, OnInit } from '@angular/core';
import {UserService} from "../../shared/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(public userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.onSignUp().subscribe((resolve:any)=>
      {
          if(resolve.Succeeded){
             this.router.navigate(['/home']);
             }
      },
        error => {
      console.log(error);
      }
    )
  }
}
