var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

/*
	Last Update: 2/29/2012
*/

if (window != top)
    top.location.href = location.href

function MM_openBrWindow(theURL, winName, features) {
    window.open(theURL, winName, features);
}

function toggleCardInfo() {
    if (!$('#ValidateCardInfo').attr('checked'))
        $('#paymentForm').show();
    else
        $('#paymentForm').hide();
}

function toggleShipping() {
	if(jQuery.prototype.jquery == '1.9.1' || jQuery.prototype.jquery == '1.11.1'){
		if ($('#ShippingIsDifferentThanBilling').is(':checked'))
			$('#shippingInformation').show();
		else
			$('#shippingInformation').hide();
	}else {
		if ($('#ShippingIsDifferentThanBilling').attr('checked'))
			$('#shippingInformation').show();
		else
			$('#shippingInformation').hide();
	}
}

function ischeckedss(){
if(jQuery.prototype.jquery == '1.9.1' || jQuery.prototype.jquery == '1.11.1'){
		return $('#ShippingIsDifferentThanBilling').is(':checked'); 
	}else {
		return $('#ShippingIsDifferentThanBilling').attr('checked');
	}
}

function validateForm(e) {
    var messages = "";
    if ((typeof $('input[name=OrderType]:checked').val() === "undefined") || $('input[name=OrderType]:checked').val() == '') {
        try {
            trimOrderFields();
            if ($('#CardNumber').length > 0 && ($('#ValidateCardInfo').length == 0 || !$('#ValidateCardInfo').attr('checked'))) {
                if (isEmpty('CardNumber')) {
                    messages += "\tCredit card number is required\n";
                }
                else {
                    if (CheckCardNum($('#CardNumber').val()) == 0)
                        messages += "\tCredit card number is invalid\n";

                if ($('#CardCvv2').val().length < 3 || isNaN($('#CardCvv2').val()) || isEmpty('CardCvv2'))
                    messages += "\tCVV2 is invalid\n";
            }

            if ($('#CardExpirationMonth').length > 0) {
                var month = $('#CardExpirationMonth').val();
                var year = $('#CardExpirationYear').val();
                if (!IsValidCreditCardDate(month, year))
                    messages += "\tCredit Card Expiration Date is not valid\n";
            }
        }

        if ($('#BillingPrefix').length > 0) {
            if (isEmpty("BillingPrefix"))
                messages += "\tTitle is required\n";
        }

        if ($('#BillingFirstName').length > 0) {
            if (isEmpty("BillingFirstName"))
                messages += "\tFirst Name is required\n";

            if (isEmpty("BillingLastName"))
                messages += "\tLast Name is required\n";

            if ((typeof (verifyBStreet) == 'undefined' || verifyBStreet) && isEmpty("BillingStreet"))
                messages += "\tAddress is required\n";

            if ((typeof (verifyBCity) == 'undefined' || verifyBCity) && isEmpty("BillingCity"))
                messages += "\tCity is required\n";

            if ((typeof (verifyBState) == 'undefined' || verifyBState) && isEmpty("BillingState"))
                messages += "\tState is required\n";

            if ((typeof (verifyBZip) == 'undefined' || verifyBZip) && isEmpty("BillingZip"))
                messages += "\tZip is required\n";

            if ((typeof (verifyBCountry) == 'undefined' || verifyBCountry) && isEmpty("BillingCountry"))
                messages += "\tCountry is required\n";
        }

        if ((typeof (verifyPhone) == 'undefined' || verifyPhone) && $('#Phone').length > 0) {
            if (isEmpty("Phone")) {
                messages += "\tPhone is required\n";
            }
			else {
                var phone = $('#Phone').val().replace(/[^0-9]/g, "");
                if (phone.length != 10) {
                    messages += "\tPhone is invalid. Please enter a phone number in the format ###-###-####\n";
                }
            }
        }

        if ((typeof (verifyEmail) == 'undefined' || verifyEmail) && $('#Email').length > 0) {

            if (isEmpty("Email")) {
                messages += "\tEmail is required\n";
            }
            else {
                var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                var address = document.getElementById("Email").value

                if (reg.test(address) == false) {
                    messages += "\tInvalid Email Address\n";
                }
            }

        }

        if ($('#ShippingFirstName').length > 0 && ischeckedss()) {
            if (isEmpty("ShippingFirstName"))
                messages += "\tShipping First Name is required\n";

            if (isEmpty("ShippingLastName"))
                messages += "\tShipping Last Name is required\n";

            if ((typeof (verifySStreet) == 'undefined' || verifySStreet) && isEmpty("ShippingStreet"))
                messages += "\tShipping Address is required\n";

            if ((typeof (verifySCity) == 'undefined' || verifySCity) && isEmpty("ShippingCity"))
                messages += "\tShipping City is required\n";

            if ((typeof (verifySState) == 'undefined' || verifySState) && isEmpty("ShippingState"))
                messages += "\tShipping State is required\n";

            if ((typeof (verifySZip) == 'undefined' || verifySZip) && isEmpty("ShippingZip"))
                messages += "\tShipping Zip is required\n";

            if ((typeof (verifySCountry) == 'undefined' || verifySCountry) && isEmpty("ShippingCountry"))
                messages += "\tShipping Country is required\n";
        }
    }
    catch (err) {
        alert(err);
        e.preventDefault();
    }
	
    try {
        if (messages.length == 0)
            cleanExit = true;
        if (messages.length > 0) {
            e.preventDefault();
            messages = "Please correct the following issues:\n" + messages;
            alert(messages);
        }
        else if (typeof (QASValidate) != 'undefined' && QASValidate) {
            e.preventDefault();
            qasValidateAddress();
        }
    }
    catch (err) {
        }
    }
}

