
import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {User} from '../_models/user';




@Injectable({ providedIn: 'root' })
export class UserService {


  constructor(private http: HttpClient) { }

  getAll() {
     return this.http.get<User[]>(`http://localhost:3030/user/allusers`);
  }



  register(user: User) {
    return this.http.post(`http://localhost:3030/user/register`, user);
  }


  //TODO (DONE): add a function that will allow users to set their calorie and minute goals. The function will comuunicate with the back-end.
  setGoals(calories, minutes) {
    const goals = {
      caloriegoal: calories,
      minutegoal: minutes
    };
    console.log('sending Set Goals + ' + JSON.stringify(goals));
    return this.http.post('http://localhost:3030/user/setgoals', goals);
  }
//TODO: DONE add a function that will allow users to get calorie and minute goals for a specific user (this means, given a username, this function should fetch calories and minute goals for that user). The function will comuunicate with the back-end.
  getGoals(user) {
    return this.http.get<string>(`http://localhost:3030/user/getgoals/${user}`);
  }




}
