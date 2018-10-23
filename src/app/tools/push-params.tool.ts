export function pushParams(outgoing, incoming, params) {
  params = params || {};
  for (const incomingField in incoming.__pxParamsMap) {
    if (params[incomingField]) {
      let outgoingField = params[incomingField];
      if (outgoingField.includes && testType('[]', outgoingField)) { // '[prop]'
        setDependentParam(outgoingField, incomingField, outgoing, incoming);
      } else if (outgoingField.includes && testType('()', outgoingField)) { // '(prop)' || '(prop())'
        outgoingField = outgoingField.slice(1, outgoingField.length - 1);
        incoming[incoming.__pxParamsMap[incomingField]].addListener(null, outgoing, outgoingField);
      } else { // other
        incoming[incoming.__pxParamsMap[incomingField]] = outgoingField;
      }
    }
  }
}

function setDependentParam(outgoingField: string, incomingField: string, outgoing: any, incoming: any) {
  outgoingField = outgoingField.slice(1, outgoingField.length - 1);
  if (!Array.isArray(outgoing['__pxParam' + outgoingField + '__targets'])) {
    outgoing['__pxParam' + outgoingField + '__targets'] = [];
  }
  const targets = outgoing['__pxParam' + outgoingField + '__targets'];
  targets.push({field: incomingField, incomingObj: incoming});

  Object.defineProperty(outgoing, outgoingField, {
    set: function(v) {
      outgoing['__pxParam' + outgoingField] = v;
      targets.forEach( ({field, incomingObj}) => {
        if (incomingObj[incomingObj.__pxParamsMap[field]] !== v) {
          incomingObj[incomingObj.__pxParamsMap[field]] = v;
        }
      });
    },
    get: function() {
      return outgoing['__pxParam' + outgoingField];
    },
  });
}

function testType(type: string, param: string): boolean {
  if (type === '[]') {
    return param.slice(0, 1) === '[' && param.slice(param.length - 1, param.length) === ']';
  }
  if (type === '()') {
    return param.slice(0, 1) === '(' && param.slice(param.length - 1, param.length) === ')';
  }
}
