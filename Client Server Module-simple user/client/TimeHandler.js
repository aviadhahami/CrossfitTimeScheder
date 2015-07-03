$(document).ready(function () {

	$.ajax({
		url: '1.json',
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
		}
	});

});