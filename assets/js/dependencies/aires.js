jQuery(document).ready(function($) { 

	$(document).on('click', "#addTsRow", function(){
		var viewUrl = 'raw?view=timesheet/add_row_form';
		$("#modalBox .formMsgCont").empty();

		$('#modalBox .modal-body').load(viewUrl, "", function() {
            $("#modalBox .modal-header h3").text("Add a new timesheet entry");
            $("#modalBox #mdhandler").text("addNewTimesheetRow");
            $("#modalBox .modal-footer").removeClass("success");
            $("#modalBox #submitModal").show();
            $("#modalBox").modal();
        })
	});
	$(document).on('click', "#submitTimesheet", function(){
		var tsRowIds = '';
		$(".tsRow").each(function( index ) {
			tsRowIds = tsRowIds.concat($(this).data('tsid')) + ','; 
		});
		if(tsRowIds == '') {
			alert('You do not have any time entry to submit');
		}
		tsRowIds = tsRowIds.replace(/,$/,"");
		var submitTsUrl = 'http://localhost:1337/timesheet/submitTimesheet?rowid='+tsRowIds;

		$.ajax({
			type: "PUT",
			url: submitTsUrl,
            complete : function (response, statusText, xhr, $form) {
                if(response.responseText == 'success'){
                	alert("Success");
                    return true;
                }
                else {
                    alert("Error");
                    return false;
                }
            }
		});

	});
	

	$("#modalBox").on('click', "#submitModal", function(){
		if($("#modalBox #mdhandler").text() == 'addNewTimesheetRow') {
			$('form#adTsRow').ajaxSubmit({
	            url: 'http://localhost:1337/'+$('form#adTsRow').attr("action"),
	            error: function(xhr, textStatus, errorThrown) {
	                $(".formMsgCont").html("<div class='alert alert-danger'>Error creating folder</div>");
	                return false;
	            },
	            complete : function (response, statusText, xhr, $form) {
	                if(response.responseText == 'success'){
                        $(".formMsgCont").html("<div class='alert alert-success'>Timesheet entry has been added</div>");
                        $("#modalBox .modal-body").empty();
                        $("#modalBox #submitModal").hide();
                        $("#modalBox .modal-footer").addClass("success");
                        return true;
	                }
	                else {
	                    $(".formMsgCont").html("<div class='alert alert-danger'>Error creating folder</div>");
	                    return false;
	                }
	            }
	        });
		}
	});



		
});