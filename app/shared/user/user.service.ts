import { Injectable } from "@angular/core";

import { User } from './user';


@Injectable()
export class UserService {
  register(user: User) {
    alert("About to register: " + user.email);
    console.log("You're using: ", user.email);
  }
}
