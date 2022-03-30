import { cloneDeep } from "lodash";

type BaseType = {
  _id: string | null;
};

export default class BaseModel {
  _id: string;

  constructor(
    data: Partial<BaseType> = {
      _id: null,
    }
  ) {
    this._id = data._id || "";
  }

  get valid() {
    return !!this._id;
  }

  clone() {
    return cloneDeep(this);
  }

  toObject() {
    const obj = {};
    const clone = this.clone();
    for (const property in clone) {
      // eslint-disable-line no-restricted-syntax
      if (property.indexOf("_") === -1) {
        // Hide snakecased and private properties
        // @ts-ignore
        obj[property] = clone[property];
      }
    }
    return obj;
  }

  fromCamelObject(obj: Record<string, unknown>) {
    Object.assign(this, obj);
  }
}
