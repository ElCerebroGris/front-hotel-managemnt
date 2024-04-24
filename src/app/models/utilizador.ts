import { Permission } from "./permission";

export class Utilizador {
  uuid?: string;
  email_or_phone_number?: string;
  username?: string;
  phone_number?: string;
  api_token?: string;
  available_sms?: string;
  token?: string;
  role?: string;
}

export class User {
  id?: string;
  username?: string;
  phone_number?: string;
  created_at?: string;
  available_sms?: string;
  postpaid?: string;
  postpaid_date?: string;
  role?: string;
}
