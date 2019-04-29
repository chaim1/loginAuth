import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { LoginServiceService } from 'src/app/services/login-service.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private loginService: LoginServiceService, private route: Router) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      userData: new FormGroup({
        Name: new FormControl(null),
        Password: new FormControl(null),
        Remember: new FormControl(false)
      })
    });
  }
  onLoginUser(){
    this.loginService.getLogin(this.loginForm.value.userData).subscribe(res=>{
      console.log(res);
    })
    console.log(this.loginForm.value.userData);

  }
  routeToSignup(){
    this.route.navigate(['signup'])
  }
}
