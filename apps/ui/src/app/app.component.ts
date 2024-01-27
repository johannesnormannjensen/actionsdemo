import { Component } from '@angular/core';
import { RouterParamsService, UserService } from '@ngneers/ui/service';

@Component({
    selector: 'ngneers-root',
    template: `
    <common-toast aria-live="polite" aria-atomic="true"></common-toast>
    <common-nav [user]="user$ | async" (logout)="logout()"></common-nav>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
    user$ = this.userService.user$;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    constructor(private userService: UserService, routerParams: RouterParamsService) {
    }

    logout() {
        this.userService.logout();
    }
}
