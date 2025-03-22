import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
	declarations: [LoginComponent],
	imports: [CommonModule, ReactiveFormsModule, AuthRoutingModule],
})
export class AuthModule {}