function isEmpty(fieldId) {
	var value = $('#' + fieldId).val();
	var str = value.replace(/^\s\s*/, '').replace(/\s\s*$/, '')
    return str.length == 0;
}


var errorcolor = "#FCFCC2"
var normalcolor = "#FFFFFF"
var errormessage = ""

function CheckCardNum(cardnum) {
    if (cardnum == '') {
        return 0;
    }
    if (isNaN(cardnum)) {
        return 0;
    }
    if (parseInt(cardnum) <= 0) {
        return 0;
    }
    if (!CheckLUHN(cardnum)) {
        return 0;
    }
    return 1;
}

function CheckLUHN(cardnum) {
    var RevNum = new String(cardnum);
    RevNum = Reverse(RevNum);

    var total = new Number(0);
    for (var i = 0; i < RevNum.length; i += 1) {
        var temp = 0;
        if (i % 2) {
            temp = RevNum.substr(i, 1) * 2;
            if (temp >= 10) {
                var splitstring = new String(temp);
                temp = parseInt(splitstring.substr(0, 1)) + parseInt(splitstring.substr(1, 1));
            }
        }
        else {
            temp = RevNum.substr(i, 1);
        }
        total += parseInt(temp);
    }
    // if there's no remainder, we return 1 (true)
    return (total % 10) ? 0 : 1;
}

function IsValidCreditCardDate(cardExpirationMonth, cardExpirationYear) {
    var currentDate = new Date();

    if (cardExpirationYear == currentDate.getFullYear() && (cardExpirationMonth - 1) < currentDate.getMonth()) {
        return false;
    }
    return true;
}

function Reverse(strToReverse) {
    var strRev = new String;
    var i = strToReverse.length;

    while (i--) {
        strRev += strToReverse.charAt(i);
    }
    return strRev;
}

function validate_email() {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    var address = document.getElementById("email_address").value
    if (reg.test(address) == false) {
        return false;
    }
    return true;
}

function trimOrderFields() {
    $('#CardNumber').val($.trim($('#CardNumber').val()));
    $('#CardCvv2').val($.trim($('#CardCvv2').val()));
    $('#BillingZip').val($.trim($('#BillingZip').val()));
}

