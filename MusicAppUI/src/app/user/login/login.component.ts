import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {UserService} from "../../shared/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {relativeFrom} from "@angular/compiler-cli/src/ngtsc/file_system";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
errorLogin:string;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')!=null)
      this.router.navigate(['/home']);
  }

  onSubmit(form: NgForm) {
    this.userService.onSignIn(form.value).subscribe(
      (resolve:any) => {
      localStorage.setItem('token',resolve.token);
        this.router.navigateByUrl('/home');
    },
    error=> {
      if(error.status==400){
        this.errorLogin='Username or password is incorrect!';
      }
    }
  );
  }

}
