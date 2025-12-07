import axios from 'axios';
import CryptoJS from 'crypto-js';
const REGION = 'VN';
const LANGUAGE = 'vi_VN';

export interface Stop {
  stopId?: string;
  coordinates: {
    lat: string;
    lng: string;
  };
  address: string;
}
export interface PriceBreakdown {
  base?: string;
  extraMileage?: string;
  surcharge?: string;
  coupon?: string;
  specialRequests?: string;
  priorityFee?: string;
  priorityFeeVat?: string;
  specialVehicle?: string;
  minimumSurcharge?: string;
  discountCap?: string;
  insurance?: string;
  multiStopSurcharge?: string;
  surchargeDiscount?: string;
  vat?: string;
  customerSupportDiscretionary?: string;
  totalBeforeOptimization?: string;
  totalExcludePriorityFee?: string;
  total: string;
  currency: string;
}
export interface Quotation {
  quotationId: string;
  scheduleAt: Date;
  serviceType: string;
  specialRequests: string[];
  expiresAt: Date;
  priceBreakdown: PriceBreakdown;
  isRouteOptimized: boolean;
  stops: Stop[];
}
export interface StopWithContact extends Stop {
  name: string;
  phone: string;
  POD?: object;
}

export interface Order {
  orderId: string;
  quotationId: string;
  priceBreakdown: PriceBreakdown;
  driverId: string;
  shareLink: string;
  status: string;
  distance: {
    value: string;
    unit: string;
  };
  stops: StopWithContact[];
  metadata: object;
}

import env from '~/configs/environments';
const lalaMoveApiUrl = env.LALAMOVE_BASE_URL;
axios.defaults.baseURL = lalaMoveApiUrl;

const PATH_QUOTATION = '/v3/quotations';
const PATH_ORDER = '/v3/orders';

const SECRET = env.LALAMOVE_API_SECRET;
const API_KEY = env.LALAMOVE_API_KEY;
const createSignature = (body: string, path: string) => {
  const time = new Date().getTime().toString();
  const method = 'POST';
  const rawSignature = `${time}\r\n${method}\r\n${path}\r\n\r\n${body}`;
  return {
    time,
    signature: CryptoJS.HmacSHA256(rawSignature, SECRET).toString()
  };
};
const quotationDetail = async (stop1: Stop, stop2: Stop) => {
  const body = JSON.stringify({
    data: {
      serviceType: 'MOTORCYCLE',
      specialRequests: [],
      language: LANGUAGE,
      stops: [stop1, stop2]
    }
  });
  const { signature, time } = createSignature(body, PATH_QUOTATION);
  const response = await axios.post<{ data: Quotation }>(PATH_QUOTATION, body, {
    headers: {
      'Content-type': 'application/json; charset=utf-8',
      Authorization: `hmac ${API_KEY}:${time}:${signature}`,
      Accept: 'application/json',
      Market: REGION
    }
  });
  return response.data.data;
};
const createOrder = async (
  quotation: {
    quotationId: string;
    scheduleAt: Date;
    serviceType: string;
    specialRequests: string[];
    expiresAt: Date;
    priceBreakdown: PriceBreakdown;
    isRouteOptimized: boolean;
    stops: Stop[];
  },
  sender: {
    name: string;
    phone: string;
  },
  recipient: {
    name: string;
    phone: string;
  },
  orderId: string
) => {
  const body = JSON.stringify({
    data: {
      quotationId: quotation.quotationId,
      sender: {
        stopId: quotation.stops[0].stopId,
        name: sender.name,
        phone: sender.phone
      },
      recipients: [
        {
          stopId: quotation.stops[1].stopId,
          name: recipient.name,
          phone: recipient.phone
        }
      ],
      isPODEnabled: true,
      partner: 'Lalamove Partner 1',
      metadata: {
        restaurantOrderId: orderId,
        restaurantName: 'Retaste'
      }
    }
  });
  const { signature, time } = createSignature(body, PATH_ORDER);
  const response = await axios.post<{ data: Order }>(PATH_ORDER, body, {
    headers: {
      'Content-type': 'application/json; charset=utf-8',
      Authorization: `hmac ${API_KEY}:${time}:${signature}`,
      Accept: 'application/json',
      Market: REGION
    }
  });
  return response.data.data;
};
const cancelOrder = async (orderId: string) => {
  const { signature, time } = createSignature('', PATH_ORDER);
  const response = await axios.delete<{ data: Order }>(`${PATH_ORDER}/${orderId}`, {
    headers: {
      'Content-type': 'application/json; charset=utf-8',
      Authorization: `hmac ${API_KEY}:${time}:${signature}`,
      Accept: 'application/json',
      Market: REGION
    }
  });
  return response.data;
};
export const lalaMoveProvider = {
  quotationDetail,
  createOrder,
  cancelOrder
};
