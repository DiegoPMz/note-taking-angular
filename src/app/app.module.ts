import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './shared/header/header.module';
import { SidebarModule } from './shared/sidebar/sidebar.module';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, AppRoutingModule, HeaderModule, SidebarModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