function validateCheckOutForm(e) {

    var messages = '';
    try {
        trimOrderFields();
        var isContinueCCCheck = true;

        isContinueCCCheck = ($("input[name='CardSelection']:checked").val() == undefined)
        if (!isContinueCCCheck)
            isContinueCCCheck = ($("input[name='CardSelection']:checked").val().length == 0)
        if (isContinueCCCheck && $('#CardNumber').length > 0 && ($('#ValidateCardInfo').length == 0 || !$('#ValidateCardInfo').attr('checked'))) {

            if (isEmpty('CardNumber')) {
                messages += "\tCredit card number is required\n";
            }
            else {
                if (CheckCardNum($('#CardNumber').val()) == 0)
                    messages += "\tCredit card number is invalid\n";

                //                if (isEmpty("NameOnCard"))
                //                    messages += "\tName On Card is required\n";
            }
            if ($('#CardExpirationMonth').length > 0) {
                var month = $('#CardExpirationMonth').val();
                var year = $('#CardExpirationYear').val();

                if (!IsValidCreditCardDate(month, year))
                    messages += "\tCredit Card Expiration Date is not valid\n";
            }
        }

        if ($('#CardCvv2').val().length < 3 || isNaN($('#CardCvv2').val()) || isEmpty('CardCvv2'))
            messages += "\tCVV2 is invalid\n";


        if ($('#BillingFirstName').length > 0) {
            if (isEmpty("BillingFirstName"))
                messages += "\tFirst Name is required\n";

            if (isEmpty("BillingLastName"))
                messages += "\tLast Name is required\n";

            if (document.getElementById('BillingStreet').value.length == 0)
                messages += "\tAddress is required\n";

            if (document.getElementById('BillingCity').value.length == 0)
                messages += "\tCity is required\n";

            if (document.getElementById('BillingState').value.length == 0)
                messages += "\tState is required\n";

            if (document.getElementById('BillingZip').value.length == 0)
                messages += "\tZip is required\n";

            if (document.getElementById('BillingCountry').value.length == 0)
                messages += "\tCountry is required\n";
        }

        if ($('#Phone').length > 0) {
            if (isEmpty("Phone")) {
                messages += "\tPhone is required\n";
            }

            if (!isEmpty("Phone")) {
                phone = $('#Phone').val().replace(/[^0-9]/g, "");
                if (phone.length != 10) {
                    messages += "\tPhone is invalid. Please enter a phone number in the format ###-###-####\n";
                }
            }
        }

        if ($('#Email').length > 0) {

            if (isEmpty("Email")) {
                messages += "\tEmail is required\n";
            }
            else {
                var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                var address = document.getElementById("Email").value

                if (reg.test(address) == false) {
                    messages += "\tInvalid Email Address\n";
                }
            }
        }

        if (typeof (isLoggedIn) != 'undefined' && !isLoggedIn && ($("input[name='LoginSelection']:checked").val() == undefined || $("input[name='LoginSelection']:checked").val() != "anonymous")) {
            if (isEmpty("CurrentCustomer_Password"))
                messages += "\tPassword is required\n";

            if (isEmpty("ConfirmPassword"))
                messages += "\tConfirm Password is required\n";

            if ($('#CurrentCustomer_Password').val() != $('#ConfirmPassword').val())
                messages += "\tPassword and Confirm Password must match\n";
        }

        if (ischeckedss()) {

            if (document.getElementById('ShippingStreet').value.length == 0)
                messages += "\tShipping Address is required\n";

            if (document.getElementById('ShippingCity').value.length == 0)
                messages += "\tShipping City is required\n";

            if (document.getElementById('ShippingState').value.length == 0)
                messages += "\tShipping State is required\n";

            if (document.getElementById('ShippingZip').value.length == 0)
                messages += "\tShipping Zip is required\n";

            if (document.getElementById('ShippingCountry').value.length == 0)
                messages += "\tShipping Country is required\n";
        }
    }
    catch (err) {
        alert(err);
        e.preventDefault();
    }
    if (messages.length > 0) {
        e.preventDefault();
        messages = "Please correct the following issues:\n" + messages;
        alert(messages);
    }
    //    else if (QASValidate != null && QASValidate == true) {
    //        e.preventDefault();
    //        qasValidateAddress();
    //    }

}

