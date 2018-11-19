exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('smoothies').del()
    .then(function() {
      return Promise.all([
        // Inserts seed entries
        knex.into('smoothies').insert({
          // id: 1,
          description: 'Berry, Berry Good',
          price_cents: 998,
          picture_url: 'https://s3.ca-central-1.amazonaws.com/rad-lighthouselabs/blueberry-small.png',
          default_time: '300000'
        }),
        knex.into('smoothies').insert({
          // id: 2,
          description: 'Cash Money Mix',
          price_cents: 898,
          picture_url: 'https://s3.ca-central-1.amazonaws.com/rad-lighthouselabs/green-small.png',
          default_time: '300000'
        }),
        knex.into('smoothies').insert({
          // id: 3,
          description: 'Pink Flamingo',
          price_cents: 798,
          picture_url: 'https://s3.ca-central-1.amazonaws.com/rad-lighthouselabs/strawberry-small.png',
          default_time: '300000'
        }),
        knex.into('smoothies').insert({
          // id: 3,
          description: 'MerMajik',
          price_cents: 1349,
          picture_url: 'https://s3.ca-central-1.amazonaws.com/rad-lighthouselabs/blue.png',
          default_time: '300000'
        }),
        knex.into('smoothies').insert({
          // id: 3,
          description: 'CoCoNutty',
          price_cents: 949,
          picture_url: 'https://s3.ca-central-1.amazonaws.com/rad-lighthouselabs/yellow.png',
          default_time: '300000'
        }),
        knex.into('smoothies').insert({
          // id: 3,
          description: 'RAD Rainbow',
          price_cents: 2531,
          picture_url: 'https://s3.ca-central-1.amazonaws.com/rad-lighthouselabs/rainbow.png',
          default_time: '300000'
        })

        
      ]);
    });
};
