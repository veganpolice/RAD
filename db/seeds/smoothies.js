exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('smoothies').del()
    .then(function() {
      return Promise.all([
        // Inserts seed entries
        knex('smoothies').insert({
          description: 'Carrot Top',
          price_cents: 898,
          picture_url: 'https://s3.ca-central-1.amazonaws.com/rad-lighthouselabs/Carrot Top.png',
          default_time: '300000'
        }),
        knex('smoothies').insert({
          description: 'Cloudy Apple',
          price_cents: 898,
          picture_url: 'https://s3.ca-central-1.amazonaws.com/rad-lighthouselabs/Cloudy Apple.png',
          default_time: '300000'
        }),
        knex('smoothies').insert({
          description: 'Extreme C',
          price_cents: 898,
          picture_url: 'https://s3.ca-central-1.amazonaws.com/rad-lighthouselabs/Extreme C.png',
          default_time: '300000'
        }),
        knex('smoothies').insert({
          description: 'Go Fusion',
          price_cents: 898,
          picture_url: 'https://s3.ca-central-1.amazonaws.com/rad-lighthouselabs/Go Fusion.png',
          default_time: '300000'
        }),
        knex('smoothies').insert({
          description: 'Green Power',
          price_cents: 898,
          picture_url: 'https://s3.ca-central-1.amazonaws.com/rad-lighthouselabs/Green Power.png',
          default_time: '300000'
        }),
        knex('smoothies').insert({
          description: 'Karmarama',
          price_cents: 898,
          picture_url: 'https://s3.ca-central-1.amazonaws.com/rad-lighthouselabs/Karmarama.png',
          default_time: '300000'
        }),
        knex('smoothies').insert({
          description: 'Radical Action',
          price_cents: 898,
          picture_url: 'https://s3.ca-central-1.amazonaws.com/rad-lighthouselabs/Radical Action.png',
          default_time: '300000'
        }),
        knex('smoothies').insert({
          description: 'Straight Oj',
          price_cents: 898,
          picture_url: 'https://s3.ca-central-1.amazonaws.com/rad-lighthouselabs/Straight Oj.png',
          default_time: '300000'
        }),
      ]);
    });
};
