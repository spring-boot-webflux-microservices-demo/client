import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get('//localhost:8081/api1/findAllUsers');
  }

  saveUser(user: any): Observable<any> {
    return this.http.post('//localhost:8081/api1/saveUser', user, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }
}
