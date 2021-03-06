module.exports = function(app, passport) {

    
    app.get('/', function(req, res) {
        res.render('index'); // load the index.ejs file
    });


   
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login',{ message: req.flash('loginMessage') }); 
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/chat', 
        failureRedirect : '/login', 
        failureFlash : true // allow flash messages
    }));
   
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup', { message: req.flash('signupMessage') });
    });

    // process the signup form
   app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/chat',
        failureRedirect : '/signup', 
        failureFlash : true // allow flash messages
    }));

   
    
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/chat', isLoggedIn, function(req, res) {
        res.render('chat.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });


    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/login');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}