import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: string;
  username: string;
  email: string;
  password: string;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    // Requiered Fields
    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show('Please fill in all fields correctly', {cssClass: 'alert-danger', timeout: 2875});
      return false;
    }

    // Requiered Email
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show('Please use a valid email (pretty please...^^)', {cssClass: 'alert-danger', timeout: 2875});
      return false;
    }

    // Register User
    this.authService.registerUser(user).subscribe(data => {
      if((data as any).success){
        this.flashMessage.show('You are now registered and can log in like Flynn', {cssClass: 'alert-success', timeout: 2875});
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show('Somethin\' got messed up...(shrug)', {cssClass: 'alert-danger', timeout: 2875});
        this.router.navigate(['/register']);
      }
    });
  }

}
