/**
 * Normalizes the list of objects based on provided key.
 * For eg: itrElems = [{id: 1, title: 'Test'}, {id: 2, title: 'Test2'}] and key = "id"
 * is returned as {1: {id: 1, title: 'Test'}, 2: {id: 2, title: 'Test2'}}
 */
export function normalize<T>(itrElems: T[], key: keyof T) {
  return itrElems.reduce((acc, curr: any) => {
    return {
      ...acc,
      [curr[key]]: curr,
    };
  }, {});
}
