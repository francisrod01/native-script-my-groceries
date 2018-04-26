import { Component } from "@angular/core";
import { Router, Route } from "@angular/router";

import { UserService } from '../../shared/user/user.service';
import { User } from '../../shared/user/user';

@Component({
  selector: "login",
  providers: [
    UserService
  ],
  templateUrl: "./pages/login/login.html",
  styleUrls: [
    "pages/login/login-common.css",
    "pages/login/login.css"
  ]
})
export class LoginComponent {
  user: User;
  isLoggingIn = true;

  constructor(private router: Router, private userService: UserService) {
    this.user = new User();
  }

  submit() {
    if (this.isLoggingIn) {
      this.login();
    } else {
      this.signUp();
    }
  }
  login() {
    this.userService.login(this.user)
      .subscribe(
        () => this.router.navigate(["/list"]),
        (error) => alert("Unfortunately we could not find your account.")
      );
  }
  signUp() {
    this.userService.register(this.user)
      .subscribe(
        () => {
          alert("Your account was successfully created.");
          this.toggleDisplay();
        },
        () => {
          alert("Unfortunately we were unable to create your account.");
        }
      );
  }
  toggleDisplay() {
    this.isLoggingIn = !this.isLoggingIn;
  }
}
