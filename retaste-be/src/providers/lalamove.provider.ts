// eslint-disable-next-line @typescript-eslint/no-require-imports
const SDKClient = require('@lalamove/lalamove-js');
import env from '~/configs/environments';
import { Stop } from '@lalamove/lalamove-js/dist/models/stop';
import { IQuotation } from '@lalamove/lalamove-js';
const REGION = 'VN';
const LANGUAGE = 'vi_VN';

export const sdkClient = new SDKClient.ClientModule(
  new SDKClient.Config(env.LALAMOVE_API_KEY, env.LALAMOVE_API_SECRET, 'sandbox')
);

const quotationDetail = async (stop1: Stop, stop2: Stop) => {
  const payload = SDKClient.QuotationPayloadBuilder.quotationPayload()
    .withLanguage(LANGUAGE)
    .withServiceType('MOTORCYCLE')
    .withStops([stop1, stop2])
    .build();
  return await sdkClient.Quotation.create(REGION, payload);
};

const createOrder = async (quotation: IQuotation) => {
  const orderPayload = SDKClient.OrderPayloadBuilder.orderPayload()
    .withIsPODEnabled(true)
    .withQuotationID(quotation.id)
    .withSender({
      stopId: quotation.stops[0].id,
      name: 'Michal',
      phone: '+84912345678'
    })
    .withRecipients([
      {
        stopId: quotation.stops[1].id,
        name: 'Rustam',
        phone: '+84987654321'
      }
    ])
    .withMetadata({
      restaurantOrderId: '1234',
      restaurantName: "Rustam's Kebab"
    })
    .build();
  return await sdkClient.Order.create(REGION, orderPayload);
};
export const lalaMoveProvider = {
  quotationDetail,
  createOrder
};
