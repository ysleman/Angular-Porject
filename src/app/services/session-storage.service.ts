import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  private storageKey = 'CurrentLoc'; // Your session storage key
  private sessionObjectSubject = new BehaviorSubject<any>(null);

  constructor() {
    this.checkStorage();
  }

  // Call this method to start watching for changes
  watchSessionStorage() {
    window.addEventListener('storage', () => this.checkStorage());
    this.checkStorage();
  }

  private checkStorage() {
    const sessionObject = sessionStorage.getItem(this.storageKey);
    const parsedObject = sessionObject ? JSON.parse(sessionObject) : null;
    this.sessionObjectSubject.next(parsedObject);
  }

  // Observable to subscribe to for changes
  getSessionObject() {
    return this.sessionObjectSubject.asObservable();
  }

  // Method to update the session storage and notify observers
  updateSessionObject(newObject: any) {
    sessionStorage.setItem(this.storageKey, JSON.stringify(newObject));
    this.checkStorage();
  }
}
