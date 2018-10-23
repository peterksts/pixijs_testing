export function HostSubscription(... subjectPaths: string[]) {
  return function (target: any, propKey: string) {
    if (!Array.isArray(target.__pxSubjects)) {
      target.__pxSubjects = [];
    }
    subjectPaths.forEach(path => {
      target.__pxSubjects.push({path: path, fn: target[propKey]});
    });
    return {};
  }
}
