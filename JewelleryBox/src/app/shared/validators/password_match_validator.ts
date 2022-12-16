import { AbstractControl } from "@angular/forms"

export const PasswordsMatchValidator = (passwordValue:string, confirmPasswordValue:string) => {
    const validator = (form:AbstractControl) => {
        const password = form.get(passwordValue);
        const confirmPassword = form.get(confirmPasswordValue);

        if(!password || !confirmPassword) return;

        if(password.value !== confirmPassword.value){
            confirmPassword.setErrors({notMatch: true})
        }else{
            const errors = confirmPassword.errors;
            if(!errors) return;

            delete errors["notMatch"];
            confirmPassword.setErrors(errors);
        }
    }

    return validator;
}