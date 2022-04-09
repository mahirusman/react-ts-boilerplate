type JWTTokens = { refresh: string; access: string };

interface StandardAction<P = any> {
  type: string;
  payload: P;
}

type Dispatch = (action: StandardAction) => any;

type UpdateUserPayload = {
  app_data?: any;
  email?: string;
  first_name?: string;
  last_name?: string;
  photo?: string;
  phone?: string;
  accepted_tos?: boolean;
  id: string;
};

interface ApiPayloadType<PayloadDataType> {
  url: string;
  data: PayloadDataType;
  preSendActionCreator?: (a: any) => StandardAction;
  successActionCreator?: (a: any) => StandardAction;
  errorActionCreator?: (a: any) => StandardAction;
  nextAction?: (a: any) => StandardAction;
  pollCount?: number;
  meta?: Record<string, unknown>;
}

//here is all api payloads

type LoginPayload = {
  email: string;
  password: string;
};

type FilePayload = {
  name: string;
  type: string;
  component_uploader?: boolean;
};
