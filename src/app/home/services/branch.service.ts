import {Subject} from 'rxjs';

export class BranchService {

  public branchChange = new Subject<string>();

  constructor() {
    setTimeout(() => {
      this.branchChange.next('kuku');
    }, 1000);
  }

}
