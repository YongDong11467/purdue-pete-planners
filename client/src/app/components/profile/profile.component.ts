import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, PatternValidator, Validators } from '@angular/forms';
import {ConfirmedValidator} from './confirmedValidator';
import { isConstructorDeclaration } from 'typescript';
import {ImageService} from './imageService';
import axios from 'axios';
import {testUsernameAvailable} from './user_available';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

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
  form2: FormGroup;
  form3: FormGroup;
  loading = false;
  submitted = false;
  selectedFile: ImageFile;
  closeResult = '';

  username = '';
  email = '';
  phone = '';
  major = '';
  address = '';

  curUser = JSON.parse(sessionStorage.curUser || '{}');
  user = this.curUser.user_name;
  oldpass = this.curUser.password;
  olduser = this.curUser.user_name;
  user_id = this.curUser._id;
  
  constructor(
    private formBuilder: FormBuilder,
    private formBuilder2: FormBuilder,
    private formBuilder3: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private imageService: ImageService,
    private modalService: NgbModal,
    private modalService2: NgbModal,
  ) {
    this.form = this.formBuilder.group({
      username: [this.curUser.user_name, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      phone: [this.user.phone, Validators.required],
      major: [this.user.major],
      address: [this.user.address],
      password: [this.user.password, [Validators.minLength(4), Validators.required, Validators.nullValidator]],
      confirmPassword: ['', [Validators.minLength(4), Validators.required, Validators.nullValidator]]

    }, {
      //validator: testUsernameAvailable(this.user),
      validator: ConfirmedValidator('password', 'confirmPassword'),
      // validator2: ConfirmedValidator(this.oldpass, 'password')
    });
    this.form2 = this.formBuilder2.group({
      username: [this.curUser.user_name],
      first: [this.user.first, [Validators.maxLength(20)]],
      last: [this.user.last, [Validators.maxLength(20)]],
      website: [this.user.website, [Validators.pattern('/(https?:\/\/)?(www\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)|(https?:\/\/)?(www\.)?(?!ww)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)')]],
      github: [this.user.github, [Validators.pattern('/(https?:\/\/)?(www\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)|(https?:\/\/)?(www\.)?(?!ww)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)')]],
      bio: [this.user.bio, [Validators.maxLength(100)]],
    });
    this.form3 = this.formBuilder3.group({
      username: [this.curUser.user_name],
      pfpURL: [this.user.pfpURL, [Validators.required, Validators.pattern('[^\\s]+(.*?)\\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$')]],
    });
  }

  ngOnInit(): void {
    this.curUser = JSON.parse(sessionStorage.curUser || '{}');
    this.form = this.formBuilder.group({
      username: [this.curUser.user_name, [Validators.required]],
      email: [this.user.email, [Validators.email]],
      phone: [this.user.phone, [Validators.pattern('[- +()0-9]+')]],
      major: [this.user.major],
      address: [this.user.address],
      password: [this.user.password, [Validators.minLength(4), Validators.required, Validators.nullValidator]],
      confirmPassword: ['', [Validators.minLength(4), Validators.required, Validators.nullValidator]]
    }, {
      //validator: testUsernameAvailable(this.user),
      validator: ConfirmedValidator('password', 'confirmPassword'),
      // validator2: ConfirmedValidator(this.oldpass, 'password')
    });
    console.log(this.user)
    this.form2 = this.formBuilder2.group({
      username: [this.curUser.user_name],
      first: [this.user.first, [Validators.maxLength(20)]],
      last: [this.user.last, [Validators.maxLength(20)]],
      website: [this.user.website, [Validators.pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)]],
      github: [this.user.github, [Validators.pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)]],
      bio: [this.user.bio],
    });
    this.form3 = this.formBuilder3.group({
      username: [this.curUser.user_name],
      pfpURL: [this.user.pfpURL, [Validators.required, Validators.pattern('[^\\s]+(.*?)\\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$')]],
    });
  }

  get f() {
    return this.form.controls;
  }

  get f2() {
    return this.form2.controls;
  }

  get f3() {
    return this.form3.controls;
  }

  onSubmit() {
    this.submitted = true;


    // reset alerts on submit
    // stop here if form is invalid
    //console.log("testusernames if equal: ", testUsernameAvailable(this.f.username.value, this.olduser));
    // if (this.form.invalid) {
    //   console.log('invalid user')
    //   return;
    // }
    if (this.form.invalid || (testUsernameAvailable(this.f.username.value, this.olduser) === 0 )) {
      console.log('invalid user')
      return;
    }
    if (this.f.password.value !== this.oldpass){
      // console.log(this.f.password.value)
      // console.log(this.oldpass)
      console.log('invalid pass')
      return;
    }
    this.loading = true;

    //console.log("testusernames if equal: ", testUsernameAvailable(this.f.username.value, this.olduser));
    // if((this.f.username.value !== null) && (testUsernameAvailable(this.f.username.value, this.olduser) == 1)){
    //   this.curUser.username = this.f.username.value;
    // }
    if(this.f.username.value !== null && testUsernameAvailable(this.f.username.value, this.olduser) !== 0){
      this.curUser.username = this.f.username.value;
    }
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

    let uname = this.curUser.username;
    let uemail = this.curUser.email;
    let uphone = this.curUser.phone;
    let umajor = this.curUser.major;
    let uaddress = this.curUser.address;
    let upass = this.curUser.password;
    let uid = this.user_id;

    //console.log(this.curUser)
    //console.log(uname, uemail, uphone, umajor, uaddress, upass, uid);

    axios.post('/api/account/profile', {
      "user_name": uname,
      "email": uemail,
      "phone": uphone,
      "major": umajor,
      "address": uaddress,
      "password": upass,
      "_id": uid,
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
  }

  get userInfo(){
    return this.user;
  }

  webImage(){
    if (this.form3.invalid || testUsernameAvailable(this.f3.username.value, this.olduser) === 0 ) {
      console.log('invalid user')
      return;
    }

    if(this.f3.pfpURL.value !== null){
      this.curUser.pfpURL = this.f3.pfpURL.value;
    }
    if(this.f3.username.value !== null && testUsernameAvailable(this.f3.username.value, this.olduser) !== 0){
      this.curUser.username = this.f3.username.value;
    }
    //console.log(this.f3.username.value, this.f3.pfpURL.value);
    let uname = this.curUser.username;

    axios.post('/api/account/profilePFP', {
      "user_name": uname,
      "pfpURL": this.curUser.pfpURL,
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
  }

  resetform() {
    this.submitted = false;
    this.form.reset();
  }

  resetform2() {
    this.form2.reset();
  }

  resetform3() {
    this.form3.reset();
  }

  
  deleteUser() {
    // n/A
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
            console.log(this.selectedFile);
            console.log(res);
            
            //this.selectedFile = res.data.filePath;
            this.onSuccess();

          },
          (err) => {
            this.onError();
          })
      });
      reader.readAsDataURL(file);
  }

  private reloadClass() {
    let currenturl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currenturl]);
  }

  open(content: any) {
    this.modalService.open(content,
   {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = 
         `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  open2(content2: any) {
    this.modalService.open(content2,
   {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = 
         `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  sidePanel () {
    if (this.form2.invalid || testUsernameAvailable(this.f2.username.value, this.olduser) === 0 ) {
      console.log('invalid user')
      return;
    }

    if(this.f2.first.value !== null){
      this.curUser.first = this.f2.first.value;
    }
    if(this.f2.last.value !== null){
      this.curUser.last = this.f2.last.value;
    }
    if(this.f2.website.value !== null){
      this.curUser.website = this.f2.website.value;
    }
    if(this.f2.github.value !== null){
      this.curUser.github = this.f2.github.value;
    }
    if(this.f2.bio.value !== null){
      this.curUser.bio = this.f2.bio.value;
    }
    if(this.f2.username.value !== null && testUsernameAvailable(this.f2.username.value, this.olduser) !== 0){
      this.curUser.username = this.f2.username.value;
    }
    console.log(this.f2.username.value, this.f2.first.value, this.f2.last.value, this.f2.website.value, this.f2.github.value, this.f2.bio.value);
    let uname = this.curUser.username;


    axios.post('/api/account/profileSideBar', {
      "user_name": uname,
      "first": this.curUser.first,
      "last": this.curUser.last,
      "website": this.curUser.website,
      "github": this.curUser.github,
      "bio": this.curUser.bio,
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
  }
}
