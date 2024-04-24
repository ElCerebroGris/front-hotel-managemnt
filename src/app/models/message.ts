export class Message {
  id!: string;
  content!: string;
  from!: string;

  cost!: string;
  recipients_delivered!: number;
  recipients_pending!: number;
  recipients_refused!: number;
  total_recipients!: number;
  schedule!: string;

  to!: string;
  status!: string;
  created_at!: string;
}

export class Recipient {
  phone_number!: string;
  message_status!: string;
  message_id!: string;
}
