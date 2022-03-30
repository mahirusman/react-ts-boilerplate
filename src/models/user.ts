import { JWTTokens } from "@/types";

import BaseModel from "./base";
import {
  defaultArray,
  defaultBoolean,
  defaultEnum,
  defaultJSON,
  defaultObject,
  defaultString,
} from "./defaults";

export type SignedUpViaType = "apple" | "google" | "facebook" | "email";

export type UserDataType = {
  id?: string;
  app_data?: any;
  email?: string;
  first_name?: string;
  last_name?: string;
  token?: JWTTokens;
  accepted_tos?: boolean;
  phone?: string;
  verified?: boolean;
  subscribed?: boolean;
  habits?: Array<string>;
  deleted_habits?: Array<string>;
  problem_flow?: boolean;
  commitment_flow?: boolean;
  container_preview?: boolean;
  signed_up_via?: SignedUpViaType;
  accolades?: boolean;
  local_timezone?: string;
};

type AppDataType = {};

export default class User extends BaseModel {
  app_data: Partial<AppDataType>;

  email: string;

  first_name: string;

  last_name: string;

  phone: string;

  token: JWTTokens | undefined;

  accepted_tos: boolean;

  verified: boolean;

  subscribed: boolean;

  habits: Array<string>;

  deleted_habits: Array<string>;

  problem_flow: boolean;

  commitment_flow: boolean;

  container_preview: boolean;

  signed_up_via: SignedUpViaType;

  accolades: boolean;

  local_timezone: string;

  constructor(
    data: UserDataType = {
      id: undefined,
      app_data: {},
      email: undefined,
      first_name: undefined,
      last_name: undefined,
      token: undefined,
      accepted_tos: undefined,
      phone: undefined,
      verified: undefined,
      subscribed: undefined,
      habits: undefined,
      deleted_habits: undefined,
      problem_flow: undefined,
      commitment_flow: undefined,
      container_preview: undefined,
      signed_up_via: undefined,
      accolades: undefined,
      local_timezone: undefined,
    }
  ) {
    super(data);
    this.app_data = defaultJSON(data.app_data);
    this.email = defaultString(data.email);
    this.first_name = defaultString(data.first_name);
    this.last_name = defaultString(data.last_name);
    this.phone = defaultString(data.phone);
    this.token = data.token;
    this.accepted_tos = defaultBoolean(data.accepted_tos);
    this.verified = defaultBoolean(data.verified);
    this.subscribed = defaultBoolean(data.subscribed);
    this.habits = defaultArray(data.habits);
    this.deleted_habits = defaultArray(data.deleted_habits);
    this.problem_flow = defaultBoolean(data.problem_flow);
    this.commitment_flow = defaultBoolean(data.commitment_flow);
    this.container_preview = defaultBoolean(data.container_preview);
    this.signed_up_via =
      defaultEnum(data.signed_up_via, [
        "apple",
        "google",
        "facebook",
        "email",
      ]) || "email";
    this.accolades = defaultBoolean(data.accolades);
    this.local_timezone = defaultString(data.local_timezone);
  }

  toJSON(): UpdateUserPayload {
    return {
      id: this._id,
      app_data: this.appData,
      email: this.email,
      first_name: this.firstName,
      last_name: this.lastName,
      phone: this.phone,
      accepted_tos: this.acceptedTOS,
    };
  }

  // Keep user in auth stack until hey finish onboarding
  get valid(): boolean {
    return !!this._id && !!this.firstName;
  }

  get localTimezone(): string {
    return this.local_timezone;
  }

  get fullName(): string {
    return this.firstName + " " + this.lastName;
  }

  set appData(appData: Partial<AppDataType>) {
    this.app_data = { ...this.app_data, ...appData };
  }

  get appData(): Partial<AppDataType> {
    return this.app_data;
  }

  get firstName(): string {
    return this.first_name;
  }

  get lastName(): string {
    return this.last_name;
  }

  get hasProblemFlow(): boolean {
    return this.problem_flow;
  }

  get hasCommitmentFlow(): boolean {
    return this.commitment_flow;
  }

  get hasContainerPreview(): boolean {
    return this.container_preview;
  }

  get acceptedTOS(): boolean {
    return this.accepted_tos;
  }

  get signedUpVia(): SignedUpViaType {
    return this.signed_up_via;
  }

  get hasAccolades(): boolean {
    return this.accolades;
  }

  get deletedHabits(): Array<string> {
    return this.deleted_habits.map(String);
  }

  getNeedsPhoneVerification(): boolean {
    // Specifies if we need to confirm the phone number for the user
    return !this.verified && this.signedUpVia !== "apple";
  }
}
