/**
 * TimeentreeController
 *
 * @description :: Server-side logic for managing timeentrees
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	/* show views */
	add_row_form:  function(req, res) {
		User.findOne(req.param('user'), function foundUser (err, user) {
			if(err) {				
				return next(err);
			}
			if(!user) {
				return next();
			}

			res.view({
				user: user
			})
		});
	},
	load_user_timesheet_table:  function(req, res) {
		Timesheet.findOne(req.param('id')).populateAll().exec( function(err, timesheet) {
			if(err) return next(err);
			if(!timesheet) return next();

			res.view({
				timesheet: timesheet
			});
		});
	},


	/* actions manager */
	addRow: function(req, res, next) {
		var timesheetObj = {
			title: req.param('title'),		
			type: req.param('type'),
			hours: req.param('hours'),
			amount: req.param('amount'),
			description: req.param('description'),
			user: req.user.id
		};

		Timesheet.create(timesheetObj, function addTimesheetRow(err, ts_row) {
			if(err) return next(err);

			res.send('success');
		});
	},
	submitTimesheet: function(req, res, next) {
		var hasError = 0;
		var rowIdArray = req.query.rowid.split(",").map(function (val) { 
			Timesheet.update({id: val}, {ts_status: "submitted"}).exec( function(err, timesheet) {
				if(err){
					console.log(err);
					hasError += 1;
				}

				console.log("done" + timesheet);
			});
		});

		if(hasError > 0) {
			return res.send("failed");
		}
		else {
			return res.send("success");
		}
	}

};

