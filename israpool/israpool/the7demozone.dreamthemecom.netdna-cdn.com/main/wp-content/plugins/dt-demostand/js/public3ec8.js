// JavaScript Document

/*!
 * jQuery Cookie Plugin v1.3.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */

if ( !dtGlobals ) {
	var dtGlobals = {}; // Global storage
}

if ( !dtGlobals.isMobile ) {
	dtGlobals.isMobile = (/(Android|BlackBerry|iPhone|iPod|iPad|Palm|Symbian)/.test(navigator.userAgent));
}

if ( !dtGlobals.isiPhone ) {
	dtGlobals.isiPhone = (/(iPhone|iPod)/.test(navigator.userAgent));
}

dtGlobals.demostandCookiesSettings = {expires: 1, path: dtDemostand.dtDemoUrl || '/'};

if(!dtGlobals.isiPhone){
	(function ($, document, undefined) {

		var pluses = /\+/g;

		function raw(s) {
			return s;
		}

		function decoded(s) {
			return unRfc2068(decodeURIComponent(s.replace(pluses, ' ')));
		}

		function unRfc2068(value) {
			if (value.indexOf('"') === 0) {
				// This is a quoted cookie as according to RFC2068, unescape
				value = value.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
			}
			return value;
		}

		function fromJSON(value) {
			return config.json ? JSON.parse(value) : value;
		}

		var config = $.cookie = function (key, value, options) {

			// write
			if (value !== undefined) {
				options = $.extend({}, config.defaults, options);

				if (value === null) {
					options.expires = -1;
				}

				if (typeof options.expires === 'number') {
					var days = options.expires, t = options.expires = new Date();
					t.setDate(t.getDate() + days);
				}

				value = config.json ? JSON.stringify(value) : String(value);

				return (document.cookie = [
					encodeURIComponent(key), '=', config.raw ? value : encodeURIComponent(value),
					options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
					options.path    ? '; path=' + options.path : '',
					options.domain  ? '; domain=' + options.domain : '',
					options.secure  ? '; secure' : ''
				].join(''));
			}

			// read
			var decode = config.raw ? raw : decoded;
			var cookies = document.cookie.split('; ');
			var result = key ? null : {};
			for (var i = 0, l = cookies.length; i < l; i++) {
				var parts = cookies[i].split('=');
				var name = decode(parts.shift());
				var cookie = decode(parts.join('='));

				if (key && key === name) {
					result = fromJSON(cookie);
					break;
				}

				if (!key) {
					result[name] = fromJSON(cookie);
				}
			}

			return result;
		};

		config.defaults = {};

		$.removeCookie = function (key, options) {
			if ($.cookie(key) !== null) {
				$.cookie(key, null, options);
				return true;
			}
			return false;
		};

	})(jQuery, document);


	jQuery( function ($) {
/*
		if ( $.cookie("dt_demo_url") != (window.location.hostname + window.location.pathname) ) {
			$.removeCookie("skin", dtGlobals.demostandCookiesSettings);
			$.removeCookie("layout", dtGlobals.demostandCookiesSettings);
		}
*/

		var dpr = ((window.devicePixelRatio===undefined)?1:window.devicePixelRatio)

		if( $(".demo-panel").length > 0 ) {
			var loading_label = $('<div id="loading-overlay" class="loading-overlay" style="position: fixed" />').hide().appendTo("body");
		}
		else {
			return false;
		};

		if ($.cookie("skin")) {

			$(".img-preview a").each(function() {
				if ( $(this).attr("data-skin") == $.cookie("skin")) {
					$(".img-preview").removeClass("act");
					$(this).parent().addClass("act");
				};
			});

			if ($.cookie("is_boxed") == "true") {
				$("#make-box").attr("checked", "checked");
			}
		}

		$(".img-preview a").click(function(event) {
			event.preventDefault();
			var $this = $(this),
				skin = $this.attr("data-skin");

			$.cookie("skin", skin, dtGlobals.demostandCookiesSettings);
			location.reload( true );
			loading_label.stop().fadeIn(500);
		});

		$(".demo-panel .make-box").on("change", function(e) {
			var val = $(this).val();

			if ( 'wide' == val ) {
				$("#page").removeClass("boxed");
				$('#phantom .ph-wrap').removeClass("boxed");
			} else if ( 'boxed' == val ) {
				$("#page").addClass("boxed");
				$('#phantom .ph-wrap').addClass("boxed");
			} else {
				return;
			}

			$(window).trigger("resize");

			$.cookie("layout", val, dtGlobals.demostandCookiesSettings);
		});

		$(".demo-panel .skin_close").each(function(){
			$(this).click( function () {
				var $currentPanel = $(this).parents(".demo-panel"),
					$customize = $currentPanel.find(".customize");

				if ( parseInt( $customize.css("left") ) == 0 ) {
					$customize.addClass("act").animate(
						{
							left: "-334px"
						}, {
							duration: 500,
							complete: function () {
								$currentPanel.removeClass("panel-act");
							}
						}
					);
				}
				else {
					$currentPanel.addClass("panel-act");
					$customize.removeClass("act").animate({ left: "0px" }, { duration: 500, complete: function () {} } );
				}

				return false;
			});
		});

	});
}

jQuery( function ($) {
	$("#switcher").insertBefore( "#page" );
	$(".remove-frame").on("click", function(e){
		e.preventDefault();
		$(this).parent("#switcher").hide(500);
		$.cookie('hide', 'true', dtGlobals.demostandCookiesSettings);
	});
	if ($.cookie('hide') == "true"){
		$('#switcher').hide();
	}

});