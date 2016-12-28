const db = require('../database/config');

module.exports = {
  users: {
    findById(params, callback) {
      const queryStr = 'SELECT email, fullname, createdOn FROM users WHERE id = ?';
      db.query(queryStr, params, (err, results) => {
        if (err) {
          console.log('Error in server/userModel.js findOne : ', err);
        } else {
          callback(results);
        }
      });
    },
    findOne(params, callback) {
      const queryStr = 'SELECT email FROM users WHERE email = ?';
      db.query(queryStr, params, (err, results) => {
        if (err) {
          console.log('Error in server/userModel.js findOne : ', err);
        } else {
          callback(results);
        }
      });
    },

    addOne(params, callback) {
      const queryStr = 'INSERT INTO users (email, password, fullname) VALUES (?, ?, ?)';
      db.query(queryStr, params, (err, results) => {
        if (err) {
          console.log('Error in server/userModel.js addOne : ', err);
        } else {
          callback(results);
        }
      });
    },

    getPassword(params, callback) {
      const queryStr = 'SELECT id, password, fullname FROM users WHERE email = ?';
      db.query(queryStr, params, (err, results) => {
        if (err) {
          console.log('Error in server/userModel.js getPassword : ', err);
        } else {
          callback(results);
        }
      });
    },

    getAll(callback) {
      const queryStr = 'SELECT id, email, fullname FROM users';
      db.query(queryStr, (err, results) => {
        if (err) {
          console.log('Error in server/userModel.js getPassword : ', err);
        } else {
          callback(results);
        }
      });
    },

    getFriends(callback) {
      const queryStr = 'SELECT id, email, fullname FROM users INNER JOIN users_friends ON (users_events.id_user = ? AND users.id = users_friends.id_friend)';
      db.query(queryStr, (err, results) => {
        if (err) {
          console.log('Error in server/userModel.js getPassword : ', err);
        } else {
          callback(results);
        }
      });
    },

    changePassword(params, callback) {
      const queryStr = 'UPDATE users SET password = ? WHERE email = ?';
      db.query(queryStr, params, (err, results) => {
        if (err) {
          console.log('Error in server/userModel.js changePassword : ', err);
        } else {
          callback(results);
        }
      });
    },

    deleteUser(params, callback) {
      const queryStr = 'DELETE FROM users WHERE email = ?';
      const queryStr2 = 'DELETE FROM users_events WHERE id_users = ?';
      db.query(queryStr, params, (err, results) => {
        if (err) {
          console.log('Error in server/userModel.js deleteUser : ', err);
        } else {
          console.log('DELETE USER RESULT AFTER DELETE', results);
          db.query(queryStr2, results.insertId, (err, results) => {
            if (err) {
              console.log('Error in server/userModel.js deleteUser : ', err);
            } else {
              callback(results);
            }
          });
        }
      });
    },

    addFollow(params, callback) {
      const queryStr = 'INSERT into users_friends (id_user, id_friend) VALUES (?, ?)';
      db.query(queryStr, params, (err, results) => {
        if (err) {
          console.log('Error in server/userModel.js addFollow : ', err);
        } else {
          callback(results);
        }
      });
    },

    unfollow(params, callback) {
      const queryStr = 'DELETE FROM users_friends WHERE id_user = ? AND id_friend = ? ';
      db.query(queryStr, params, (err, results) => {
        if (err) {
          console.log('Error in server/userModel.js unfollow : ', err);
        } else {
          callback(results);
        }
      });
    },
  },
};
