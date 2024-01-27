import { provideHttpClient } from '@angular/common/http';
import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

const initializeFontAwesomeFactory = (faIconLibrary: FaIconLibrary) => {
    return () => new Promise<void>(resolve => {
        faIconLibrary.addIconPacks(fas);
        resolve();
    });
};

export const appConfig: ApplicationConfig = {
    providers: [provideHttpClient(),
    {
        provide: APP_INITIALIZER,
        useFactory: initializeFontAwesomeFactory,
        deps: [FaIconLibrary],
        multi: true,
    }],

};
