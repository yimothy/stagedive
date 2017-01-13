const knex = require('../database/schema.knex.js');

module.exports = {
  users: {
    findById(params, callback) {
      console.log('findById params:: ', params)

      return knex('users').where({id:  params.id})
        .select('id', 'email', 'fullname', 'createdOn', 'profile_photo')
        .then((res) => {
          return res;
        })
    },
    findOne(params) {
      console.log('findOne params:: ', params)

      return knex('users').where({email: params.email})
        .select('email')
        .then((res) => {
          return res;
        })
    },
    findUser(params) {
      console.log('findUser params:: ', params)

      return knex('users').where({fullname: params.fullname})
        .select('id', 'email', 'fullname')
        .then((res) => {
          return res;
        })

    },
    addOne(params) {
      console.log('addOne params:: ', params)

      return knex('users').insert({email: 'params.email', password: 'params.password', fullname: 'params.fullname', profile_photo: 'params.profile_photo'})
        .then((res) => {
          return res;
        })
    },
    getPassword(params) {
      console.log('getPassword params:: ', params)

      return knex('users').where({email: 'params.email'})
        .select('id', 'password', 'fullname')
        .then((res) => {
          return res;
        })
    },
    getAll(params) {
      console.log('getAll params:: ', params)

      return knex.select('id', 'email', 'fullname').from('users')
        .then((res) => {
          return res;
        });
    },
    getFriends(params) {
      console.log('getFriends params:: ', params)

      return knex('users').join('users_friends').where({users_friends.id_user: '?', users.id: users_friends.id_friends}).select('users.id', 'users.email', 'users.fullname', 'users.profile_photo', 'users_friends.createdOn')
        .then((res) => {
          return res;
        })
      const queryStr = 'SELECT users.id, users.email, users.fullname, users.profile_photo, users_friends.createdOn FROM users INNER JOIN users_friends ON (users_friends.id_user = ? AND users.id = users_friends.id_friend)';
    },

    changePassword(params, callback) {
      console.log('changePassword params:: ', params);

      return knex('users').where('email', params.email}).update('password', params.password)
        .then((res) => {
          return res;
        })
    },
    addFollow(params) {
      console.log('addUser params:: ', params);
      return knex('users_friends').where({id_user: params.id_user, id_friend: params.id_friend})
        .then((res) => {
          return knex('users_friends').insert({id_user: params.id_user, id_friend: params.id_friend})
        })
    },
    unfollow(params) {
      console.log('unfollow params:: ', params);
      return knex('users_friends').where({id_user: params.id_user, id_friend: params.id_friend})
        .del()
        .then((res) => {
          console.log(res);
        })
    },

    // deleteUser(params, callback) {
    //   addArtist(userId, params) {
    //   return knex('artists').where({ mbid: params.mbid })
    //   .then((res) => {
    //     if (res.length !== 0) {
    //       return knex('users_artists').insert({ id_users: userId, id_artists: res[0].id });
    //     } else {
    //       return knex('artists').insert({
    //         mbid: params.mbid,
    //         name: params.name,
    //         image: params.image,
    //         events: params.events,
    //         facebook: params.facebook,
    //         onTourUntil: params.onTourUntil,
    //         upcoming_events: params.upcoming_events,
    //       })
    //       .select('id')
    //       .then((artistAddRes) => {
    //         console.log('artist add in knex model: ', artistAddRes);
    //         return knex('users_artists').insert({ id_users: userId, id_artists: artistAddRes[0] });
    //       })
    //     }
    //   })
    //   return knex('users').where({email: params})
    //     .then()
    //   const queryStr = 'DELETE FROM users WHERE email = ?';
    //   const queryStr2 = 'DELETE FROM users_events WHERE id_users = ?';
    //   db.query(queryStr, params, (err, results) => {
    //     if (err) {
    //       console.log('Error in server/userModel.js deleteUser : ', err);
    //     } else {
    //       console.log('DELETE USER RESULT AFTER DELETE', results);
    //       db.query(queryStr2, results.insertId, (err, results) => {
    //         if (err) {
    //           console.log('Error in server/userModel.js deleteUser : ', err);
    //         } else {
    //           callback(results);
    //         }
    //       });
    //     }
    //   });
    // },
};
