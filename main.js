$('document').ready(function () {

	//OPEN THE TAB
	$("#myTab a").click(function(e){
    e.preventDefault();
    $(this).tab('show');
  });

	$('.date').val(today());

	$('p').css('color', 'green');

	$('.ldp').click(function(){
		$('.error').css('display','block');
	});


	$('#submitt').click(function(){
		return sortData();
	});

	function today() {
		var date = new Date();
		var month = date.getMonth();
		if (month<10) {
			month = '0' + String(month + 1);
			if (month==0) {
				month = '01';
			}	
		}

		var day = date.getDate();
		if (day < 10) {
			day = '0'+ String(day);
		}

		return date.getFullYear() + '-' + month + '-' + day;
	}

	$('.add').click(function(){
		$('form>div.row').append(
			// "<div class='form-group' style='padding-top:10px'>
			//<input type='date' class='form-control date' name='date' value='" + today() +"'>			  
			//<input type='text'class='form-control login' placeholder='LDAP' name='login'>				 <input  type='text' class='form-control id' placeholder='ID' name='ID'><a class='btn btn-default btn-xs delete' style='margin-left:3px'><span class='glyphicon glyphicon-minus'></span> Delete</a>					</div>"
			'<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 form-group"> <hr>'+
                '<div class="col-xs-8 dt form-grou">'+
                    '<input type="date" class="form-control date" name="data[date]" value="' + today() + '">'+
                '</div>'+
                '<div class="col-xs-8 col-sm-5 col-md-3 col-lg-2 pdng ldp form-grou">'+  
                    '<input type="text" class="form-control login" placeholder="LDAP"  maxlength="12" name="data[login]">'+
                '</div>' +
                '<div class="col-xs-8  pdng fio form-grou">'+
                    '<input type="text" class="form-control" placeholder="ФИО" name="data[fio]">'+
                '</div>'+
                '<div class="col-xs-8 col-sm-8 col-md-2 col-lg-2 pdng clid form-grou">'+
                    '<input type="text" class="form-control id" placeholder="ID" maxlength="10" name="data[ID]">'+
                '</div>'+
                '<div class="col-xs-8 col-sm-8 col-md-12 col-lg-2 pdng comm form-grou">'+
                    '<input type="text" class="form-control id" placeholder="Comment" name="data[ID]">'+
                '</div>'+
                '<span class="glyphicon glyphicon-ban-circle delete" title="Delete"></span>'+
            '</div>');


		});
	
	$(document).on('click', '.delete', function() { //документ, т.к элемент добавлен уже после загрузки страницы
		//event.stopPropagation();
		$(this).parent('.form-group').remove();
	});

	// $('#ajax').click(function() {
	// 	alert(JSON.stringify(getData('getTrainees'))); //получаю записи в таблице стажеров
	// });

});

//собираем значения полей в объект и формируем массив из объектов
	function sortData() {
			var data = [];
		$('.form-group').each(function(){
			var date = $(this).children('.date').val();
			var login = $(this).children('.login').val();
			var id   = $(this).children('.id').val();
			var DLI = {
				       'date' : date,
			           'login': login,
			           'id'   : id
			          };
			data.push(DLI);
		});
		//alert(JSON.stringify(data));
		alert(JSON.stringify(data));
		return getData(data);
	};

	var getData = function(data) {
		return $.ajax({
		  type: 'POST',
		  //async: false,
		  dataType: 'json',
		  url: 'main.php',
		  data: 'data=' + JSON.stringify(data), //в формате JSON отправляем данные на сервер
		  success: function(msg){
		    alert( 'Прибыли данные: ' + msg);  //формат JSON парсится автоматически в объект JS, т.к есть  dataType: 'json'JSON.stringify(msg)
		    return msg;
		  },
		  error: function(e){
		  	$('#error').html('message ' + e.responseText + 'wefewf');
		  }
		});
	};


	
