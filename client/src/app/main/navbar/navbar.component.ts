import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  

  constructor(
    private http: AuthService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
  }



}
