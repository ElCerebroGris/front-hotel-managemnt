import { Permission } from "./permission";

export class Utilizador {
  id?: string;
  email_or_phone_number?: string;
  username?: string;
  phone_number?: string;
  email?: string;
  available_sms?: string;
  token?: string;
  role?: string;
}

export class User {
  id?: string;
  email?: string;
  createdAt?: string;
  nome?: string;
  telefone!: string;
}
