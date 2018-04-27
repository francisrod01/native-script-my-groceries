import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router, Route } from "@angular/router";
import { Page } from "ui/page";
import { Color } from "color";
import { View } from "ui/core/view";
import { setHintColor } from "../../utils/hint-util";
import { TextField } from "ui/text-field";

import { UserService } from "../../shared/user/user.service";
import { User } from "../../shared/user/user";

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
export class LoginComponent implements OnInit {
  user: User;
  isLoggingIn = true;
  @ViewChild("container") container: ElementRef;
  @ViewChild("email") email: ElementRef;
  @ViewChild("password") password: ElementRef;

  constructor(
    private router: Router,
    private userService: UserService,
    private page: Page
  ) {
    this.user = new User();
  }

  setTextFieldColors() {
    const emailTextField = <TextField>this.email.nativeElement;
    const passwordTextField = <TextField>this.password.nativeElement;

    const mainTextColor = new Color(this.isLoggingIn ? "black": "#C4AFB4");
    
    emailTextField.color = mainTextColor;
    passwordTextField.color = mainTextColor;

    const hintColor = new Color(this.isLoggingIn ? "#ACA6A7" : "#C4AFB4");
    setHintColor({ view: emailTextField, color: hintColor });
    setHintColor({ view: passwordTextField, color: hintColor });
  }

  ngOnInit() {
    this.page.actionBarHidden = true;
    this.page.backgroundImage = "res://bg_login";
  }

  submit() {
    if (!this.user.isValidEmail()) {
      alert("Enter a valid email address.");
      return;
    }

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
    this.setTextFieldColors();
    const container = <View>this.container.nativeElement;
    container.animate({
      backgroundColor: this.isLoggingIn ? new Color("white") : new Color("#301217"),
      duration: 200
    });
  }
}
