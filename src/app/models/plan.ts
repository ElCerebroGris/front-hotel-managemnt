export class Plan {
  id!: string;
  name!: string;
  price!: string;
  sms!: string;
}

export class Recharge {
  status!: string;
  reference!: string;
  plan!: Plan;
  created_at!: string;
  origin!: string;
}
