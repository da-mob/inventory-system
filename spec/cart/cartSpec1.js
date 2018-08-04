const Cart1 = require('../../models/cart1');
const Product = require('../../models/product');

let cart1;
let product;

describe('Cart test suite', () => {

  beforeEach(() => {
    cart1 = new Cart1({});
  });

  it('should return empty array', () => {
    expect(cart1.generateArray()).toEqual([]);
  });
  
});
