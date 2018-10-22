import {Observable} from 'rxjs';

export interface Interceptor {
  interceptor(o: Observable<any>): Observable<any>;
}
