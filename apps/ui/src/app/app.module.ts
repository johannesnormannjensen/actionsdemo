/* eslint-disable no-console */
import { HttpClientModule } from '@angular/common/http';
import { isDevMode, NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { connectAuthEmulator, getAuth } from '@angular/fire/auth';
import { connectFirestoreEmulator, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { connectFunctionsEmulator, getFunctions, provideFunctions } from '@angular/fire/functions';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NavComponent, ToastComponent } from '@ngneers/ui/common';
import { environment } from '@ngneers/ui/environment';
import { initializers, ngneersTranslateModule } from '@ngneers/ui/service';
import { LumberjackLevel, provideLumberjack } from '@ngworker/lumberjack';
import { provideLumberjackConsoleDriver } from '@ngworker/lumberjack/console-driver';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';

@NgModule({
    imports: [
        NavComponent,
        ToastComponent,
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        HttpClientModule,
        provideFirebaseApp(() => {
            const app = initializeApp(environment.firebaseConfig);
            isDevMode() && console.log('Initializing Firebase app', environment.firebaseConfig);
            if (environment.useEmulator) {
                console.warn('Using auth emulator');
                connectAuthEmulator(getAuth(), 'http://localhost:9099');
            }
            return app;
        }),
        provideFirestore(() => {
            const db = getFirestore();
            if (environment.useEmulator) {
                connectFirestoreEmulator(db, 'localhost', 8080);
                console.warn('Using firestore emulator');
            }
            return db;
        }),
        provideFunctions(() => {
            const functions = getFunctions(undefined, 'europe-west1');
            if (environment.useEmulator) {
                connectFunctionsEmulator(functions, 'localhost', 5001);
                console.warn('Using functions emulator');
            }
            return functions;
        }),
        ngneersTranslateModule,
    ],
    declarations: [AppComponent],
    providers: [
        ...initializers,
        provideLumberjack(),
        provideLumberjackConsoleDriver({
            levels: environment.production ? [LumberjackLevel.Error] : [LumberjackLevel.Debug, LumberjackLevel.Info, LumberjackLevel.Warning, LumberjackLevel.Error],
        }),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
