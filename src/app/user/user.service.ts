import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from './user';

@Injectable({providedIn: 'root'})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get('//localhost:8081/api1/findAllUsers');
  }

  saveUser(user: User): Observable<any> {
    return this.http.post('//localhost:8081/api1/saveUser', user, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  updateUser(user: User): Observable<any> {
    return this.http.put('//localhost:8081/api1/updateUser/' + user.id, user, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  deleteUser(user: User): Observable<any> {
    return this.http.delete('//localhost:8081/api1/deleteUser/' + user.id);
  }
}
