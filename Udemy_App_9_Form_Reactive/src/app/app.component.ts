import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUserNames = ['Chris', 'Anna'];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.signupForm = new FormGroup({
      //FormControl's param: 1st: initial value, 2nd singular validator, 3rd async validator
      userData: new FormGroup({
        //this.forbiddenNames se bi loi, phai chuyen thanh this.forbiddenNames.bind(this)
        //nhin thi giong nhu ta goi den this.forbiddenNames, nhung thuc te Angular se goi den ham nay,
        //va tu ben ngoai class thi khong the truy cap vao method nay duoc
        username: new FormControl(null, [
          Validators.required,
          this.forbiddenNames.bind(this),
        ]),
        email: new FormControl(
          null,
          [Validators.required, Validators.email],
          this.forbiddenEmails.bind(this)
        ),
      }),
      gender: new FormControl('male'),
      hobbies: new FormArray([]),
    });

    //Thuc hien neu co thay doi ve value hay status
    this.signupForm.valueChanges.subscribe((value) => {
      console.log(value);
    });

    this.signupForm.statusChanges.subscribe((status) => {
      console.log(status);
    });

    //Van co cac ham set va patch
    this.signupForm.setValue({
      userData: {
        username: 'Max',
        email: 'Max@gmail.com',
      },
      gender: 'male',
      hobbies: [],
    });

    this.signupForm.patchValue({
      userData: {
        username: 'Max2',
      },
    });
  }

  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset();
  }

  onAddHoby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  //Custom validator
  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    //Neu control.value tra ve gia tri trong mang forbiddenUserNames thi return ve -1, va -1 duoc thong dich la true
    if (this.forbiddenUserNames.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Observable<any> | Promise<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@gmail.com') {
          resolve({ emailIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
