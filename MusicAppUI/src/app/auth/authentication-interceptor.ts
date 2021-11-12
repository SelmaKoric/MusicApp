import {HttpHandler, HttpInterceptor, HttpRequest, HttpEvent} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor{

  constructor(private router: Router) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(localStorage.getItem('token')!=null)
    {
      const Req=req.clone({
        headers: req.headers.set('Authorization','Bearer '+localStorage.getItem('token'))
      });
      return next.handle(Req).pipe(
        tap(
          next=>{},
          error=>{
            if(error.status==401){
              localStorage.removeItem('token');
              this.router.navigate(['/user/login']);
            }
          }
        )
      );

    }

    else{
      return next.handle(req.clone());
    }

  }
}
