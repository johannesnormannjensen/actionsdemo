import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  set<T>(key: string, value: T): Promise<void> {
    return this._storage?.set(key, value) as Promise<void>;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  get<T>(key: string): Promise<T> {
    return this._storage?.get(key) as Promise<T>;
  }
}
