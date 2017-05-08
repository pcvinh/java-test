var jqSso;
var polyfilter_scriptpath = '//starhub.s3.amazonaws.com/ufinity_sso/js/ModalWindowEffects/js/';
var sso =
{
	iframe: null,
	iframeUrl: null,
	init: function(options) {
		var vcid = '';
		var that = this;

		if (this.options.hasOwnProperty('vcid') && (this.options.vcid != '')) {
			vcid = this.options.vcid;
		}
		else if (jqSso('input[name="vcid"]').val() != undefined) {
			vcid = jqSso('input[name="vcid"]').val();
		}

		this.iframeUrl = 'https://ssouat.starhub.com/ufinity/iframe.php?' +
		'canvas=1' +
		'&cberr='		+ encodeURIComponent(jqSso('input[name="cberr"]').val() == undefined ? '' : jqSso('input[name="cberr"]').val()) +
		'&cb='			+ encodeURIComponent(jqSso('input[name="cb"]').val() == undefined ? '' : jqSso('input[name="cb"]').val()) +
		'&vcid='		+ vcid +
		'&uid='			+ encodeURIComponent(jqSso('input[name="uid"]').val() == undefined ? '' : jqSso('input[name="uid"]').val()) +
		'&pudn='		+ encodeURIComponent(jqSso('input[name="pudn"]').val() == undefined ? '' : jqSso('input[name="pudn"]').val()) +
		'&returnUrl='	+ encodeURIComponent(this.options.returnUrl);

//		jqSso('#sso-root').html('<input type="button" name="login" id="login" value="Login" /><input type="button" class="md-trigger" data-modal="modal-1" value="Fake" id="loginTrigger" style="display: none;" /><div class="md-modal md-effect-1" id="modal-1"><div class="md-content"><iframe id="ssoLoginFrame" src="" width="400" height="600"/></div><button class="md-close" style="display: none;">Close me!</button></div><div class="md-overlay"></div>');
		jqSso('#sso-root').html('<a href="#" id="login">' + this.options.button + '</a><input type="button" class="md-trigger" data-modal="modal-1" value="Fake" id="loginTrigger" style="display: none;" /><div class="md-modal md-effect-1" id="modal-1"><div class="md-content"><a href="#" class="md-close" style="float: right;"><img src="//starhub.s3.amazonaws.com/ufinity_sso/images/close.png" /></a><iframe id="ssoLoginFrame" src="" width="400" height="600"/></div><button class="md-close" style="display: none;">Close me!</button></div><div class="md-overlay"></div>');
		head.js('//starhub.s3.amazonaws.com/ufinity_sso/js/ModalWindowEffects/js/modalEffects.js');

		this.iframe = document.getElementById('ssoLoginFrame');
		//if (this.iframe !== null) { this.iframe.src = this.iframeUrl; }

		jqSso('#login').click(function() {
			if (jqSso.browser.mobile) {
				top.location.href= that.iframeUrl;
			}
			else {
				var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
				if (isSafari) {
	                //safari hack - if safari only
	                var safarifix = window.open('https://ssouat.starhub.com/ufinity/safarifix.php','new window', 'height=400,width=400');
	                console.log(safarifix);
	                var interval = setInterval(function() {
						try {
							console.log(safarifix);
							if (safarifix == null || safarifix.closed || jqSso.isEmptyObject( safarifix )) {
								clearInterval(interval);
								that.showSsoModal();
							}
						}
						catch (e) {
					}
					}, 1000);
				}
				else {
					that.showSsoModal();
				}
			}

			return false;
		});
	},
	showSsoModal: function () {
		if (this.iframe !== null) {
			this.iframe.src = this.iframeUrl;
			this.iframe.onload = function() {
				jqSso('#loginTrigger').click();
			};
		}
	}
}

function onLoad() {
	/*
	$(f).load(function() {
		$(f).fadein(1000);
	});
	*/

	head.js(
		'//ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js'
		,'//vocanic-javascript.s3.amazonaws.com/detectmobilebrowser_jquery.js'
		,'//starhub.s3.amazonaws.com/ufinity_sso/js/ModalWindowEffects/js/modernizr.custom.js'
		,'//starhub.s3.amazonaws.com/ufinity_sso/js/ModalWindowEffects/js/classie.js'
		//,'//starhub.s3.amazonaws.com/ufinity_sso/js/ModalWindowEffects/js/modalEffects.js'
		,'//starhub.s3.amazonaws.com/ufinity_sso/js/ModalWindowEffects/js/cssParser.js'
		//,'//starhub.s3.amazonaws.com/ufinity_sso/js/ModalWindowEffects/js/css-filters-polyfill.js'
		//,'//starhub.s3.amazonaws.com/ufinity_sso/js/ModalWindowEffects/css/default.css'
		,'//starhub.s3.amazonaws.com/ufinity_sso/js/ModalWindowEffects/css/component.css'
	);

	head.ready(function() {
		jqSso = jQuery.noConflict(true);
		sso.init();
	});
}

function loadHead() {
	var jq = document.createElement('script');
	jq.onload = onLoad;
	jq.type = 'text/javascript';
	jq.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'vocanic-javascript.s3.amazonaws.com/head.1.0.3.min.js';
	var sc = document.getElementsByTagName('script')[0];
	sc.parentNode.insertBefore(jq, sc);
}

if ( document.addEventListener ) {
	document.addEventListener(
		"DOMContentLoaded", loadHead, false
	);
}
else if ( document.all && ! window.opera ) {
	document.write(
		'<script type="text/javascript" id="onLoadLoader" ' +
		'defer="defer" src="javascript:void(0)"><\/script>'
	);
	var contentLoader = document.getElementById("onLoadLoader");
	contentLoader.onreadystatechange = function () {
		if ( this.readyState == "complete" ) loadHead();
	}
}

/* This may not always work as there may be other js libraries also overriding window.onload. Trying something new above */
/*
window.onload = function () {
//	if (typeof head == 'undefined') {
		var jq = document.createElement('script');
		jq.onload = onLoad;
		jq.type = 'text/javascript';
		jq.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'vocanic-javascript.s3.amazonaws.com/head.1.0.3.min.js';
		var sc = document.getElementsByTagName('script')[0];
		sc.parentNode.insertBefore(jq, sc);
//	}
}
*/