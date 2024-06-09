import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../services/reservation.service';
import { MatDialog } from '@angular/material/dialog';
import { ReservationDialogComponent } from './reservation-dialog/reservation-dialog.component';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  defaultCheckInDate = new Date();
  defaultCheckOutDate  = new Date();

  numberofRoom: number = 0;
  numberofAdult: number = 0;
  numberofChild: number = 0
  child1age: number = 0;
  child2age: number = 0;
  child3age: number = 0;
  
  resData: any[] = [];
  roomTypes: any[] = [];

  displayedColumnsRes: string[] = ['guestName', 'adult', 'child','checkInDate', 'checkOutDate','roomtypename','price'];

  displayedColumnsRoomTypes: string[] = ['roomTypeName','availableRoomCount','roomCount','options'];

  constructor(
    public dialog: MatDialog,
    private _reservationService: ReservationService
  ) { 
    const oneWeekLater = new Date();
    oneWeekLater.setDate(oneWeekLater.getDate() + 7);
    this.defaultCheckOutDate = oneWeekLater;
  }

  ngOnInit() {
  }

  listReservations(): void {
    this.numberofRoom == undefined ? 0 : this.numberofRoom
    this.numberofAdult == undefined ? 0 : this.numberofRoom
    this.child1age == undefined ? 0 : this.numberofRoom
    this.child2age == undefined ? 0 : this.numberofRoom
    this.child3age == undefined ? 0 : this.numberofRoom

    const model = {
      roomCount: this.numberofRoom,
      adult: this.numberofAdult,
      child: this.numberofChild,
      child1: this.child1age,
      child2: this.child2age, 
      child3: this.child3age,
      checkinDate: new Date(formatDate(this.defaultCheckInDate,'yyyy-MM-dd','en-US')),
      checkoutDate: new Date(formatDate(this.defaultCheckOutDate,'yyyy-MM-dd','en-US'))
    }

    this.getRoomTypes();
    this.getReservation();
  }

  addReservation(roomType: any) {
    const dialogRef = this.dialog.open(ReservationDialogComponent, {
      width: '650px',
      data: roomType.roomTypeId
    }).afterClosed().subscribe((response) => {
      if(response.status == true) {
        this.getReservation();
        this.getRoomTypes();
      }
    });
  }

  getReservation(): void {
    this._reservationService.getReservation().subscribe(
      (response) => {
        this.resData = response.data
      }
    )
  }

  getRoomTypes(): void {
    const model = {
      roomCount: this.numberofRoom,
      adult: this.numberofAdult,
      child: this.numberofChild,
      child1: this.child1age,
      child2: this.child2age, 
      child3: this.child3age,
      checkinDate: new Date(formatDate(this.defaultCheckInDate,'yyyy-MM-dd','en-US')),
      checkoutDate: new Date(formatDate(this.defaultCheckOutDate,'yyyy-MM-dd','en-US'))
    }
    this._reservationService.getRoomType(model).subscribe(
      (response) => {
        this.roomTypes = response.data
      }
    )
  }

  selectText(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.select();
  }

}
