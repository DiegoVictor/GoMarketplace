import faker from 'faker';
import factory from 'factory-girl';

factory.define(
  'Product',
  {},
  {
    id: () => String(faker.datatype.number()),
    title: faker.name.title,
    image_url: faker.image.imageUrl,
    price: () => Number(faker.finance.amount()),
    quantity: () => faker.datatype.number({ min: 2, max: 10 }),
  },
);

export default factory;
