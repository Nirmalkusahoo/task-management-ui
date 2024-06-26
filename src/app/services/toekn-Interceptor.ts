import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    let modifiedRequest = request;
    if (!request.url.includes('auth')) {
      modifiedRequest = request.clone({
        headers: request.headers.append('Authorization', 'Bearer ' + sessionStorage.getItem('token'))
      })
    }
    return next.handle(modifiedRequest);
  }


}

