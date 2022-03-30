type JWTTokens = { refresh: string; access: string };

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
