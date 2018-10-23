export function pushTarget(object, property, el) {
  if (property) {
    if (/\[]$/.test(property)) {
      const prop = property.slice(0, property.length - 2);
      if (Array.isArray(object[prop])) {
        object[prop].push(el);
      } else {
        object[prop] = [el];
      }
    } else {
      object[property] = el;
    }
  }
}
