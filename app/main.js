var hbs = require('handlebars');
var _ = require('lodash');

var client_id = null;
var redirect_uri = 'http://localhost:4000/';

var authURL = 'https://instagram.com/oauth/authorize/?client_id=' + client_id + '&redirect_uri=' + redirect_uri + '&response_type=token';

var access_token = null;
var tag = null;

var appendPics = function (data) {
	_.each(data.data, function (d) {
		var source = $('#image').html();
		var template = hbs.compile(source);
		var image = template({ image: d.images.low_resolution.url, tag: tag });
		images.push(image);
		$('.all-pics').append(image);
	});
};

var appendTag = function () {
	var source = $('#tag').html();
	var template = hbs.compile(source);
	$('.tags').append(template({ tag: tag }));

	bindEvent();
};

var fetch = function () {
	$.ajax({
	  method: "GET",
	  url: 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?access_token=' + access_token,
	  dataType: "jsonp",
	  jsonp: "callback",
	  success: function(data) {
	  	$('.searching').hide();
	  	appendPics(data);
	  	appendTag();
	  },
	  error: function(jqXHR, textStatus, errorThrown) {
	    $('.searching').hide();
	    alert(textStatus);
	  }
	});	
}

var bindEvent = function () {
	$('.close-tag').on('click', function () {
		var clickedTag = $(this).data('tag');
		removeTag(clickedTag);
	});
}

$('.auth').on('click', function () {
	window.location = authURL;
});

$('.search').on('click', function () {
	tag = $('.search-input').val();
	fetch();
	$('.searching').show();
});

(function(){
	if (window.location.hash) {
		access_token = window.location.hash.split('=')[1];
	}

	if (!access_token) {
		$('.auth-container').addClass('show');
	} else {
		$('.search-container').addClass('show');
	}
})();
