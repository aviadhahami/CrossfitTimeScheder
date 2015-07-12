$(document).ready(function(){

	// GLOBALS
	var indexToDay ={
		'1' : 'Sunday',
		'2' : 'Monday',
		'3' : 'Tuesday',
		'4' : 'Wednesday',
		'5' : 'Thursday',
		'6' : 'Friday',
		'7' : 'Saturday'
	};

	var dayToIndex = {
		'Sunday' : 1,
		'Monday' : 2,
		'Tuesday': 3,
		'Wednesday' : 4,
		'Thursday' : 5,
		'Friday' :6,
		'Saturday' : 7
	};

	var changesFlag = false;

	// Todo : should get a day variable to inject in url
	var ajaxForDB = function(index){
	// ajax call & Json parsing

	var fileIndex = !!index ? index : '1';
	updateDayTitle(fileIndex);
	var dbUrl = 'SchedDB/'+fileIndex + '.json';
	console.log(dbUrl); 
	$.ajax({
		url: dbUrl,
		dataType: 'json',
		success:function(data,textStatus,request){
			$.each(data,function(i,item){
				var newRow = '<tr><td><input type="text" value="' + data[i].name + '"/></td><td><input type="text" value="' + data[i].time + '"/></td><td><input type="text" value="' + data[i].place + '"/></td></tr>';
				$("#timetable").append(newRow);
				// console.log(data[i].name +' '+ data[i].time + ' '+ data[i].place );
			});
		},
		error:function(res){
			alert('Woops, something went wrong. Please contact Omri');
			console.log(res);
		}
	});
};

// Inject options to the select item
var injectOption = function(){
	var optionElement = $('#daysSelect');

	var appendationString ='';
	for (day in indexToDay) {
		appendationString = '<option>'+ indexToDay[day] +'</option>';
		optionElement.append(appendationString);
	}

	
};


// Todo : implemet this
var validateNoSaveNeeded = function(){
	console.log(changesFlag);
	return !!changesFlag;
};

// Empties the table
var emptyTable= function(){
	$("table > tbody").html("");
};

var updateDayTitle = function(index){
	$("#dateTitle").html(indexToDay[index]);
};
// +-+-+-+-Button listeners -+-+-+-+

// Listens to a change in days selection
$("#daysSelect").on("change",function(){
	var daySelectionString = $(this).val();
	var daySelectionIndex = dayToIndex[daySelectionString];

	// Make sure no changes made without saving
	if (!validateNoSaveNeeded()) {
		emptyTable();
		ajaxForDB(daySelectionIndex);
	};
});


// Adds a row on click
$("#addLine").click(function(){
	var newRow = '<tr><td><input type="text" placeholder="Insert here"/></td><td><input type="text" placeholder="Insert here"/></td><td><input type="text" placeholder="Insert here"/></td></tr>';
	$("#timetable").append(newRow);
});

// Generates an object on submit
$("#submit").click(function(){
	var finalJson=[];
	$('#timetable > tbody  > tr').each(function(index,el) {
		var name, time, place='';
		$(this).find('td').each (function(index, el) {
			var inputValue = $(el).find('input').val();
			if (index === 0) {
				name =inputValue;
			}else if (index == 1){
				time = inputValue;
			}else if (index ==2){
				place = inputValue;
			}
		}); 
		// Make sure values are inserted
		if (!!name && !!time & !!place){
			var tempObject = {
				"name": name,
				"time": time,
				"place": place	
			};

			// Push to main JSON
			finalJson.push(tempObject);
		}
	});
	console.log(finalJson);
});

// Bind change event to all input boxes to know when stuff changed
$(".inputs").on("change",function(){
	console.log('change');
	changesFlag = true;
});



// Call for action
ajaxForDB(1);
injectOption();


});
