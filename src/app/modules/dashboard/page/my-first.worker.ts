import {CustomWorker, EventData, TWorkerTools} from '../../../services/your-web-worker';
import {BehaviorSubject, Subject} from 'rxjs';
declare let WorkerTools: TWorkerTools;
declare let EnvironmentVariable: {[key: string]: any};

export class MyFirstWorker implements CustomWorker {

  private iterator = 1;
  public chan = new BehaviorSubject<any>({});

  constructor() {
    if (window) { return; } // in web-worker no variable 'window'

    this.parallelWorker.chan_2.asObservable().subscribe(d => this.chan.next('p2 =>' + d));
    this.parallelWorker.chan_2.next(78);
    this.chan.next(12);
  }

  getIterator = async (summer: number, pamer: number): Promise<number> => {
    return this.buildGood(summer) + pamer + this.iterator;
  }

  hard = async (summer: number): Promise<string> => {
    return this.parallelWorker.get(summer * 2);
  }

  message = async (data: EventData) => {
  }

  private buildGood(summer: number): number {
    return summer++;
  }

  // Parallel 1 Workers
  /////////////////////
  private parallelWorker = EnvironmentVariable.__up__ === 1 && WorkerTools.createWorker(
    class ParallelWorker implements CustomWorker {

      public chan_2 = new BehaviorSubject<any>({});

      constructor() {
        if (EnvironmentVariable.__up__ !== 2) { return; }

        this.chan_2.next('haha)))');
        this.parallelWorker.chan_2.asObservable().subscribe(d => {
          console.log('cheack of p2 =>>', d);
        });
        this.parallelWorker.chan_2.next('good');
      }

      message = async (data: EventData) => {
      }

      get = async (summer: number): Promise<string> => {
        return this.parallelWorker.get(summer * 2);
      }

      // Parallel 1 : 2 Workers
      /////////////////////////
      private parallelWorker = EnvironmentVariable.__up__ === 2 && WorkerTools.createWorker(
        class ParallelWorker implements CustomWorker {

          constructor() {
            if (EnvironmentVariable.__up__ !== 3) { return; }

            this.chan_2.asObservable().subscribe(d => {
              console.log('cheack of p3 =>>', d);
            });
            this.chan_2.next('kuku of p3');
          }

          public chan_2 = new BehaviorSubject<any>({});

          message = async (data: EventData) => {
          }

          get = async (summer: number): Promise<string> => {
            return `ParallelWorker 2: ${summer * 4}`;
          }

      });

  });

}
