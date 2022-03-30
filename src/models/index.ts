import { isArray } from "lodash";

import User from "./user";

export { User };

const ModelClasses = {
  User,
};
// @ts-ignore
export const ModelResponseTypes: {
  [key: keyof typeof ModelClasses]: keyof typeof ModelClasses;
} = Object.keys(ModelClasses).reduce((acc, curr) => {
  // @ts-ignore
  acc[curr] = curr;
  return acc;
}, {});

export function modelMapper(
  object: Record<string, unknown>,
  modelResponseType: keyof typeof ModelResponseTypes
) {
  const ModelClass = ModelClasses[modelResponseType];
  if (ModelClass) {
    // @ts-ignore
    const { data, meta } = object;
    if (isArray(data)) {
      // @ts-ignore
      const hydrated =
        data.length > 0 ? data.map((item) => new ModelClass(item)) : [];
      return {
        data: hydrated,
        meta: meta || null,
      };
    }
    return {
      // @ts-ignore
      data: new ModelClass(data || object),
      meta: null,
    };
  }
  // eslint-disable-next-line
  console.warn("Response was read without a valid Response Type", object);
  return object;
}
