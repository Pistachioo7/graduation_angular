import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {User} from "../interfaces/user";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  id = this.userService.loginID;
  user: User = {uID: '', uName: '', uBirthday: new Date(), uSex: 1, uPassword: ''};

  getUser(): void {
    this.userService.getUserByID(this.id).subscribe(
      res => {
        this.user = res;
      }
    )
  }

  ngOnInit(): void {
    if (this.id != '') this.getUser();
  }

}
