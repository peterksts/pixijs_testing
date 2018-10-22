import {Element, Inject} from '../../decorators/decorators';
import {Metadata} from './test.metadata';
import {PXElement, PXInit} from '../../interfaces/pxui.interfaces';
import {TextureService} from '../../services/texture.service';
import {BranchService} from '../services/branch.service';

@Element(Metadata)
export class TestElement extends PXElement implements PXInit {

  @Inject() private textureService: TextureService;
  @Inject() private branchService: BranchService;

  pxOnInit(): void {

  }

}
