import {EventTypes} from '../types/event-types.type';

export function HostListener(... typeEvents: EventTypes[]) {
  return function (target: any, propKey: string) {
    if (!Array.isArray(target.__pxEvents)) {
      target.__pxEvents = [];
    }
    typeEvents.forEach(type => {
      target.__pxEvents.push({event: type, fn: target[propKey]});
    });
    return {};
  }
}
