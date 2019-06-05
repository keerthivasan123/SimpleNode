const express = require('express');
const router = express.Router();
const Simple = require('../models/Simple');

// Home Page
router.get('/', (req, res) => res.render('homePage'));

//Login Page
router.get('/login', (req, res) => {
  
    res.render('Login',{
    isAuthenticated: false,
    })
  }
  );

  router.post('/login', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let errors = [];
    Simple.findOne({ email: email })
      .then(simple => {
        if (!simple) {
          errors.push({ msg: 'Email not registered' });
          return res.render('Login', {
            errors,
            email,
            password
          });
        }
        var isMatch = password.localeCompare(simple.password);
        //console.log(isMatch);
        //console.log(user.password);
        if (isMatch==0) {
          req.session.isLoggedIn = true;
          req.session.user = simple;
          return req.session.save(err => {
            
            console.log(err);
            res.redirect('dashboard/');
          });
          
        }
        res.redirect('login/');
        
    });
  });
  


//Register Page
router.get('/register', (req, res) => {
  
  res.render('Register',{
  isAuthenticated: false,
  })
}
);

router.post('/register', (req, res) => {
  console.log(req.body);
const { email, password, password2} = req.body;
let errors = [];

if (!email || !password || !password2) {
  errors.push({ msg: 'Please enter all fields' });
}

if (password != password2) {
  errors.push({ msg: 'Passwords do not match' });
}

if (password.length < 3) {
  errors.push({ msg: 'Password must be at least 6 characters' });
}
console.log(errors.length);
if (errors.length >  0) {
  res.render('Register', {
    errors,
    email,
    password,
    password2
  });
} else {
  Simple.findOne({ email: email }).then(simple => {
      if (simple) {
        errors.push({ msg: 'Email is already existsting' });
        res.render('Register', {
          errors,
          name,
          email,
          password,
          password2,
          school
        });
      } else {
        const newSimple = new Simple({
          email,
          password
        });

            newSimple
              .save()
              .then(simple => {
                req.flash(
                  'success_msg',
                  'Staff Registered Successfully'
                );
                res.redirect('/login');
              })
              .catch(err => console.log(err));


          }
      });
    }
  });

//Dashboard
router.get('/dashboard', (req, res) =>{ 
    if(!req.session.isLoggedIn)
    {
      return res.redirect('/login');
    }
    res.render('dashboard',{
    isAuthenticated: req.session.isLoggedIn,
    email: req.session.user.email
  })
  }
  );

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
  console.log(err);
  res.redirect('login/');
  });
});

module.exports = router;