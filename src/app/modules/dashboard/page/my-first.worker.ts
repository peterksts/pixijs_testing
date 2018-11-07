import {CustomWorker, EventData, TWorkerTools, yourWebWorker} from '../../../services/your-web-worker';
import {BehaviorSubject} from 'rxjs';
import {MySecondWorker} from './my-second.worker';

declare let WorkerTools: TWorkerTools;
declare let EnvironmentVariable: {[key: string]: any};
declare let WorkerDependencies: {[key: string]: new () => any};

export class MyFirstWorker implements CustomWorker {

  private iterator = 1;
  private mySecondWorker: MySecondWorker =
    EnvironmentVariable.__up__ === 1 && WorkerTools.createWorker(WorkerDependencies.MySecondWorker);
  public chan = new BehaviorSubject<any>({});

  constructor() {
    if (EnvironmentVariable.__up__ !== 1) { return; } // in web-worker no variable 'window'

    this.mySecondWorker.chan.asObservable().subscribe(d => console.log(d));
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

export function buildMyFirstWorker(environmentVariable?: {[key: string]: any}) {
  return yourWebWorker.createWorker(MyFirstWorker, environmentVariable,
    [MySecondWorker]);
}
