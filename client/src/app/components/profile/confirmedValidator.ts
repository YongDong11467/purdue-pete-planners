 import { FormGroup } from '@angular/forms';
    
export function ConfirmedValidator(password: string, confirmPass: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[password];
        const matchingControl = formGroup.controls[confirmPass];
        // console.log("password: ", password);
        // console.log("confirm: ", confirmPass);
        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}