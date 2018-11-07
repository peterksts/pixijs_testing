import {CustomWorker, EventData, TWorkerTools} from '../../../services/your-web-worker';
import {BehaviorSubject, Subject} from 'rxjs';
declare let WorkerTools: TWorkerTools;
declare let EnvironmentVariable: {[key: string]: any};

export class MySecondWorker implements CustomWorker {

  private iterator = 1;
  public chan = new Subject<any>();

  constructor() {
    if (EnvironmentVariable.__up__ !== 2) { return; } // in web-worker no variable 'window'

    this.chan.next(1);
  }

  getIterator = async (summer: number, pamer: number): Promise<number> => {
    return this.buildGood(summer) + pamer + this.iterator;
  }

  hard = async (summer: number): Promise<string> => {
    return 'this.parallelWorker.get(summer * 2)';
  }

  message = async (data: EventData) => {
  }

  private buildGood(summer: number): number {
    return summer++;
  }

}
