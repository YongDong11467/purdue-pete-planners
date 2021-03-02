import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common'

@Component({
    selector: 'app-event-create',
    templateUrl: './event-create.component.html',
})
export class EventCreateComponent implements OnInit {

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
      eventDate: [new Date(), Validators.required]
    }); 
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
        eventName: ['', Validators.required],
        eventDescription: ['', Validators.required],
        eventDate: [new Date(), Validators.required]
      }); 
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.loading = true;

}
}