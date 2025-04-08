import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

@NgModule({
	declarations: [
		LoginComponent,
		RegisterComponent,
		ForgotPasswordComponent,
		ResetPasswordComponent,
	],
	imports: [CommonModule, ReactiveFormsModule, AuthRoutingModule],
})
export class AuthModule {}
