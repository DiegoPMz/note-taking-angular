import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from '@app/core/services/supabase.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
})
export class RegisterComponent {
	registerFormSubmitError = {
		hasError: false,
		message: 'An error occurred. Please try again.',
	};

	inputMode: 'password' | 'text' = 'password';
	isLoading = false;

	registerForm = new FormGroup({
		email: new FormControl('', {
			validators: [Validators.required, Validators.email],
		}),
		password: new FormControl<string>('', {
			validators: [Validators.required, Validators.minLength(8)],
		}),
	});

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

	constructor(
		private readonly supabase: SupabaseService,
		private readonly router: Router
	) {}

	onSubmit() {
		if (this.registerForm.invalid) {
			this.registerForm.markAllAsTouched();
			return;
		}

		const email = this.emailControl.value;
		const password = this.passwordControl.value;
		if (!email || !password) return;
		this.isLoading = true;

		this.supabase
			.signUp(email, password)
			.then(({ data, error }) => {
				if (data.user && !error) {
					this.registerForm.reset();
					return this.router.navigateByUrl('');
				}

				this.registerFormSubmitError = {
					...this.registerFormSubmitError,
					hasError: true,
					message: error?.message ?? this.registerFormSubmitError.message,
				};

				return;
			})
			.finally(() => (this.isLoading = false));
	}

	loginWithGoogle() {
		this.supabase
			.signInWithGoogle()
			.then(({ data, error }) => {
				this.isLoading = true;

				if (!error || !data.url) {
					this.registerForm.reset();
					return this.router.navigateByUrl('');
				}

				this.registerFormSubmitError = {
					...this.registerFormSubmitError,
					hasError: true,
					message: error?.message ?? this.registerFormSubmitError.message,
				};

				return;
			})
			.finally(() => (this.isLoading = false));
	}
}
