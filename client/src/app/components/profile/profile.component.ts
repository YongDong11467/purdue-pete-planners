import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {ConfirmedValidator} from './confirmedValidator';
import { isConstructorDeclaration } from 'typescript';
import {ImageService} from './imageService';
import axios from 'axios';

class ImageFile {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  selectedFile: ImageFile;

  username = ''
  email = ''
  phone = ''
  major = ''
  address = ''

  curUser = JSON.parse(sessionStorage.curUser || '{}');
  user = this.curUser.user_name;
  oldpass = this.curUser.password;
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private imageService: ImageService
  ) {
    this.form = this.formBuilder.group({
      username: [this.user], //['', Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      phone: [this.user.phone, Validators.required],
      major: [this.user.major],
      address: [this.user.address],
      password: [this.user.password, [Validators.minLength(4), Validators.required, Validators.nullValidator]],
      confirmPassword: ['', [Validators.minLength(4), Validators.required, Validators.nullValidator]]
    }, {
      validator: ConfirmedValidator('password', 'confirmPassword'),
      // validator2: ConfirmedValidator(this.oldpass, 'password')
    });
  }

  ngOnInit(): void {
    this.curUser = JSON.parse(sessionStorage.curUser || '{}');
    this.form = this.formBuilder.group({
      username: [this.user],
      email: [this.user.email, [Validators.email]],
      phone: [this.user.phone, [Validators.pattern('[- +()0-9]+')]],
      major: [this.user.major],
      address: [this.user.address],
      password: [this.user.password, [Validators.minLength(4), Validators.required, Validators.nullValidator]],
      confirmPassword: ['', [Validators.minLength(4), Validators.required, Validators.nullValidator]]
    }, {
      validator: ConfirmedValidator('password', 'confirmPassword'),
      // validator2: ConfirmedValidator(this.oldpass, 'password')
    });
    // console.log(this.user)
    console.log(this.oldpass);
    console.log('password');
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
    console.log("curUser.pass: ", this.curUser.password);
    console.log("curUser.major: ", this.curUser.major);
    console.log("f.major.value: ", this.f.major.value);
    if(this.f.email.value !== null){
      this.curUser.email = this.f.email.value;
    }
    if(this.f.major.value !== null){
      this.curUser.major = this.f.major.value;
    }
    if(this.f.address.value !== null){
      this.curUser.address = this.f.address.value;
    }
    if(this.f.phone.value !== null){
      this.curUser.phone = this.f.phone.value;
    }
    if(this.f.address.value !== null){
      this.curUser.address = this.f.address.value;
    }

    // this.curUser.email = this.f.email.value;
    // this.curUser.phone = this.f.phone.value;
    // this.curUser.major = this.f.major.value;
    console.log("curUser.major: ", this.curUser.major);
    // this.curUser.address = this.f.address.value;
    //this.curUser.password = this.f.password.value;

    let uname = this.curUser.user_name;
    let uemail = this.curUser.email;
    let uphone = this.curUser.phone;
    let umajor = this.curUser.major;
    let uaddress = this.curUser.address;
    let upass = this.curUser.password;

    console.log("umajor: ", umajor);
    
    console.log(this.curUser)
    console.log(uname, uemail, uphone, umajor, uaddress, upass);
    //profUpdate(uname, uemail, uphone, umajor, uaddress, upass);
    // alert('New values: \n\n' + JSON.stringify(this.form.value, null, 4));

    axios.post('/api/account/profile', {
      "user_name": uname,
      "email": uemail,
      "phone": uphone,
      "major": umajor,
      "address": uaddress,
      "password": upass
    }).then((response) => {
      // this.userInfo();
      axios.get(`/api/account/searchUsers`, { params: { prefix: uname } })
      .then((res) => {
        console.log(res.data[0])
        if (typeof res.data[0] === 'undefined'){
          console.log('No matching users')
        } else {
          sessionStorage.setItem('curUser', JSON.stringify(res.data[0]));
        }
      });

      this.loading = true;
      this.router.navigate(['/profile']);
    }).catch((error) => {
      console.log(error);
    });

    //profUpdate(uname, uemail, uphone, umajor, uaddress, upass);
    // .then((res) => {
    //   console.log(res.data[0])
    //   if (typeof res.data[0] === 'undefined'){
    //     console.log('No matching users')
    //   } else {
    //     sessionStorage.setItem('curUser', JSON.stringify(res.data[0]));
    //   }
    // });
  }

  get userInfo(){
    return this.user;
  }

  resetform() {
    this.submitted = false;
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

  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'works';
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'no work';
    this.selectedFile.src = '';
  }
  
  processImageInput(imageInput: any) {
      const file: File = imageInput.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', (event: any) => {

        this.selectedFile = new ImageFile(event.target.result, file);

        this.selectedFile.pending = true;
        this.imageService.uploadImage(this.selectedFile.file).subscribe(
          (res) => {
            this.onSuccess();
          },
          (err) => {
            this.onError();
          })
      });
      reader.readAsDataURL(file);
  }
}

async function profUpdate(uname:String, email:String, phone:String, major:String, address:String, pass:String) {
  let init = {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ "uname": uname, "uemail": email, "uphone":phone, "umajor":major, "uaddress":address, "upass":pass}),
    mode: 'no-cors' as RequestMode
  };

  // This line checks the server
  let apiResp = await fetch("http://localhost:3080/api/account/profile", init);
  let jsonData
  try {
    jsonData = await apiResp.json();
  } catch(e) {
    console.log('error:', e.message);
  }
  console.log(jsonData);
}
