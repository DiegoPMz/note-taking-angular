import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SupabaseService } from '@app/core/services/supabase.service';

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent {
	forgotPasswordForm = new FormGroup({
		email: new FormControl<string>('', {
			nonNullable: true,
			validators: [Validators.required, Validators.email],
		}),
	});

	isLoading = false;
	isEmailConfirmationModalVisible = false;

	constructor(private readonly supabase: SupabaseService) {}

	get emailControl() {
		return this.forgotPasswordForm.controls.email;
	}

	onSubmit() {
		if (this.forgotPasswordForm.controls.email.invalid) {
			this.forgotPasswordForm.markAllAsTouched();
			return;
		}
		this.isLoading = true;

		this.supabase
			.passwordRecovery(this.emailControl.value)
			.then(({ error }) => {
				if (error) return;

				this.isEmailConfirmationModalVisible = true;
			})
			.finally(() => (this.isLoading = false));
	}
}
