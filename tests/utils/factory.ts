import { faker } from '@faker-js/faker';
import factory from 'factory-girl';

factory.define(
  'Product',
  {},
  {
    id: () => String(faker.number.int()),
    title: faker.commerce.productName,
    image_url: faker.image.url,
    price: () => Number(faker.finance.amount()),
    quantity: () => faker.number.int({ min: 2, max: 10 }),
  },
);

export { factory };
