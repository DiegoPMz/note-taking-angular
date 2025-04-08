import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchPasswordValidator(
	passwordField: string,
	confirmPasswordField: string
): ValidatorFn {
	return (formControls: AbstractControl): ValidationErrors | null => {
		const password = formControls.get(passwordField)?.value;
		const confirmPassword = formControls.get(confirmPasswordField)?.value;

		if (password !== confirmPassword) {
			return { passwordsMismatch: true };
		}
		return null;
	};
}
