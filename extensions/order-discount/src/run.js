// @ts-check
import {DiscountApplicationStrategy} from '../generated/api';

/**
* @typedef {import("../generated/api").RunInput} RunInput
* @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
* @typedef {import("../generated/api").Target} Target
* @typedef {import("../generated/api").ProductVariant} ProductVariant
*/

/**
* @type {FunctionRunResult}
*/
const EMPTY_DISCOUNT = {
  discountApplicationStrategy: DiscountApplicationStrategy.First,
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

  return {
    discounts: [
      {
        value: {
          percentage: {
            value: 10,
          },
        },
        targets: [
          {
            orderSubtotal: {
              excludedVariantIds: [],
            },
          }
        ],
      },
    ],
    discountApplicationStrategy: DiscountApplicationStrategy.First,
  };
};
