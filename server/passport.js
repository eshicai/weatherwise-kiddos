const express = require('express');
const knex = require("knex")(require("./knexfile"));
const passport = require('passport');
require('dotenv').config();

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    function (accessToken, refreshToken, profile, done) {
      console.log('Google profile:', profile);
      done(null, profile);
      // knex('users')
      //   .select('id')
      //   .where({ google_id: profile.id })
      //   .then(user => {
      //     if (user.length) {
      //       done(null, user[0]);
      //     } else {
      //       knex('users')
      //         .insert({
      //           google_id: profile.id,
      //           avatar_url: profile.photos[0],
      //           username: profile.displayName
      //         })
      //         .then(userId => {
      //           done(null, { id: userId[0] });
      //           //done(null, profile);
      //         })
      //         .catch(err => {
      //           console.log('Error creating a user', err);
      //         });
      //     }
      //   })
      //   .catch(err => {
      //     console.log('Error fetching a user', err);
      //   });
    }
  )
);

// `serializeUser` determines which data of the auth user object should be stored in the session
// The data comes from `done` function of the strategy
// The result of the method is attached to the session as `req.session.passport.user = 12345`
passport.serializeUser((user, done) => {
  console.log('serializeUser (user object):', user);

  // Store only the user id in session
  done(null, user.id);
  //done(null, user);
});

// `deserializeUser` receives a value sent from `serializeUser` `done` function
// We can then retrieve full user information from our database using the userId

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

passport.deserializeUser((userId, done) => {
  console.log('deserializeUser (user id):', userId);

  // Query user information from the database for currently authenticated user
  knex('users')
    .where({ id: userId })
    .then(user => {
      // Remember that knex will return an array of records, so we need to get a single record from it
      console.log('req.user:', user[0]);

      // The full user object will be attached to request object as `req.user`
      done(null, user[0]);
    })
    .catch(err => {
      console.log('Error finding user', err);
    });
});