import {Interceptor} from '../../interfaces/interceptor.interface';
import {Observable} from 'rxjs';
import {Inject} from '../../decorators/decorators';
import {RouterService} from '../../services/router.service';

export class ErrorInterceptor implements Interceptor {

  @Inject() routerService: RouterService;

  constructor() {
  }

  interceptor(o: Observable<any>): Observable<any> {
    return o;
  }

}
