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