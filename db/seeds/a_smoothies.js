exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('smoothies').del()
    .then(function() {
      return Promise.all([
        // Inserts seed entries
        knex.into('smoothies').insert({
          // id: 1,
          description: 'Mixed Berry',
          price_cents: 998,
          picture_url: 'https://images.unsplash.com/photo-1534409707960-668dbea5c35f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8f6c33f19565164ed8d45b37b62820d7&auto=format&fit=crop&w=668&q=80',
          default_time: '300000'
        }),
        knex.into('smoothies').insert({
          // id: 2,
          description: 'Mango Tango',
          price_cents: 898,
          picture_url: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1e121bd81d48a279e258379cfd3f0473&auto=format&fit=crop&w=664&q=80',
          default_time: '300000'
        }),
        knex.into('smoothies').insert({
          // id: 3,
          description: 'Kiwi',
          price_cents: 898,
          picture_url: 'https://images.unsplash.com/photo-1536744196730-d26e89f976a5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d82b12481ad28fc135a7015091a1718d&auto=format&fit=crop&w=716&q=80',
          default_time: '300000'
        }),
        knex.into('smoothies').insert({
          // id: 4,
          description: 'Bluberry Banana',
          price_cents: 898,
          picture_url: 'http://init4thelongrun.com/wp-content/uploads/2015/05/Blueberry-Banana-Power-Smoothie5-683x1024.jpg',
          default_time: '300000'
        }),
        knex.into('smoothies').insert({
          id: 5,
          description: 'Avocado',
          price_cents: 998,
          picture_url: 'https://i1.wp.com/www.emilieeats.com/wp-content/uploads/2015/12/Banana_Mango_Avocado_Green_Smoothie_3_edit.jpg?w=680&ssl=1',
          default_time: '300000'
        }),
        knex.into('smoothies').insert({
          // id: 6,
          description: 'Banana Oatmeal',
          price_cents: 798,
          picture_url: 'http://www.eatyourselfskinny.com/wp-content/uploads/2018/03/banana-oat-smoothie-7.jpg',
          default_time: '300000'
        }),
        knex.into('smoothies').insert({
          // id: 7,
          description: 'Chocolate',
          price_cents: 898,
          picture_url: 'https://www.hummusapien.com/wp-content/uploads/2015/02/IMG_1625a2.jpg',
          default_time: '300000'
        }),
        knex.into('smoothies').insert({
          // id: 8,
          description: 'Pumpkin Spice',
          price_cents: 1098,
          picture_url: 'https://apumpkinandaprincess.com/wp-content/uploads/2015/10/Pumpkin-Spice-Smoothie.jpg',
          default_time: '300000'
        }),
      ]);
    });
};
