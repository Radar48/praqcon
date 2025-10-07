/*const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/signup', async (req, res) => {
    const {email, phone, password } = req.body;
    try {
        const user = new User({ email, phone, password});
        await user.save();
        res.redirect('/login.html');

    } catch (err) {
        console.error('Signup error:', err.message);
        console.log('Signup attempt:', req.body);
        
        res.send(`
            <h2>Signup failed</h2>
            <p>${err.message}</p>
            <a href="/signup.html">Try again</a>
        `);
}
        //res.send('Signup failed');
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log('Login request received:', req.body);

    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found');
      return res.send('User not found');
    }

    console.log('User found:', user);

    const isMatch = await user.comparePassword(password);
    console.log('Password match:', isMatch);

    if (!isMatch) {
      console.log('Incorrect password');
      return res.send('Incorrect password');
    }

    res.redirect('/dashboard.html');
  } catch (err) {
    console.error('Login error:', err);
    res.send('Login Failed');
  }
});

/*router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.send('User not found');

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.send('Incorrect password');

        res.redirect('/dashboard.html');

    } catch (err) {
        console.error('Login error:', err);
        console.error('Signup error:', err);
        res.send('Login Failed');
    }
});

module.exports = router;*/