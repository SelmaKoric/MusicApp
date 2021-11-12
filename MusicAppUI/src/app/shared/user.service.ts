import {Injectable, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  formGroup: FormGroup;
  apiUrl='https://localhost:44384/api';

  constructor(private http: HttpClient) {
    this.formGroup = new FormGroup({
      'UserName': new FormControl(null, Validators.required),
      'Email': new FormControl(null, [Validators.required, Validators.email]),
      'fullName': new FormControl(null),
      'Passwords': new FormGroup({
        'password': new FormControl(null, [Validators.required, Validators.minLength(5)]),
        'confirmPassword': new FormControl(null, Validators.required)

      },this.comparePasswords )

    });

  }


  private comparePasswords(group: FormGroup){
    let confirmPass=group.get('confirmPassword');

   if(confirmPass.errors==null || 'missMatch' in confirmPass.errors) {
    if(group.get('password').value != confirmPass.value)
      confirmPass.setErrors({missMatch: true});
   }
   else
   return null;
  }

  onSignUp(){
    let form={
      UserName: this.formGroup.value.UserName,
      Email: this.formGroup.value.Email,
      fullName: this.formGroup.value.fullName,
      password: this.formGroup.value.Passwords.password
    };

    return this.http.post(this.apiUrl+'/user/register',form);

  }

  onSignIn(formData){
    return this.http.post(this.apiUrl+'/user/login',formData);

  }

  getCurrentUser(){
    let tokenHeader=new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('token')});
    return this.http.get(this.apiUrl+'/user',{headers: tokenHeader});
  }

}



