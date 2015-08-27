jquery.fancylike
================

jQuery plugin that allows to customize facebook like button

Dependencies
================

* jQuery 1.10.2

Usage
================

    $(document).ready(function(){
		// first example with auto-detection of URL to like (i.e. current url)
		// only works when executes in a real website
		$(".fancylike-fb-like").fancylike();

		// second example with explicit URL to like
		$("img").fancylike({
			page_url : "https://github.com/fukamachi83"
		});
	});
