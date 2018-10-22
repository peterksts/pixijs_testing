import Rest from 'ts-rx-rest';
import {Observable} from 'rxjs';

export class HttpClient {

  private client =  new Rest();

  constructor() {
  }

  public get<T>(path: string): Observable<T> {
    return this.client.doGet<T>(path);
  }

  public post<T, R>(path: string, entity: T, onUploadProgress?: (e: ProgressEvent) => any): Observable<R> {
    return this.client.doPost<T, R>(path, entity, onUploadProgress);
  }

  public delete<T>(path: string): Observable<T> {
    return this.client.doDelete(path);
  }

  public put<T, R>(path: string, entity: T): Observable<R> {
    return this.client.doPut<T, R>(path, entity);
  }

  public ajax<T>(url: string, method: string, data?: any, onUploadProgress?: (e: ProgressEvent) => any): Observable<T> {
    return this.client.ajax<T>(url, method, data, onUploadProgress);
  }

  public addInterceptor(interceptor: (o: Observable<any>) => Observable<any>): void {
    this.client.interceptors.push(interceptor);
  }

  public addInterceptorForModule(route: string, interceptor: (o: Observable<any>) => Observable<any>): void {
    const int = (o: Observable<any>) => {
      if (route === document.location.pathname) {
        return interceptor(o);
      }
      return o;
    };
    this.client.interceptors.push(int);
  }

}
