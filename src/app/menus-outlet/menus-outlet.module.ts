import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenusOutletRoutingModule } from './menus-outlet-routing.module';
import { AuthComponent } from './menus-outlet.component';
import { RouterOutlet } from '@angular/router';


@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    MenusOutletRoutingModule,
    CommonModule,
    RouterOutlet
  ],
  exports: [
    AuthComponent
  ]
})
export class MenusOutletModule { }
