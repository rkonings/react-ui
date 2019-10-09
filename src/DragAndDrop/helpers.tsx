import { Data, ItemTypes } from './GroupExample';
import { GroupData } from './SortableGroup';
import { ItemData } from './SortableItem';

export const pathIsEqual = (fromPath: number[], toPath: number[]) => {

  // Check if the arrays are the same length
  if (fromPath.length !== toPath.length) { return false; }

  // Check if all items exist and are in the same order
  for (let i = 0; i < fromPath.length; i++) {
    if (fromPath[i] !== toPath[i]) { return false; }
  }

  // Otherwise, return true
  return true;

};

export type path = number[];

export const isChildOf = (parent: path, child: path) => {

    return parent.every((p, i) => {
        return p === child[i];
    });
};

export const canMoveToPath = (fromPath: number[], toPath: number[]) => {

    if (fromPath.length === toPath.length) {
        return true;
    }

    return !fromPath.every((p, i) => {
        return p === toPath[i];
    });
};

export const pathIsGreaterThan = (a: number[], b: number[] ) => {

  return a.some((entry, index) => {
      if (typeof b[index] === 'undefined' || entry > b[index]) {
        return true;
      } else {
        return false;
      }
    });

};

export const findParentByPath = (data: Data, path: number[]): GroupData => {
    const p = [...path];
    p.pop();
    if (p.length === 0 ) {
        return {
            items: data,
            type: ItemTypes.GROUP,
            id: '0'
        };
    }

    const result = p.reduce<GroupData>( (group, index) => {

        if (group.items[index].type === ItemTypes.ITEM) {
            return group;
        } else {
            return group.items[index] as GroupData;
        }

      }, {
        items: data,
        type: ItemTypes.GROUP,
        id: '0'
    }  );

    return result;
};

export const findGroupByPath = (data: Data, path: number[]): GroupData => {
    if (path.length <= 1 ) {
        return {
            items: data,
            type: ItemTypes.GROUP,
            id: '0'
        };
    }

    const result = [...path].reduce<GroupData | null>( (group, p) => {
        if (group === null) {
            if (data[p] && 'items' in data[p]) {
                return data[p] as GroupData;
            } else {
                return {
                        items: data,
                        type: ItemTypes.GROUP,
                        id: '0'
                    } as GroupData;
            }
        } else {
          if (group.items[p] && 'items' in group.items[p]) {
              return group.items[p] as GroupData;
          } else {
              return group as GroupData;
          }
        }

      }, null  );

      if (!result) {
        return {
            items: data,
            type: ItemTypes.GROUP,
            id: '0'
        };
    }

    return result;

};

export const findItemsByPath = (data: Data, path: number[]): Data | null => {
    if (path.length === 0) {
        return null;
    }
    if (path.length === 1 && data[path[0]].type === ItemTypes.ITEM) {
        return data;
    }

    const result = [...path].reduce<Data | GroupData | null>( (items, p) => {
        if (items === null) {
          return data[p];

        } else {
          if (items[p] && 'items' in items[p]) {
              return items[p].items;
          } else {
              return items;
          }
        }

        return null;

      }, null  );

      if (!result) {
          return null;
      }
      if ('items' in result) {
          return result.items;
      }

      return result;
};

export const findByPath = (data: Data, path: number[]) => {

    return [...path].reduce<ItemData|GroupData| null>( (item, p) => {
      if (item === null) {
        return data[p];

      } else {
        if ('items' in item) {
            return item.items[p];
        }
      }

      return null;

    }, null  );
  };

  /* console.log(findByPath(data, [2,2])); */

  export const findItemByPath = (data: Data, path: number[]) => {

    return path.reduce<ItemData|GroupData | null>( (items, p) => {
        if (path.length === 1) {
          return data[p];
      }

      if (items === null) {
        const item = data[p];
        return item;

      } else {
          if ('items' in items) {
            return items.items[p];
          }

          return items;
      }

    }, null );
  };

  /* console.log(findItemByPath(data, [0])); */
  /* console.log(findItemByPath(data, [2])); */
  /* console.log(findItemByPath(data, [2,1])); */
  /* console.log(findItemByPath(data, [2,2])); */

