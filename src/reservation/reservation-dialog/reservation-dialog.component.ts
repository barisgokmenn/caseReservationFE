import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-reservation-dialog',
  templateUrl: './reservation-dialog.component.html',
  styleUrls: ['./reservation-dialog.component.css']
})
export class ReservationDialogComponent implements OnInit {

  resForm: FormGroup = new FormGroup({});
  selectedRoomTypeid: string = '';
  
  constructor(
    public dialogRef: MatDialogRef<ReservationDialogComponent>,
    private formBuilder: FormBuilder,
    private _reservationService: ReservationService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.selectedRoomTypeid = data
  }

  ngOnInit() {
    this.resForm = this.formBuilder.group({
      nameSurname:['',Validators.required],
      numberOfAdults: [0, Validators.required],
      numberOfChildren: [0, Validators.required],
      child1: [0],
      child2: [0],
      child3: [0],
      checkInDate: [new Date(), Validators.required],
      checkOutDate: [this.getFutureDate(7), Validators.required],
      price: [, Validators.required],
    })
  }

  getFutureDate(days: number): Date {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  saveReservation(): void {
    const reservationModel = this.resForm.value;
    const model = {
      guestName: reservationModel.nameSurname,
      checkinDate: new Date(formatDate(reservationModel.checkInDate,'yyyy-MM-dd','en-US')),
      checkoutDate: new Date(formatDate(reservationModel.checkOutDate,'yyyy-MM-dd','en-US')),
      adult: reservationModel.numberOfAdults,
      child: reservationModel.numberOfChildren,
      child1: reservationModel.child1,
      child2: reservationModel.child2,
      child3: reservationModel.child3,
      roomTypeId: this.selectedRoomTypeid,
      price: reservationModel.price
    }
    
    this._reservationService.createReservation(model).subscribe(
      (response) => {
        this.dialogRef.close({
          status:true
        });
      }
    )
  }

  selectText(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.select();
  }

}
