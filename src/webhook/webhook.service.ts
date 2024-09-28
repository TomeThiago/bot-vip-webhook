import { Injectable } from '@nestjs/common';
import { MercadoPagoConfig, Payment } from 'mercadopago';

import { MercadoPagoRequest } from './dto/mercado-pago-request.dto';

@Injectable()
export class WebhookService {
  private mercadoPagoPayment: Payment;

  constructor() {
    const mercadoPagoConfig = new MercadoPagoConfig({
      accessToken: process.env.ACCESS_TOKEN_MP,
    });

    this.mercadoPagoPayment = new Payment(mercadoPagoConfig);
  }

  async execute(payload: MercadoPagoRequest) {
    console.log(payload);

    if (payload?.data?.id) {
      const paymentId = payload.data.id;

      try {
        const payment = await this.mercadoPagoPayment.get({
          id: paymentId,
        });

        console.log(payment);

        if (payment.status === 'approved') {
          console.log('Pago');
        } else {
          console.log('Pendente: ', payment.status);
        }
      } catch (error) {
        console.error('Erro ao obter detalhes do pagamento:', error);
      }
    }
  }
}
