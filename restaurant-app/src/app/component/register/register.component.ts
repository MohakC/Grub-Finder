import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../model/user';
import { RegisterService } from '../../service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user : User;
  invalidForm : String = "";

  constructor(
    private router : Router,
    private registerService : RegisterService
  ) {}

  ngOnInit() {
  }

  onSubmit(form) {
    this.invalidForm = "";
    this.user = new User();
    for (let attr in form.value) {
      this.user[attr] = form.value[attr];
    }
    if (this.isValidForm(form)) {
      this.registerService.registerUser(this.user).subscribe((res) => {
        if (res.status === 201) {
          this.router.navigateByUrl('/login');
        }
      }, (err) => {
        console.log(err);
        this.invalidForm = err.error.message;
      });
    } else { 
      this.invalidForm = "Some fields are invalid";
    }
  }

  isValidForm(form) {
    if (form === undefined) {
      return false;
    }
    if (this.validateAlphaChar(this.user["fname"]) ||
          this.validateAlphaChar(this.user["lname"]) ||
          this.validateUserName(this.user["username"]) ||
          this.validateUserNameLength(this.user["username"]) ||
          this.validateEmail(this.user["email"]) ||
          this.validatePhoneNumber(this.user["phone"]) ||
          this.validatePassword(this.user["password"])) {
            return false;
        }
    return true;
  }

  //these tests return true if invalid input
  validateAlphaChar(value) {
    return !(/^[A-Za-z]+$/.test(value)) && value.length !== 0;
  }

  validateUserName(value) {
    return !(/^\w+$/.test(value)) && value.length !== 0;
  }

  validateUserNameLength(value) {
    return value.length < 6 || value.length > 14 || value.length === 0;
  }

  validatePassword(value) {
    return value.length < 6 || value.length === 0;
  }

  validatePhoneNumber(value) {
    return !(/^[1-9]{1}[0-9]{3,14}$/.test(value)) && value.length !== 0;
  }

  validateEmail(value) {
    return !(/\S+@\S+\.\S+/.test(value)) && value.length !== 0;
  }
}
