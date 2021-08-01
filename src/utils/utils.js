import _ from 'lodash';

const parseSoftwarePlatform = (platform) => {
  switch (platform) {
    case 'windows':
      return 'Windows';
    case 'linux':
      return 'Linux';
    case 'macos':
      return 'MacOS';
    default:
      throw new Error(`Invalid Platform: ${platform}`);
  }
};

const availablePricing = new Set([
  'free',
  'paid subscription based',
  'paid subscription based with free option',
  'paid subscription based with free trial',
  'paid one time',
  'paid one time with free option',
  'paid one time with free trial',
  'paid tiered pricing',
  'paid tiered pricing with free option',
  'paid tiered pricing with free trial',
]);

const parseSoftwarePricing = (pricing) => {
  if (availablePricing.has(pricing)) {
    return _.startCase(pricing);
  }
  throw new Error(`Invalid Pricing: ${pricing}`);
};

export { parseSoftwarePlatform, availablePricing, parseSoftwarePricing };
