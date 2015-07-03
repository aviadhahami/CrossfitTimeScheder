$(document).ready(function () {

	// Make sure the poll is there (actualy check for correct page)
	if ($("#poll").length > 0) {

		var d = new Date();
		var day = d.getDay() + 1;
		var hour = d.getHours() + 1;

		// Finally, get the relevant day as number
		var actualDay = hour >= 22 ? ((day == 7 ? 0 : day) + 1) : day;


		// ajax call & Json parsing
		var dbUrl ='SchedDB/' + actualDay + '.json';
		console.log(dbUrl); 
		$.ajax({
			url: dbUrl,
			dataType: 'json',
			success:function(data,textStatus,request){
				$.each(data,function(i,item){
					$('#poll')
					.append($('<option></option>')
						.attr('value','wod'+i)
						.text(data[i].name +' '+ data[i].time + ' '+ data[i].place )); 
					console.log(data[i].name +' '+ data[i].time + ' '+ data[i].place );
				});
			},
			error:function(res){
				alert('Woops, something went wrong. Please contact Omri');
				console.log(res);
			}
		});
	}
});