import _ from "lodash";
import moment from "moment";

import BaseModel from "./base";

export const makeDate = (date: string | Date, extra = 0): Date => {
  let newDate = new Date();
  if (typeof date === "string") {
    const momentDate = moment.utc(date, "YYYY-MM-DD");
    momentDate.add(extra, "d");
    newDate = momentDate.toDate();
  } else if (date instanceof Date) {
    newDate = date;
  }
  return newDate;
};

export const defaultString = (value: string | null | undefined): string =>
  value ? value.toString() : "";

export const defaultNumber = (
  value: string | number | null | undefined
): number => {
  if (value !== null && value !== undefined) {
    const num = parseInt(value.toString(), 10);
    if (_.isFinite(num)) {
      return num;
    }
  }
  return 0;
};

export const defaultFloat = (value: string | number | null | undefined) => {
  if (value !== null && value !== undefined) {
    const num = parseFloat(value.toString());
    if (_.isFinite(num)) {
      return num;
    }
  }
  return 0;
};

export const defaultBoolean = (value: boolean | null | undefined): boolean =>
  !!value;

export const defaultArray = (
  value: Array<unknown> | null | undefined
): Array<any> => {
  let list: Array<any> = [];
  if (Array.isArray(value)) {
    list = value;
  } else if (value) {
    list = [value];
  }
  return list;
};

export function defaultEnum<EnumType, EnumObject>(
  value: EnumType,
  enumObj: EnumObject
): EnumType | "" {
  return Object.values(enumObj).indexOf(value) > -1 &&
    value !== null &&
    value !== undefined
    ? value
    : "";
}

export const defaultObject = (value: any): Record<string, unknown> | any => {
  if (_.isPlainObject(value) || value instanceof BaseModel) {
    return value;
  }
  return {};
};

export const defaultJSON = (json: any): any => {
  let parsedJSON = {};
  if (typeof json === "object") {
    parsedJSON = json;
  } else if (typeof json === "string") {
    try {
      parsedJSON = JSON.parse(json);
    } catch (e) {
      console.warn(e, "could not parse json");
    }
  }
  return parsedJSON;
};
