/**
 * TimeentreeController
 *
 * @description :: Server-side logic for managing timeentrees
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	/* show views */
	add_row_form:  function(req, res) {
		Customer.findOne(req.param('owner'), function foundCustomer (err, user) {

			if(err) {				
				return next(err);
			}
			if(!customer) {
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
		Timesheet.create(req.params.all(), function addTimesheetRow(err, ts_row) {
			if(err) return next(err);

			res.send('success');
		});
	}

};

