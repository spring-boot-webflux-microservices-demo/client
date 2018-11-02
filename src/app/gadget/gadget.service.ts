import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Gadget} from './gadget';

@Injectable({
  providedIn: 'root'
})
export class GadgetService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get('//localhost:8082/api2/findAllGadgets');
  }

  saveGadget(gadget: Gadget): Observable<any> {
    return this.http.post('//localhost:8082/api2/saveGadget', gadget, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  updateGadget(gadget: Gadget): Observable<any> {
    return this.http.put('//localhost:8082/api2/updateGadget/' + gadget.id, gadget, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  deleteGadget(gadget: Gadget): Observable<any> {
    return this.http.delete('//localhost:8082/api2/deleteGadget/' + gadget.id);
  }

}
