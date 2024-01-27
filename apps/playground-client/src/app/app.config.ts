import { provideHttpClient } from '@angular/common/http';
import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { IonicStorageModule } from '@ionic/storage-angular';
import { StorageService } from '@ngneers/service';

const initializeFontAwesomeFactory = (faIconLibrary: FaIconLibrary) => {
  return () => new Promise<void>(resolve => {
    faIconLibrary.addIconPacks(fas);
    resolve();
  });
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    importProvidersFrom([IonicStorageModule.forRoot()]),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeFontAwesomeFactory,
      deps: [FaIconLibrary],
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (storageService: StorageService) => () => storageService.init(),
      deps: [StorageService],
      multi: true,

    }
  ],

};
