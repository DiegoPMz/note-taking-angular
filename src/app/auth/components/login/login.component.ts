import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from '@app/core/services/supabase.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
})
export class LoginComponent {
	loginFormSubmitError = {
		hasError: false,
		message: 'An error occurred. Please try again.',
	};

	isLoading = false;
	inputMode: 'password' | 'text' = 'password';

	loginForm = new FormGroup({
		email: new FormControl<string>('', {
			validators: [Validators.required, Validators.email],
			nonNullable: true,
		}),
		password: new FormControl<string>('', {
			validators: [Validators.required],
			nonNullable: true,
		}),
	});

	get emailControl(): FormControl<string | null> {
		return this.loginForm.controls.email;
	}

	get passwordControl(): FormControl<string | null> {
		return this.loginForm.controls.password;
	}

	togglePasswordVisibility() {
		this.inputMode = this.inputMode === 'password' ? 'text' : 'password';
	}

	constructor(
		private readonly supabase: SupabaseService,
		private readonly router: Router
	) {}

	onSubmit() {
		if (this.loginForm.invalid) {
			this.loginForm.markAllAsTouched();
			return;
		}

		const email = this.emailControl.value;
		const password = this.passwordControl.value;
		if (!email || !password) return;
		this.isLoading = true;

		this.supabase
			.signIn(email, password)
			.then(({ data, error }) => {
				if (!error && data.user) {
					this.loginForm.reset();
					return this.router.navigateByUrl('');
				}

				this.loginFormSubmitError = {
					...this.loginFormSubmitError,
					hasError: true,
					message: error?.message ?? this.loginFormSubmitError.message,
				};

				return;
			})
			.finally(() => (this.isLoading = false));
	}

	loginWithGoogle() {
		this.supabase
			.signInWithGoogle()
			.then(({ error }) => {
				this.isLoading = true;

				if (!error) {
					this.loginForm.reset();
					return this.router.navigateByUrl('');
				}

				this.loginFormSubmitError = {
					...this.loginFormSubmitError,
					hasError: true,
					message: error?.message || 'An error occurred. Please try again.',
				};

				return;
			})
			.finally(() => (this.isLoading = false));
	}
}
