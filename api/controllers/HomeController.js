/**
 * HomeController
 *
 */

module.exports = {
	homepage:  function(req, res) {
		if (req.isAuthenticated()) {
			
			User.findOne(req.user.id).populateAll().exec( function(err, user) {
				if(err) return next(err);
				if(!user) return next();

				res.view('home/dashboard', {
					curUser: user
				});
			});
	    }
	    else{
	        res.redirect('/login');
	    }	
	}
};
