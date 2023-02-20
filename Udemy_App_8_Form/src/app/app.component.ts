import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('f') signUpForm: NgForm;
  defaultQuestion = 'pet';
  answer = '';
  genders = ['male', 'female'];
  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: '',
  };
  submitted = false;

  suggestUserName() {
    const suggestedName = 'Superuser';
    // this.signUpForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: '',
    //   },
    //   secret: 'pet',
    //   questionAnswer: '',
    //   gender: 'male',
    // });

    //setValue() # patchValue o cho setValue() phai set cho toan bo thuoc tinh trong form do, patchValue() khong can phai set toan bo
    this.signUpForm.form.patchValue({
      userData: {
        username: suggestedName,
      },
    });
  }

  // onSubmit(form: HTMLElement) {
  //   console.log(form);
  // }

  //Co the lay truc tiep NgForm
  // onSubmit(form: NgForm) {
  //   console.log(form);
  // }

  onSubmit() {
    //console.log(this.signUpForm);
    this.user.username = this.signUpForm.value.userData.username;
    this.user.email = this.signUpForm.value.userData.email;
    this.user.secretQuestion = this.signUpForm.value.secret;
    this.user.answer = this.signUpForm.value.questionAnswer;
    this.user.gender = this.signUpForm.value.gender;
    this.submitted = true;

    this.signUpForm.reset();
  }
}
