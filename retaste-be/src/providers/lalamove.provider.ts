import SDKClient from '@lalamove/lalamove-js';

const sdkClient = new SDKClient.ClientModule(
  new SDKClient.Config('public_key', 'secret_key', 'sandbox')
);

const co = {
  lat: '22.3353139',
  lng: '114.1758402'
};

const co2 = {
  lat: '22.3203648',
  lng: '114.169773'
};

const stop1 = {
  coordinates: co,
  address: 'Wu Kai Sha Road'
};

const stop2 = {
  coordinates: co2,
  address: 'Wu Kai Sha Road'
};

const quotationPayload = SDKClient.QuotationPayloadBuilder.quotationPayload()
  .withLanguage('en_HK')
  .withServiceType('COURIER')
  .withStops([stop1, stop2])
  .build();
