import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StateKey, makeStateKey, TransferState } from '@angular/platform-browser';
import { isPlatformServer } from '@angular/common';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

const url = 'https://jsonplaceholder.typicode.com/users';
@Injectable()
export class UserService {
  private key: StateKey<string> = makeStateKey('users');
  constructor(private http: HttpClient,
    private transferState: TransferState,
  @Inject(PLATFORM_ID) private platformId) { }

  public getUsers() {
    if (!this.transferState.hasKey(this.key)) {
      if (isPlatformServer(this.platformId)) {
        return this.http.get(url).pipe(
          tap(response => {
            this.transferState.set(this.key, response);
          })
        );
      } else {
        return this.http.get(url);
      }
    } else {
      const value = this.transferState.get(this.key, 'error');
      this.transferState.remove(this.key);
      return of(value);
    }
  }

}
