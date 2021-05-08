import faker from 'faker';
import factory from 'factory-girl';

factory.define(
  'Product',
  {},
  {
    id: () => String(faker.datatype.number()),
    title: faker.name.title,
    image_url: faker.image.imageUrl,
    price: faker.finance.amount,
    quantity: () => faker.datatype.number({ min: 1, max: 3 }),
  },
);

export default factory;
