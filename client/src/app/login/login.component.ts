import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  login(){
    window.location.href = "/api/v1/auth/discord"
  }
}