export const findById = (data: Data, id: string) => {
  let result = null;

  data.some( (item) => {

    if (item.id === id) {
      result = item;
      return true;
    } else if (item && 'items' in item) {
      result = findById(item.items, id);
    }

    return false;

  } );

  return result;

};

  export const findParentById = (data: Data | GroupData, id: string,
deepSearch: boolean = false): GroupData | null => {
    let result = null;

    if (!deepSearch && Array.isArray(data)) {
        result = data.some( (item) => {
            return item.id === id;
        } );

        if (result) {
            return {
                type: ItemTypes.GROUP,
                id: '0',
                items: data
            };
        } else {
            result = findParentById(data, id, true);
        }
    } else if (deepSearch) {
        if (Array.isArray(data)) {
            data.some( (item) => {

                if (item.id === id) {
                    result = data;
                    return true;
                } else {
                    if (item && 'items' in item) {
                        result = findParentById(item, id, true);
                        if (result) {
                            return true;
                        }
                    }
                }

                return false;
            } );

        } else if ('items' in data) {
            data.items.some( (item) => {

                if (item.id === id) {
                    result = data;
                    return true;
                } else {
                    if (item && 'items' in item) {
                        result = findParentById(item, id, true);
                        if (result) {
                            return true;
                        }
                    }
                }

                return false;
            } );

        }

    }

    return result;
  };

  export const arrayMoveMutate = (array: Data, from: number, to: number) => {
      array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
  };

    export type DESTINATION = 'BEFORE' | 'AFTER' | 'IN';

    export const reorderItems = (data: Data, dragId: string, destinationId: string, destination: DESTINATION) => {

        const dragParent = findParentById(data, dragId);
        const destinationParent = findParentById(data, destinationId);

        if (!dragParent || !destinationParent) {
            return false;
        }

        const dragIndex = dragParent.items.findIndex((item) => item.id === dragId);
        const dragItem = dragParent.items[dragIndex];

        /* return false when destination is a child of dragItem */
        if ('items' in dragItem && findById(dragItem.items, destinationId)) {
            return false;
        }

        const destinationIndex = destinationParent.items.findIndex((item) => item.id === destinationId);
        const destinationItem = destinationParent.items[destinationIndex];

        if (dragParent.id === destinationParent.id && destination !== 'IN') {

            if (destination === 'AFTER' && destinationIndex + 1 === dragIndex) {
                return false;
            }
            if (destination === 'BEFORE' && dragIndex + 1 === destinationIndex) {
                return false;
            }

            arrayMoveMutate(destinationParent.items, dragIndex, destinationIndex);
            return data;
        } else {
            if (destination === 'BEFORE') {
                destinationParent.items.splice(destinationIndex, 0, dragItem);
                dragParent.items.splice(dragIndex, 1);
            } else if (destination === 'AFTER') {
                if (destinationIndex < destinationParent.items.length) {
                    destinationParent.items.splice(destinationIndex + 1, 0, dragItem);
                } else {
                    destinationParent.items.push(dragItem);
                }
                dragParent.items.splice(dragIndex, 1);
            } else if (destination === 'IN' && 'items' in destinationItem) {
                destinationItem.items.push(dragItem);
                dragParent.items.splice(dragIndex, 1);
            }

            return data;

        }

  };

  export const moveItemByPath = (data: Data, dragPath: path, destinationPath: path, destination: DESTINATION) => {
    if (dragPath.length === 0 || destinationPath.length === 0) {
        return false;
    }

    const dragParent = findParentByPath(data, dragPath);
    const destinationParent = findParentByPath(data, destinationPath);

    if (!dragParent || !destinationParent) {
        return false;
    }

    const dragIndex = dragPath[dragPath.length - 1];
    const dragItem = dragParent.items[dragIndex];

    let destinationIndex = destinationPath[destinationPath.length - 1];
    const destinationItem = destinationParent.items[destinationIndex];

    if (dragParent.id === destinationParent.id && destination !== 'IN') {

        if (destination === 'AFTER' && destinationIndex + 1 === dragIndex) {
            return false;
        }
        if (destination === 'BEFORE' && dragIndex + 1 === destinationIndex) {
            return false;
        }

        if (destination === 'BEFORE' && destinationIndex > 0) {
            destinationIndex = destinationIndex - 1;
        }

        arrayMoveMutate(destinationParent.items, dragIndex, destinationIndex);
        return data;
    } else {
        if (destination === 'BEFORE') {
            destinationParent.items.splice(destinationIndex, 0, dragItem);
            dragParent.items.splice(dragIndex, 1);
        } else if (destination === 'AFTER') {
            if (destinationIndex < destinationParent.items.length) {
                destinationParent.items.splice(destinationIndex + 1, 0, dragItem);
            } else {
                destinationParent.items.push(dragItem);
            }
            dragParent.items.splice(dragIndex, 1);
        } else if (destination === 'IN' && 'items' in destinationItem) {
            destinationItem.items.push(dragItem);
            dragParent.items.splice(dragIndex, 1);
        }

        return data;

    }

};

  export const _moveItemByPath = (data: Data, fromPath: number[], toPath: number[], before: boolean = false) => {
      const fromGroup = findGroupByPath(data, fromPath);

      const fromIndex = fromPath[fromPath.length - 1];
      const itemToMove = fromGroup.items[fromIndex];

      const toGroup = findGroupByPath(data, toPath);
      let toIndex = toPath[toPath.length - 1];
      if (before) {
        toIndex = toIndex - 1 < 0 ? 0 : toIndex - 1;
      }

      if (fromGroup && fromGroup.id === toGroup.id) {
        arrayMoveMutate(fromGroup.items, fromIndex, toIndex);

    } else {
        toGroup.items.splice(toIndex, 0, itemToMove);
        fromGroup.items.splice(fromIndex, 1);
    }

    return data;

  };
