import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class LoginServiceService {
  private userToken: string;

  constructor(private httpClient: HttpClient) {}
  getToken() {
    return localStorage.getItem("userToken")?localStorage.getItem("userToken"):sessionStorage.getItem("userToken");
  }
  getLogin(userData): Observable<Object> {
    return this.httpClient.post(environment.link + "login", userData).pipe(
      catchError((errorRes, o) => {
        if (errorRes.error) {
          return of(undefined);
        }
        return of(errorRes);
      }),
      map((tokenRes: string) => {
        if(tokenRes){
          this.userToken = tokenRes;
          if(userData.Remember){
            window.localStorage.setItem("userToken", tokenRes);
          }else{
            window.sessionStorage.setItem('userToken', tokenRes)
          }
          console.log(tokenRes);
          return tokenRes;
        }
      })
    );
  }
  getSignup(userDataSignup){
    return this.httpClient.post(environment.link + 'signup', userDataSignup)
    // .pipe(
    //   catchError((errorRes, o) => {
    //     if (errorRes.error) {
    //       return of(undefined);
    //     }
    //     return of(errorRes);
    //   }),
    //   map((tokenRes: string) => {
    //     if(tokenRes){
    //       this.userToken = tokenRes;
    //       window.localStorage.setItem("userToken", tokenRes);
    //       console.log(tokenRes);
    //       return tokenRes;
    //     }
    //   })
    // );
  }
}
