import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';



@NgModule({
  declarations: [AppComponent],
  imports: [
  	HttpClientModule
  ],
  exports: [
    AppComponent
  ],
  providers: [
    CookieService
  ]
})
export class AppModule { }
