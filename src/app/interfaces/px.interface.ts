export interface PXInterfaceComponent extends PXInit, PXUpdate, PXDestroy {
  pxOnHide(): void;
  pxOnShow(): void;
}

export interface PXDestroy {
  pxOnDestroy(): void; // TODO: added delete event
}

export interface PXInit {
  pxOnInit(): void;
}

export interface PXUpdate {
  pxOnUpdate(): void;
}
