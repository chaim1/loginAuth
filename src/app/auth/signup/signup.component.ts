import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  singupForm: FormGroup;
  passwordValid: boolean = true;
  constructor(private route: Router, private loginService: LoginServiceService) { }

  ngOnInit() {
    this.singupForm = new FormGroup({
      userData: new FormGroup({
        Name: new FormControl(null),
        Password: new FormControl(null),
        ValidPassword: new FormControl(null)
      })
    });
  }

  onSingupUser(){
    if(this.singupForm.value.userData.ValidPassword !== this.singupForm.value.userData.Password){
      this.passwordValid = false;
      return;
    }else{
      this.passwordValid = true;
      this.loginService.getSignup(this.singupForm.value.userData).subscribe(res=>{
        
      })
    }
  }
  routeToLogin(){
    this.route.navigate(['login'])
  }
}

