$(document).ready(function(){

	var ajaxForDB = function(){
	// ajax call & Json parsing
	var dbUrl ='1.json';
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

// Button listeners
$("#addLine").click(function(){
	var newRow = '<tr><td><input type="text" placeholder="Insert here"/></td><td><input type="text" placeholder="Insert here"/></td><td><input type="text" placeholder="Insert here"/></td></tr>';
	$("#timetable").append(newRow);
});

$("#submit").click(function(){
	var finalJson=[];
	$('#timetable > tbody  > tr').each(function(index,el) {
		//console.log(this);
		var name, time, place='';
		$(this).find('td').each (function(index, el) {
			var inputValue = $(el).find('input').val();
			// console.log(index,$(el).find('input').val());
			if (index === 0) {
				name =inputValue;
			}else if (index == 1){
				time = inputValue;
			}else if (index ==2){
				place = inputValue;
			}
		}); 
		var tempObject = {
			"name": name,
			"time": time,
			"place": place	
		};
		finalJson.push(tempObject);
	});
	console.log(finalJson);
});


// Call for action
ajaxForDB();


});
