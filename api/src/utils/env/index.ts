export const isProductionEnv =
  process.env.NODE_ENV === 'production' || process.env.ABT_NODE_SERVICE_ENV === 'production';
