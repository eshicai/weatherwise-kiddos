const express = require('express');
const router = express.Router();

const passport = require('passport');

require('dotenv').config();

// Create a login endpoint which kickstarts the auth process
router.get('/google', passport.authenticate('google', {scope:['profile']}));

router.get('/login/success', (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: 'successful',
      user: req.user,
      //cookies: req.cookies
    });
  }
});

router.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'failure'
  });
});


// Create a logout endpoint
router.get('/logout', (req, res) => {
  // Passport adds the logout method to request, will end user session
  req.logout((error) => {
    // This callback is called after logout
    if (error) {
        return res.status(500).json({message: "Server error. Please try again later",error: error});
    }
    // Redirect the user back to client-side application
    res.redirect(process.env.CORS_ORIGIN);
  });
});

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${process.env.CORS_ORIGIN}/login/failed`,
  }),
  (_req, res) => {
    // Successful authentication, redirect to client-side application
    res.redirect(process.env.CORS_ORIGIN);
  }
);

module.exports = router;