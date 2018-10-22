export interface RouterGuard {
  routerGuard(oldPath: string, newPath: string): Promise<boolean> | boolean;
}
