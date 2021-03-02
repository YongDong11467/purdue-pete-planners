import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-event-create',
    templateUrl: './event-create.component.html',
})
export class EventCreateComponent implements OnInit {

    name = '';
    desc = '';
    dTime = '';
    repeat = ''; 
form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {     
    this.form = this.formBuilder.group({
      eventName: ['', Validators.required],
      eventDescription: ['', Validators.required],
      eventDate: [null, Validators.required],
      repeatChoice: [null, Validators.required]
    }); 
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
        eventName: ['', Validators.required],
        eventDescription: ['', Validators.required],
        eventDate: [null, Validators.required],
        repeatChoice: [null, Validators.required]
      }); 
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    //alert('hey');
    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.loading = true;
}

onAddEvent(nameInput: HTMLInputElement, descInput: HTMLTextAreaElement, dTimeInput: HTMLInputElement, repeatInput: HTMLInputElement){
        this.name = nameInput.value;
        this.desc = descInput.value;
        this.dTime = dTimeInput.value;
        this.repeat = repeatInput.value;
}

}