import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserDetails } from './models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  saveDetailsUrl: '';
  getDetailsUrl: '';
  constructor(private http: HttpClient) {}

  getDetails(): Observable<UserDetails> {
    return this.http
      .get<UserDetails>(this.getDetailsUrl)
      .pipe(catchError((err) => this.handleError(err)));
  }

  saveDetails(userDetails: UserDetails): Observable<UserDetails> {
    return this.http
      .post<UserDetails>(this.saveDetailsUrl, userDetails)
      .pipe(catchError((err) => this.handleError(err)));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
