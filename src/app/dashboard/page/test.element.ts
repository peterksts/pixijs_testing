import {Element, Inject} from '../../decorators/decorators';
import {Metadata} from './test.metadata';
import {PXElement, PXInit} from '../../interfaces/pxui.interfaces';
import {LoaderService} from '../../services/loader.service';
import {BranchService} from '../services/branch.service';

@Element(Metadata)
export class TestElement extends PXElement implements PXInit {

  @Inject() private loaderService: LoaderService;
  @Inject() private branchService: BranchService;

  pxOnInit(): void {

  }

}
