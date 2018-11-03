import {CustomWorker, EventData} from '../../../services/your-worker.service';

export class MyFirstWorker implements CustomWorker {

  private iterator = 1;

  constructor() {
  }

  public message(data: EventData): void {
    (<any>postMessage)(data);
  }

  public getIterator = (summer: number, pamer: number): number => {
    return this.buildGood(summer) + pamer + this.iterator;
  }

  public hard = (summer: number): number => {
    let sd = summer;
    for (let i = 1000000000; i >= 0; i--) {
      sd += this.buildGood(i);
    }
    return sd;
  }

  private buildGood(summer: number): number {
    return summer++;
  }

}
