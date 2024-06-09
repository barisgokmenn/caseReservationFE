import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  baseUrl: string = "https://localhost:7285/api/Reservation/";

  constructor(private http: HttpClient) { }
  
  getReservation(): Observable<any> {
    return this.http.get<any>(this.baseUrl+'GetReservation');
  }

  createReservation(model: any): Observable<any> {
    return this.http.post<any>(this.baseUrl+'CreateReservation',model);
  }

  getRoomType(model: any): Observable<any> {
    return this.http.post(this.baseUrl+'GetRoomType',model);
  }
}
