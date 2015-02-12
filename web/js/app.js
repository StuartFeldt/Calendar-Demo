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

    curDate = $('#datepicker').datepicker({"dateFormat": "yy-mm-dd"}).val();
    $("#date").html(curDate);
    getNotes(curDate);

    $('#note-text').on("input", function(){
    	var charLeft = 140 - $('#note-text').val().length;
		$('#count').text(charLeft);
    });
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
		$.each(JSON.parse(data), function(k,v) {
			var lastNote = $("#notes-list").append("<p class='well'>" + v.noteText + 
							"<a href='javascript:removeNote(" + v.noteID + ")'><span class='pull-right glyphicon glyphicon glyphicon-trash delete-icon' aria-hidden='true'></span></a></p>").hide().fadeIn();
		});
	});
}

function removeNote(id) {
	var postData = {"noteId": id};
	$.post("/note/delete", postData, function(data) {
		getNotes(curDate);
	});
}