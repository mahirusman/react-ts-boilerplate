import { JWTTokens } from "@/types";

import BaseModel from "./base";
import { defaultBoolean, defaultString } from "./defaults";

export type UserDataType = {
  id?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  token?: JWTTokens;
  phone?: string;
  verified?: boolean;
  subscribed?: boolean;
};

export default class User extends BaseModel {
  email: string;

  first_name: string;

  last_name: string;

  phone: string;

  token: JWTTokens | undefined;

  verified: boolean;

  subscribed: boolean;

  constructor(
    data: UserDataType = {
      id: undefined,
      email: undefined,
      first_name: undefined,
      last_name: undefined,
      token: undefined,
      phone: undefined,
      verified: undefined,
      subscribed: undefined,
    }
  ) {
    super(data);
    this.email = defaultString(data.email);
    this.first_name = defaultString(data.first_name);
    this.last_name = defaultString(data.last_name);
    this.phone = defaultString(data.phone);
    this.token = data.token;
    this.verified = defaultBoolean(data.verified);
    this.subscribed = defaultBoolean(data.subscribed);
  }

  // Keep user in auth stack until hey finish onboarding
  get valid(): boolean {
    return !!this._id && !!this.firstName;
  }

  get fullName(): string {
    return this.firstName + " " + this.lastName;
  }

  get firstName(): string {
    return this.first_name;
  }

  get lastName(): string {
    return this.last_name;
  }
}
