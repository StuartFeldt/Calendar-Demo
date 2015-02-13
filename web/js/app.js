var curDate;
var noteDates = [];

$(function() {

	// start by fetching all available note dates
	fetchNoteDates(function(){

		// set noteDates outside cur scope
		$("#datepicker").datepicker({
	    	changeMonth: true,
	      	changeYear: true, 
	      	dateFormat: 'yy-mm-dd',
	      	onSelect: function() {

	      		// get what day is selected, set in dom
	      		curDate = $(this).val();
	      		$("#date").html(curDate);

	      		// get notes for that day, we don't care about a callback
	      		getNotes(curDate);
	      	},
	      	beforeShowDay: function (date) {

	      		// get date we are rendering
				var day = date.getFullYear()+ '-' + ("0" + (date.getMonth() + 1)).slice(-2) +'-'+ ("0" + date.getDate()).slice(-2);

				// init the args we need return for selectable & class
				var showDayArgs = [true, ""];

				$.each(noteDates, function(k,v){
					if (v.noteDate == day) {
						showDayArgs[1] = "highlight-date";
						return false;
					}
				});
				return showDayArgs;
			}
    	});

		// get what day it is, get notes for today
    	curDate = $('#datepicker').datepicker({"dateFormat": "yy-mm-dd"}).val();
	    $("#date").html(curDate);
	    getNotes(curDate);

	});

	// set char countdown box
    $('#note-text').on("input", function(){
    	var charLeft = 140 - $('#note-text').val().length;
		$('#count').text(charLeft + " characters left");
    });
});

// create note
$("#create-note").click(function(){

	// set data to be posted
	var postData = {
		"noteText": $("#note-text").val(),
		"noteDate": curDate
	}

	// post to create endpoint
	$.post("/note/create", postData, function(data) {

		// reset text box & char counter
		$('#note-text').val("");
		$('#count').text("140 characters left");

		// reset notes for selected day
		getNotes(curDate);

		// reset date picker with today highlighted if not already
		fetchNoteDates(function(){
			$("#datepicker").datepicker("refresh");
		});
	});
});

// get notes
function getNotes(date) {

	// clear the notes list
	$("#notes-list").empty();

	// get notes for today
	var url = "/notes/" + date;
	$.post(url, function(data) {

		// add html to notes list for each note we found
		$.each(JSON.parse(data), function(k,v) {
			$("#notes-list").append("<p class='well'>" + v.noteText + 
				"<a href='javascript:removeNote(" + v.noteID + 
				")'><span class='pull-right glyphicon glyphicon glyphicon-trash delete-icon' aria-hidden='true'></span></a></p>").hide().fadeIn();
		});
	});
}

// delete note
function removeNote(id) {

	// post note id to delete endpoint
	var postData = {"noteId": id};
	$.post("/note/delete", postData, function(data) {

		// reset notes list
		getNotes(curDate);

		// reset date picker with today unhighlighted
		fetchNoteDates(function(){
			$("#datepicker").datepicker("refresh");
		});
	});
}

// fetch note dates
function fetchNoteDates(callback) {
	$.post("/notes/dates", function(dates){
		noteDates = JSON.parse(dates);
		callback();
	});
}