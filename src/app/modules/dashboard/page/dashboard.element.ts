import {TextureService} from '../../../services/texture.service';
import {HttpClient} from '../../../services/http-client.service';
import {Metadata} from './dashboard.metadata';
import {SoundService} from '../../../services/sound.service';
import {PXElement} from '../../../wrappers/px-element.wrap';
import {PXInit} from '../../../interfaces/px.interface';
import {Element} from '../../../decorators/element.decorator';
import {Inject} from '../../../decorators/Inject.decorator';
import {buildMyFirstWorker, MyFirstWorker} from './my-first.worker';

@Element(Metadata)
export class DashboardElement extends PXElement implements PXInit {

  @Inject() private textureService: TextureService;
  @Inject() private soundService: SoundService;
  @Inject() private http: HttpClient;
  private myWorker = buildMyFirstWorker();

  pxOnInit(): void {
    this.dataInit();
  }

  private async dataInit() {
    // const lpc = new Subject();
    // const lpc2 = new BehaviorSubject({});
    // lpc.asObservable().subscribe();
    // importScripts()

    this.myWorker.chan.asObservable().subscribe(d => console.log('main thread chan =>>', d));


    // const str = await this.myWorker.hard(10);
    // const num = await this.myWorker.getIterator(10, 1);
    // console.log(
    //   `good str: ${str}\n` +
    //   `good num: ${num}`
    // );
  }

}
