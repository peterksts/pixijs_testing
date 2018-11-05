import {CustomWorker, EventData, TWorkerTools} from '../../../services/your-web-worker';
declare let WorkerTools: TWorkerTools;
declare let EnvironmentVariable: {[key: string]: any};

export class MyFirstWorker implements CustomWorker {

  private iterator = 1;

  constructor() {
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
  private parallelWorker = EnvironmentVariable.up_1 && WorkerTools.createWorker(
    class ParallelWorker implements CustomWorker {

      message = async (data: EventData) => {
      }

      get = async (summer: number): Promise<string> => {
        return this.parallelWorker.get(summer * 2);
      }

      // Parallel 1 : 2 Workers
      /////////////////////////
      private parallelWorker = EnvironmentVariable.up_2 && WorkerTools.createWorker(
        class ParallelWorker implements CustomWorker {

          message = async (data: EventData) => {
          }

          get = async (summer: number): Promise<string> => {
            return `ParallelWorker 2: ${summer * 4}`;
          }

      });

  }, {'up_2': true});

}
