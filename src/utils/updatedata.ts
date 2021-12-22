export function deleteone<T extends { _id: string }>(
  itemsArray: Array<T>,
  _id: string
): Array<T> {
  let index: number = -1;
  index = itemsArray.findIndex((singleitem: T) => singleitem._id === _id);
  if (index > -1) {
    itemsArray.splice(index, 1);
  }
  return itemsArray;
}

export function deletmany<T extends { _id: string }>(
  itemsArray: Array<T>,
  _id: string
): Array<T> {
  return itemsArray.filter((singleitem: T) => singleitem._id !== _id);
}

export function updateone<T extends { _id: string }>(
  itemsArray: Array<T>,
  obj: T
): Array<T> {
  let index: number = -1;
  index = itemsArray.findIndex((singleitem: T) => singleitem._id === obj._id);
  if (index > -1) {
    itemsArray[index] = obj;
  }
  return itemsArray;
}

export function createnewitem<T extends { _id: string }>(
  itemsArray: Array<T>,
  obj: T
): Array<T> {
  return [...itemsArray, obj];
}
