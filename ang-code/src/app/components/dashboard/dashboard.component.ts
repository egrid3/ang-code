import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: object;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = (profile as any).user;
    },
    err => {
      console.log(err);
      return false;
    });
  }

}
