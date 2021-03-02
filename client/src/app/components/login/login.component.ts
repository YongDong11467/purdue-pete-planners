import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {     
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    }); 
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    let user = this.f.username.value;
    let pass = this.f.password.value;

    login(user,pass);
    // Function to login asynchronously

    this.loading = true;

  }

  
}

async function login(user:String,pass:String) {
  let init = {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ "username": user, "password": pass})
  };

  // This line checks the server
  let apiResp = await fetch("http://localhost:3080/api/account/login", init);
  let jsonData = await apiResp.json();
  console.log(jsonData);
}
