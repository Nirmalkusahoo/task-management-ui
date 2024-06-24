import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private accessToken!: string;

  constructor() {
  }

  public setAccessToken(accessToken: string): void {
    this.accessToken = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  public getAccessToken(): string | null {
    return sessionStorage.getItem('token');
  }
}
