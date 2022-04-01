import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import {AuthService} from '../_services/auth.service';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  calories = 2500;
  minutes = 100;
  constructor(private userService: UserService, private auth: AuthService) { }
  ngOnInit(): void {
    const userInfo = JSON.parse(JSON.stringify(this.auth.currentUserValue));
    const user = userInfo._id;
    console.log ('Settings Init for ' + user);
    this.userService.getGoals(user)
      .pipe(first())
      .subscribe(
        data => {
          //  this.alertService.success('Registration successful', true);
          const parsedData = JSON.parse(JSON.stringify(data));
          const caloriegoal = parsedData['caloriegoal'];
          const minutegoal = parsedData['minutegoal'];
          console.log('Get goals success! ' + JSON.stringify(data) + ' caloriegoal: ' + caloriegoal + ' minutegoal: ' + minutegoal);
          this.calories = caloriegoal;
          this.minutes = minutegoal;
        },
        error => {
          console.log('Error:', error);
        });
  }
  handleButton() {
    console.log ('Setting Goals!');
    this.userService.setGoals(this.calories, this.minutes)
      .pipe(first())
      .subscribe(
        data => {
          //  this.alertService.success('Registration successful', true);
          console.log('set goals success');
        },
        error => {
          console.log('Error:', error);
        });
  }
}
