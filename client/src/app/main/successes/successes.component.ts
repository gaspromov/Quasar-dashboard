import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { UsersService } from 'src/app/shared/users/users.service';

@Component({
  selector: 'app-successes',
  templateUrl: './successes.component.html',
  styleUrls: ['./successes.component.css']
})
export class SuccessesComponent implements OnInit {
  @Input() successes: any = []
  

  constructor(
    private http: UsersService,
  ) { }

  async ngOnInit() {}

}
