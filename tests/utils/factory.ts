import { faker } from '@faker-js/faker';
import factory from 'factory-girl';

factory.define(
  'Product',
  {},
  {
    id: () => String(faker.datatype.number()),
    title: faker.commerce.productName,
    image_url: faker.image.imageUrl,
    price: () => Number(faker.finance.amount()),
    quantity: () => faker.datatype.number({ min: 2, max: 10 }),
  },
);

export { factory };
