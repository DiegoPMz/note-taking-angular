import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
})
export class LoginComponent {
	loginForm = new FormGroup({
		email: new FormControl('', {
			validators: [Validators.required, Validators.email],
		}),
		password: new FormControl<string>('', {
			validators: [Validators.required],
		}),
	});

	inputMode: 'password' | 'text' = 'password';

	togglePasswordVisibility() {
		this.inputMode = this.inputMode === 'password' ? 'text' : 'password';
	}

	onSubmit() {
		if (this.loginForm.invalid) {
			this.loginForm.markAllAsTouched();
			return;
		}
	}

	get emailControl(): FormControl<string | null> {
		return this.loginForm.controls.email;
	}

	get passwordControl(): FormControl<string | null> {
		return this.loginForm.controls.password;
	}
}
