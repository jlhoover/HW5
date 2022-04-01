import {Component, OnDestroy, OnInit} from '@angular/core';
import {first, mergeMap} from 'rxjs/operators';


import {NotificationService} from '../_services/notification.service';
import {PARecord} from '../_models/PARecord';
import {PArecordService} from '../_services/parecord.service';
import {UserService} from '../_services/user.service';


@Component({ templateUrl: 'home.component.html' ,

  styleUrls: ['home.component.css']})
export class HomeComponent implements OnInit {



  parecords: PARecord[] = [];


  constructor(
    private parecordservice: PArecordService,

    private notifService: NotificationService,
  ) {}

  ngOnInit() {
    this.loadAllPArecords();
      }





  private loadAllPArecords() {
    console.log('loadAllParecords()');
    this.parecordservice.getAll().subscribe(
         parecords => {
           this.parecords = parecords;
         },
        error => {
            this.notifService.showNotif(error.toString(), 'warning'); });
  }

  createPARecord() {
    this.parecordservice.add().pipe(first()).subscribe(
      resp => {
        this.notifService.showNotif(resp, 'response');
        this.parecords = null;
        this.loadAllPArecords();
        }, error => {
        this.notifService.showNotif(error); });
  }

  deletePARecord(date) {


    // this.userService.deleteActivity(date);
    this.parecordservice.delete(date).pipe(first()).subscribe( () => { this.parecords = null;
                                                                       this.loadAllPArecords();
    });
  }

}

