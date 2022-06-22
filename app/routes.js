module.exports = function(app, passport, db, multer, ObjectId) {


  let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/audio/uploads')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
    }
  });
  let upload = multer({storage: storage}); 

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
        db.collection('character').find({ postedBy: req.user.local.email }).toArray((err, result) => {
          if (err) return console.log(err)
          console.log('result ', result)
          res.render('profile.ejs', {
            user : req.user,
            characters: result
          })
        })
    });

    app.get('/profile/:character/:definition/:pinyin', isLoggedIn, function(req, res) {
      console.log('parms', req.params)
      db.collection('character').find({ postedBy: req.user.local.email }).toArray((err, result) => {
        if (err) return console.log(err)
        console.log('result ', result)
        res.render('newCharacterProfile.ejs', {
          user : req.user,
          characters: result,
          params: req.params
        })
      })
  });
    
    //PRACTICE PAGE ================================================
    app.get('/practice', function(req, res) {
      res.render('practice.ejs');
  });

  //Study Mode Page ==============
  app.get('/studyMode', isLoggedIn, function(req, res) {
    db.collection('character').find({ postedBy: req.user.local.email }).toArray((err, result) => {
      let random = shuffleArray(result)
      console.log('random one',random)
      if (err) return console.log(err)
      console.log('result ', result)
      res.render('studyMode.ejs', {
        user : req.user,
        characters: random,
      
      })
    })
});

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

// post routes ===============================================================
//Instead of message board - this will be where the User can keep a library of Chinese Charcters
    app.post('/addChar', isLoggedIn, upload.single('file-to-upload'), (req, res) => {
      // console.log(req)
      // console.log(req.body)
      console.log('doggiedog  ', req.file.filename ) 
      // let user = req.user._id
      db.collection('character').insertOne({character: req.body.character, definition: req.body.definition, pinyin: req.body.pinyin, thumbUp: 0, favorited:false, audio: 'audio/uploads/' + req.file.filename, postedBy: req.user.local.email}, (err, result) => {
        console.log('hellloo ', result.ops[0])
        if (err) return console.log(err)
        // res.render('profile.ejs', {
        //   characters: result.ops[0], 
        //   user: req.user
        // })
        console.log('saved to database')
        res.redirect('/profile')
      })
    })

    app.put('/characters', (req, res) => {
      db.collection('character')
      .findOneAndUpdate({character: req.body.character, definition: req.body.definition,pinyin: req.body.pinyin}, {
        $set: {
          thumbUp:req.body.likes + 1
        }
      }, {
        sort: {_id: -1},
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
    })
    app.put('/favorites', (req, res) => {
      // console.log(req.body)
      db.collection('character')
      .findOneAndUpdate({character: req.body.character, definition: req.body.definition,pinyin: req.body.pinyin}, {
        $set: {
          favorited: true
        }
      }, {
        sort: {_id: -1},
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
    })
    app.delete('/characters', (req, res) => {
      db.collection('character').findOneAndDelete({character: req.body.character, definition: req.body.definition,pinyin: req.body.pinyin}, (err, result) => {
        if (err) return res.send(500, err)
        res.send('Character deleted!')
      })
    })

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash characters
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash characters
        }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        let user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
return array
}