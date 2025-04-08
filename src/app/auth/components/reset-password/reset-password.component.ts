import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { matchPasswordValidator } from '@app/auth/validators/matchPasswordValidator';
import { SupabaseService } from '@app/core/services/supabase.service';

interface InputsMode {
	password: 'password' | 'text';
	confirm_password: 'password' | 'text';
}

@Component({
	selector: 'app-reset-password',
	templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent {
	resetPasswordForm = new FormGroup(
		{
			password: new FormControl('', {
				nonNullable: true,
				validators: [Validators.required, Validators.minLength(8)],
			}),
			confirm_password: new FormControl('', {
				nonNullable: true,
			}),
		},
		{ validators: [matchPasswordValidator('password', 'confirm_password')] }
	);

	inputsMode: InputsMode = {
		password: 'password',
		confirm_password: 'password',
	};

	isLoading = false;

	togglePasswordVisibility(inputName: keyof InputsMode) {
		if (inputName === 'password') {
			this.inputsMode = {
				...this.inputsMode,
				password: this.inputsMode.password === 'password' ? 'text' : 'password',
			};
			return;
		}

		this.inputsMode = {
			...this.inputsMode,
			confirm_password:
				this.inputsMode.confirm_password === 'password' ? 'text' : 'password',
		};
	}

	get passwordControl() {
		return this.resetPasswordForm.controls.password;
	}
	get confirmPasswordControl() {
		return this.resetPasswordForm.controls.confirm_password;
	}

	constructor(
		private readonly supabase: SupabaseService,
		private readonly router: Router
	) {}

	onSubmit() {
		if (this.resetPasswordForm.invalid) {
			this.resetPasswordForm.markAllAsTouched();
			return;
		}

		this.isLoading = true;
		this.supabase
			.passwordReset(this.passwordControl.value)
			.then(res => {
				if (!res || res.error) {
					console.log(res?.error);
					return;
				}
				this.resetPasswordForm.reset();
				return this.router.navigateByUrl('');
			})
			.finally(() => (this.isLoading = false));
	}
}
