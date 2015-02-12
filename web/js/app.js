var curDate;

$(function() {

    $("#datepicker").datepicker({
    	changeMonth: true,
      	changeYear: true, 
      	dateFormat: 'yy-mm-dd',
      	onSelect: function() {
      		curDate = $(this).val();
      		$("#date").html(curDate);
      		getNotes(curDate);
      	}
    });

    $("#date").html(curDate);
    getNotes(curDate);

});

$("#create-note").click(function(){
	var postData = {
		"noteText": $("#note-text").val(),
		"noteDate": curDate
	}
	$.post("/note/create", postData, function(data) {
		getNotes(curDate);
	});
});

function getNotes(date) {
	$("#notes-list").empty();

	var url = "/notes/" + date;

	$.post(url, function(data) {
		console.log(data);
		$.each(JSON.parse(data), function(k,v) {
			var lastNote = $("#notes-list").append("<p class='well'>" + v.noteText + 
							"<a href='javascript:removeNote(" + v.noteID + ")'><span class='pull-right glyphicon glyphicon-remove-circle' aria-hidden='true'></span></a></p>").hide().fadeIn();
		});
	});
}

function removeNote(id) {
	var postData = {"noteId": id};
	$.post("/note/delete", postData, function(data) {
		getNotes(curDate);
	});
}