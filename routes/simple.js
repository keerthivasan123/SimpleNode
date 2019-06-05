const express = require('express');
const router = express.Router();

// Home Page
router.get('/', (req, res) => res.render('homePage'));

//Login Page
router.get('/login', (req, res) => {
  
    res.render('Login',{
    isAuthenticated: false,
    })
  }
  );


//Register Page

//Dashboard
//dashboard
router.get('/dashboard', (req, res) =>{ 
    if(!req.session.isLoggedIn)
    {
      return res.redirect('login/');
    }
    res.render('student/dashboard',{
    isAuthenticated: req.session.isLoggedIn,
    name : req.param.rollnumber
  })
  }
  );

module.exports = router;