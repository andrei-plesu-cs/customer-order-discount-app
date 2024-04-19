// @ts-check

/**
* @typedef {import("../generated/api").RunInput} RunInput
* @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
* @typedef {import("../generated/api").Target} Target
* @typedef {import("../generated/api").ProductVariant} ProductVariant
* @typedef {import("../generated/api").DeliveryOptionTarget} DeliveryOptionTarget
*/

/**
* @type {FunctionRunResult}
*/
const EMPTY_DISCOUNT = {
  discounts: [],
};

/**
* @param {RunInput} input
* @returns {FunctionRunResult}
*/
export function run(input) {
  if (!(input.cart.buyerIdentity?.customer?.metafield?.value === 'Gold')) {
    console.error('Not a gold customer');
    return EMPTY_DISCOUNT;
  }

  if (input.cart.deliveryGroups.length == 0) {
    console.error('Delivery groups empty');
    return EMPTY_DISCOUNT;
  }

  const targets = input.cart.deliveryGroups[0].deliveryOptions.map(m => {
    return /** @type {Target} */ ({
      deliveryOption: {
        handle: m.handle || ''
      }
    })
  })

  return {
    discounts: [
      {
        value: {
          percentage: {
            value: 100,
          },
        },
        targets: targets,
      },
    ],
  };
};