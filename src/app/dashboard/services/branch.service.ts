import {Subject} from 'rxjs';
import {Inject} from '../../decorators/decorators';
import {RouterService} from '../../services/router.service';

export class BranchService {

  @Inject() private routerService: RouterService;

  public branchChange = new Subject<string>();

  constructor() {
  }

}
