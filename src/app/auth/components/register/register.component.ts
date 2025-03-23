import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
})
export class RegisterComponent {
	registerForm = new FormGroup({
		email: new FormControl('', {
			validators: [Validators.required, Validators.email],
		}),
		password: new FormControl<string>('', {
			validators: [Validators.required, Validators.minLength(8)],
		}),
	});

	onSubmit() {
		if (this.registerForm.invalid) {
			this.registerForm.markAllAsTouched();
			return;
		}
	}

	inputMode: 'password' | 'text' = 'password';

	togglePasswordVisibility() {
		this.inputMode = this.inputMode === 'password' ? 'text' : 'password';
	}

	get emailControl(): FormControl<string | null> {
		return this.registerForm.controls.email;
	}

	get passwordControl(): FormControl<string | null> {
		return this.registerForm.controls.password;
	}

	hasInputError(name: 'password' | 'email') {
		if (name === 'email') {
			const hasError = this.emailControl.errors;
			return this.emailControl.touched && hasError !== null;
		}

		const hasError = this.passwordControl.errors;
		return this.passwordControl.touched && hasError !== null;
	}
}
