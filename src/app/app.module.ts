import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BuscaIngresosComponent } from './components/busca-ingresos/busca-ingresos.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [AppComponent],
  imports: [
  	HttpClientModule
  ],
  exports: [
    AppComponent
  ]
})
export class AppModule { }
