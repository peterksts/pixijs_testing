import {Metadata} from './test.metadata';
import {TextureService} from '../../../services/texture.service';
import {PXElement} from '../../../wrappers/px-element.wrap';
import {PXInit} from '../../../interfaces/px.interface';
import {Element} from '../../../decorators/element.decorator';
import {Inject} from '../../../decorators/Inject.decorator';

@Element(Metadata)
export class TestElement extends PXElement implements PXInit {

  @Inject() private textureService: TextureService;

  pxOnInit(): void {
  }

}
