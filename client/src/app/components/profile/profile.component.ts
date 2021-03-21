import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {ConfirmedValidator} from './confirmedValidator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      major: [''],
      address: [''],
      password: ['', [Validators.minLength(6), Validators.required, Validators.nullValidator]],
      confirmPassword: ['', [Validators.required, Validators.nullValidator]]
    }, {
      validator: ConfirmedValidator('password', 'confirmPassword')
    });
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: [''],
      email: ['', [Validators.email]],
      phone: ['', [Validators.pattern('[- +()0-9]+')]],
      major: [''],
      address: [''],
      password: ['', [Validators.minLength(6), Validators.required, Validators.nullValidator]],
      confirmPassword: ['', [Validators.required, Validators.nullValidator]]
    }, {
      validator: ConfirmedValidator('password', 'confirmPassword')
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    alert('New values: \n\n' + JSON.stringify(this.form.value, null, 4));
  }

  resetform() {
    this.form.reset();
  }

  // need first ability to add users
  deleteUser() {
    // admin.auth().deleteUser(uid)
    // .then(function() {
    //   console.log('Successfully deleted user');
    // })
    // .catch(function(error) {
    //   console.log('Error deleting user:', error);
    // });
  }
}
