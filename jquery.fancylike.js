/*
 * jQuery Fancylike plugin
 * @version: 0.0.7
 * @release: 2013-08-19
 *
 * Copyright 2013, Tiziano Treccani<tiziano.treccani@gmail.com>
 * Copyright 2015, Evgeniy Fitsner<drfits@drfits.com>
 * Dual licensed under the LGPL Version 3 license.
*/
(function( $ ) {
 
	var transformLikeButton = function(likeButton, opts){

		var likeButtonWidth = likeButton.width();
			var likeButtonHeight = likeButton.height();
			var numX = Math.ceil(likeButtonWidth / $.fn.fancylike.defaults.fb_like_width);
			var numY = Math.ceil(likeButtonHeight / $.fn.fancylike.defaults.fb_like_height);
			var numTot = numX * numY;

		// css normalization
		likeButton.css({
			"overflow": "hidden",
			"padding" : "0"
		});

		var params = {
			"href" : opts.page_url,
			"width" : opts.fb_like_width,
			"height" : opts.fb_like_height,
			"colorscheme" : "light",
			"layout" : "button",
			"action" : "like",
			"show_faces" : "false",
			"send" : "false",
			"appId" : "131787130251431"
		};
		
		var fbLikeIframe = $("<iframe/>").attr({
			"src" : opts.fb_like_url + "?" + $.param(params),
			"frameborder": "no"
		}).css({
			"border": "none",
			"width" : Math.floor(likeButtonWidth / numX),
			"height" : Math.floor(likeButtonHeight / numY),
			"-ms-filter" : "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)",
			"filter" : "alpha(opacity=100)",
			"opacity": "0"
		});
		
		// fill space inside div
		for(var i = 0; i < numTot; i++){
			likeButton.append(fbLikeIframe.clone());
		}
	}; 

    $.fn.fancylike = function(options) {
 
		var self = $(this);
		
		var opts = $.extend( {}, $.fn.fancylike.defaults, options);
		
		self.each(function(){

			var likeButton = $(this);
			
			var likeButtonWidth = likeButton.width();
			var likeButtonHeight = likeButton.height();
			var numX = Math.ceil(likeButtonWidth / opts.fb_like_width);
			var numY = Math.ceil(likeButtonHeight / opts.fb_like_height);
			var numTot = numX * numY;

			// replace the img tag with a div
			if(likeButton.is("img")){
				var img = new Image();
				img.src = likeButton.attr("src");
				img.onload = function(){
					
					var wrapper = $("<div/>").css({
						"width" : img.width,
						"height" : img.height,
						"margin" :  likeButton.css("margin"),
						"display" : "inline-block",
						"background" : "transparent url('" + img.src + "') center center no-repeat"
					});
					likeButton.after(wrapper);
					likeButton.remove();
					likeButton = wrapper;

					transformLikeButton(likeButton, opts);

				}
			}
			else {
				transformLikeButton(likeButton, opts);
			}
			
		});
		
		return self;
    };
	
	// Plugin defaults
	$.fn.fancylike.defaults = {
		fb_like_url : "http://www.facebook.com/plugins/like.php",
		fb_like_height : 20,
		fb_like_width : 47,
		page_url : window.location.href
	};
 
}( jQuery ));