$(document).ready(function () {
	$('#formWrap').find('input').each(function(){
		$(this).val($(this).val().replace(/^\*(\w*\s*)+/g, ''));
	});
});

/**
* jQuery.ScrollTo - Easy element scrolling using jQuery.
* Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
* Dual licensed under MIT and GPL.
* Date: 3/9/2009
* @author Ariel Flesler
* @version 1.4.1
*
* http://flesler.blogspot.com/2007/10/jqueryscrollto.html
*/
; (function ($) { var m = $.scrollTo = function (b, h, f) { $(window).scrollTo(b, h, f) }; m.defaults = { axis: 'xy', duration: parseFloat($.fn.jquery) >= 1.3 ? 0 : 1 }; m.window = function (b) { return $(window).scrollable() }; $.fn.scrollable = function () { return this.map(function () { var b = this, h = !b.nodeName || $.inArray(b.nodeName.toLowerCase(), ['iframe', '#document', 'html', 'body']) != -1; if (!h) return b; var f = (b.contentWindow || b).document || b.ownerDocument || b; return f.compatMode == 'BackCompat' ? f.body : f.documentElement }) }; $.fn.scrollTo = function (l, j, a) { if (typeof j == 'object') { a = j; j = 0 } if (typeof a == 'function') a = { onAfter: a }; if (l == 'max') l = 9e9; a = $.extend({}, m.defaults, a); j = j || a.speed || a.duration; a.queue = a.queue && a.axis.length > 1; if (a.queue) j /= 2; a.offset = n(a.offset); a.over = n(a.over); return this.scrollable().each(function () { var k = this, o = $(k), d = l, p, g = {}, q = o.is('html,body'); switch (typeof d) { case 'number': case 'string': if (/^([+-]=)?\d+(\.\d+)?(px)?$/.test(d)) { d = n(d); break } d = $(d, this); case 'object': if (d.is || d.style) p = (d = $(d)).offset() } $.each(a.axis.split(''), function (b, h) { var f = h == 'x' ? 'Left' : 'Top', i = f.toLowerCase(), c = 'scroll' + f, r = k[c], s = h == 'x' ? 'Width' : 'Height'; if (p) { g[c] = p[i] + (q ? 0 : r - o.offset()[i]); if (a.margin) { g[c] -= parseInt(d.css('margin' + f)) || 0; g[c] -= parseInt(d.css('border' + f + 'Width')) || 0 } g[c] += a.offset[i] || 0; if (a.over[i]) g[c] += d[s.toLowerCase()]() * a.over[i] } else g[c] = d[i]; if (/^\d+$/.test(g[c])) g[c] = g[c] <= 0 ? 0 : Math.min(g[c], u(s)); if (!b && a.queue) { if (r != g[c]) t(a.onAfterFirst); delete g[c] } }); t(a.onAfter); function t(b) { o.animate(g, j, a.easing, b && function () { b.call(this, l, a) }) }; function u(b) { var h = 'scroll' + b; if (!q) return k[h]; var f = 'client' + b, i = k.ownerDocument.documentElement, c = k.ownerDocument.body; return Math.max(i[h], c[h]) - Math.min(i[f], c[f]) } }).end() }; function n(b) { return typeof b == 'object' ? b : { top: b, left: b} } })(jQuery);


}
/*
     FILE ARCHIVED ON 02:42:24 Oct 08, 2014 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 19:29:03 Dec 19, 2023.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 82.421
  exclusion.robots: 0.116
  exclusion.robots.policy: 0.104
  cdx.remote: 0.071
  esindex: 0.01
  LoadShardBlock: 53.937 (3)
  PetaboxLoader3.datanode: 84.296 (4)
  load_resource: 81.821
  PetaboxLoader3.resolve: 30.095
*/