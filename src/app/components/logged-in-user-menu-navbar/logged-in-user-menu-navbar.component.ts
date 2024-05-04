import { Component, Input } from '@angular/core';
import { BurguerMenuBtnComponent } from '../burguer-menu-btn/burguer-menu-btn.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-logged-in-user-menu-navbar',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        BurguerMenuBtnComponent,
        NgOptimizedImage
    ],
    templateUrl: './logged-in-user-menu-navbar.component.html',
    styleUrl: './logged-in-user-menu-navbar.component.css'
})
export class LoggedUserMenuNavbarComponent {
    lookup: FormControl = new FormControl('');
    @Input() theme: string | undefined;
    @Input() rolName: string = '';
    @Output() navLookupInputEvent: EventEmitter<string> = new EventEmitter<string>();
    @Output() themeTogglerEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

    sendNavLookupValue(event: Event): void {
        const value: string = (event.target as HTMLInputElement).value;
        this.navLookupInputEvent.emit(value);
    }
    /**  
     * Cuando se da click optando por tema 'dark' el evento de output se en-
     * vía false y cuando se da click para cambiar a 'light' se envía true
    */
    toggleTheme(): void {
        this.theme != undefined && this.theme === "light" ? (
            this.themeTogglerEvent.emit(false),
            this.theme = "dark"
        ) : (
            this.themeTogglerEvent.emit(true),
            this.theme = "light"
        );

    }
}