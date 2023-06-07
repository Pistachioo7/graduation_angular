import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-cancel-success',
  templateUrl: './cancel-success.component.html',
  styleUrls: ['./cancel-success.component.css']
})
export class CancelSuccessComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  id: string = this.userService.loginID;

  ngOnInit(): void {
  }

}
