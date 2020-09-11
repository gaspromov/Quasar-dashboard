import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { UsersService } from 'src/app/shared/users/users.service';

@Component({
  selector: 'app-successes',
  templateUrl: './successes.component.html',
  styleUrls: ['./successes.component.css']
})
export class SuccessesComponent implements OnInit {
  successes: any = []
  image;

  constructor(
    private http: UsersService,
  ) { }

  async ngOnInit() {
    await this.http.getSuccesses()
    .then(w => {
      console.log(w)
      this.image = w[0].image;
      console.log(this.image)
    })
    .catch(e => console.log(e))
  }

}
