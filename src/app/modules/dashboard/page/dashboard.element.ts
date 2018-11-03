import {TextureService} from '../../../services/texture.service';
import {HttpClient} from '../../../services/http-client.service';
import {Metadata} from './dashboard.metadata';
import {SoundService} from '../../../services/sound.service';
import {PXElement} from '../../../wrappers/px-element.wrap';
import {PXInit} from '../../../interfaces/px.interface';
import {Element} from '../../../decorators/element.decorator';
import {Inject} from '../../../decorators/Inject.decorator';
import {YourWorkerService} from '../../../services/your-worker.service';
import {MyFirstWorker} from './my-first.worker';

@Element(Metadata)
export class DashboardElement extends PXElement implements PXInit {

  @Inject() private textureService: TextureService;
  @Inject() private soundService: SoundService;
  @Inject() private http: HttpClient;
  @Inject() private yourWorker: YourWorkerService;

  pxOnInit(): void {
    this.dataInit();
  }

  private async dataInit() {
    setTimeout(() => {
      const worker1 = this.yourWorker.createWorker(MyFirstWorker);
      const worker2 = this.yourWorker.createWorker(MyFirstWorker);
      const worker3 = this.yourWorker.createWorker(MyFirstWorker);
      const def = new MyFirstWorker();
      let t = new Date().getTime();
      console.log('start promise');

      Promise.all([
      worker1.hard(11).then(d => console.log('1 p', d)),
      worker2.hard(10).then(d => console.log('2 p', d)),
      worker3.hard(12).then(d => console.log('3 p', d)),
      ]).then(() => {
        console.log('end p time: ', new Date().getTime() - t);

        t = new Date().getTime();
        console.log('start no promise');
        console.log('1', def.hard(11));
        console.log('2', def.hard(10));
        console.log('3', def.hard(12));
        console.log('time: ', new Date().getTime() - t);
      });
    }, 5000);
  }

}
