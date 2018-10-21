import {Subject} from 'rxjs';

export class BranchService {

  public branchChange = new Subject<string>();

  constructor() {
  }

}
