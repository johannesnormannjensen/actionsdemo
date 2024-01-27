import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Playground } from '@ngneers/data';
import * as localForage from "localforage";
import { Observable, from, of, pipe, BehaviorSubject, filter, OperatorFunction } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

localForage.config({ driver: localForage.INDEXEDDB });

export const truthy = <T>() => pipe(filter(x => !!x) as OperatorFunction<T | null | undefined | '', T>);

@Injectable({
  providedIn: 'root'
})
export class PlaygroundService {
  #store$ = new BehaviorSubject<LocalForage | null>(null);

  constructor(private http: HttpClient) {
    const store = localForage.createInstance({ name: "playgrounds" });
    store.ready(() => this.#store$.next(store));
  }

  get store$(): Observable<LocalForage> {
    return this.#store$.pipe(truthy());
  }

  list(): Observable<Playground[]> {
    return this.store$.pipe(
      switchMap(store => store.getItem<Playground[]>('playgrounds')),
      switchMap(playgrounds => playgrounds ? of(playgrounds) : this.http.get<Playground[]>('assets/copenhagen.json')),
      switchMap(playgrounds => this.store$.pipe(switchMap(store => store.setItem('playgrounds', playgrounds))).pipe(
        map(() => playgrounds)
      )),
    );
  }

  get(id: string): Observable<Playground | undefined> {
    return this.list().pipe(
      map(playgrounds => playgrounds.find(playground => playground.id === id))
    );
  }

  create(playground: Playground): Observable<Playground> {
    return this.list().pipe(
      map(playgrounds => [...playgrounds, playground]),
      switchMap(playgrounds => this.store$.pipe(switchMap(store => store.setItem('playgrounds', playgrounds))).pipe(
        map(() => playgrounds)
      )),
      map(playgrounds => playgrounds.find(p => p.id === playground.id)!)
    );
  }

  update(id: string, playground: Partial<Playground>): Observable<Playground> {
    return this.list().pipe(
      map(playgrounds => playgrounds.map(p => p.id === id ? { ...p, ...playground } : p)),
      switchMap(playgrounds => this.store$.pipe(switchMap(store => store.setItem('playgrounds', playgrounds))).pipe(
        map(() => playgrounds)
      )),
      map(playgrounds => playgrounds.find(p => p.id === id)!)
    );
  }

  delete(id: string): Observable<void> {
    return this.list().pipe(
      map(playgrounds => playgrounds.filter(p => p.id !== id)),
      switchMap(playgrounds => this.store$.pipe(switchMap(store => store.setItem('playgrounds', playgrounds))).pipe(
        map(() => playgrounds)
      )),
      map(() => undefined)
    );
  }

}
