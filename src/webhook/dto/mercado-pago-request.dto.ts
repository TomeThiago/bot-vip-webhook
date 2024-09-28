export interface MercadoPagoRequest {
  id: number;
  action: string;
  api_version: string;
  data: {
    id: string | number;
  };
  date_created: Date;
  live_mode: boolean;
  type: string;
  user_id: string | number;
  resource: string;
  topic: string;
}
