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


(function ($) {
    var methods = {
        show: function () {
            this.css('height', '');
            this.css('overflow', '');
            this.addClass('fldCt');
            if (this.attr('id') == "BillingStreet") {
                this.css('padding', '');
                this.css('border', '');
            }
        },
        hide: function () {
            this.css('height', '0px');
            this.css('overflow', 'hidden');
            this.removeClass('fldCt');
            if (this.attr('id') == "BillingStreet") {
                this.css('padding', '0px');
                this.css('border', 'none');
            }
        }
    };

    $.fn.showElement = function (methodOrOptions) {
        if (methods[methodOrOptions]) {
            return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
            return methods.show.apply(this, arguments);
        } else {
            $.error('Method ' + methodOrOptions + ' does not exist for showElement ');
        }
    };

})($);

var addressHasBeenChanged = false;
var shippingAddressHasBeenChanged = false;
var expanded = true;
var route = '';
var number = '';
var placeSearch, autocomplete, billingPadding, billingBorder, billingInformationChecker;
var componentForm = {
    BillingStreet: 'BillingStreetCt',
    BillingStreet2: 'BillingStreet2Ct',
    BillingCity: 'BillingCityCt',
    BillingState: 'BillingStateCt',
    BillingCountry: 'BillingCountryCt',
    BillingZip: 'BillingZipCt'
};

var shippingComponentForm = {
    ShippingStreet: 'ShippingStreetCt',
    ShippingStreet2: 'ShippingStreet2Ct',
    ShippingCity: 'ShippingCityCt',
    ShippingState: 'ShippingStateCt',
    ShippingCountry: 'ShippingCountryCt',
    ShippingZip: 'ShippingZipCt'
};

function initialize() {
    // Create the autocomplete object, restricting the search
    // to geographical location types.
    autocomplete = new google.maps.places.Autocomplete(
		/** @type {HTMLInputElement} */(document.getElementById('StreetAutoFill')), {});

    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        fillInAddress();
        addressHasBeenChanged = true;
    });
    if ($("#ShippingCity").val()) {
        shippingAutocomplete = new google.maps.places.Autocomplete(
			/** @type {HTMLInputElement} */(document.getElementById('ShippingStreetAutoFill')), {});

        google.maps.event.addListener(shippingAutocomplete, 'place_changed', function () {
            fillInShippingAddress();
            shippingAddressHasBeenChanged = true;
        });
    }
}

function fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();

    for (var component in componentForm) {
        document.getElementById(component).value = '';
        document.getElementById(component).disabled = false;
    }

    // Get each component of the address from the place details
    // and fill the corresponding field on the form.
    var route = '';
    var number = '';
    if (place.address_components) {
        for (var i = 0; i < place.address_components.length; i++) {
            if (place.address_components[i]["long_name"].length > 0) {
                var addressType = place.address_components[i].types[0];
                if (addressType == "country") {
                    if (place.address_components[i]["short_name"] == "US") {
                        $("#BillingCountry").val("USA");
                    }
                    if (place.address_components[i]["short_name"] == "CA") {
                        $("#BillingCountry").val("CAN");
                    }
                }
                if (addressType == 'administrative_area_level_1') {
                    var state = place.address_components[i]["short_name"];
                    $("#BillingState").val(state);
                }
                if (addressType == 'postal_code') {
                    $("#BillingZip").val(place.address_components[i]["long_name"]);
                }
                if (addressType == 'locality') {
                    $("#BillingCity").val(place.address_components[i]["long_name"]);
                }

                if (addressType == 'street_number') {
                    number = place.address_components[i]["long_name"];
                }
                if (addressType == 'route') {
                    route = place.address_components[i]["long_name"];
                }
            }
        }
    }
    $("#BillingStreet").val(number + " " + route);

    //check if there is missing data for street name (google does this)
    var dataEntered = $('#StreetAutoFill').val();
    var dataFormatted = $("#BillingStreet").val();

    prependedData = getCharsBefore(dataEntered, dataFormatted);
    if (prependedData.trim().length > 0) {
        $('#BillingStreet').val(prependedData + dataFormatted);
    }

    showAddressFields();
}

function fillInShippingAddress() {
    // Get the place details from the autocomplete object.
    var place = shippingAutocomplete.getPlace();

    for (var component in shippingComponentForm) {
        document.getElementById(component).value = '';
        document.getElementById(component).disabled = false;
    }

    // Get each component of the address from the place details
    // and fill the corresponding field on the form.
    var route = '';
    var number = '';
    if (place.address_components) {
        for (var i = 0; i < place.address_components.length; i++) {
            if (place.address_components[i]["long_name"].length > 0) {
                var addressType = place.address_components[i].types[0];
                if (addressType == "country") {
                    if (place.address_components[i]["short_name"] == "US") {
                        $("#ShippingCountry").val("USA");
                    }
                    if (place.address_components[i]["short_name"] == "CA") {
                        $("#ShippingCountry").val("CAN");
                    }
                }
                if (addressType == 'administrative_area_level_1') {
                    var state = place.address_components[i]["short_name"];
                    $("#ShippingState").val(state);
                }
                if (addressType == 'postal_code') {
                    $("#ShippingZip").val(place.address_components[i]["long_name"]);
                }
                if (addressType == 'locality') {
                    $("#ShippingCity").val(place.address_components[i]["long_name"]);
                }

                if (addressType == 'street_number') {
                    number = place.address_components[i]["long_name"];
                }
                if (addressType == 'route') {
                    route = place.address_components[i]["long_name"];
                }
            }
        }
    }
    $("#ShippingStreet").val(number + " " + route);
    showShippingAddressFields();
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var geolocation = new google.maps.LatLng(
				position.coords.latitude, position.coords.longitude);
            autocomplete.setBounds(new google.maps.LatLngBounds(geolocation,
				geolocation));
        });
    }
}


function validateInputs() {
    var inputsHaveValues = true;
    $('#billingInformation > input').each(function () {
        if ($(this).val() == '') {
            inputsHaveValues = false;
        }
    });
    if (inputsHaveValues) {
        return true;
    }
    return false;
}

function checkEnter(e) {
    e = e || event;
    var txtArea = /textarea/i.test((e.target || e.srcElement).tagName);
    return txtArea || (e.keyCode || e.which || e.charCode || 0) !== 13;
}

function focusStreet() {
    addressHasBeenChanged = false;
    $(this).showElement('hide');
    $("#BillingStreetCt").find(".label").showElement('hide');
    $("#BillingStreetCt").css('width', '100%');
    $("#StreetAutoFill").css('width', '98%');
    $("#StreetAutoFill").show();
    $("#StreetAutoFill").val($(this).val());
    $("#StreetAutoFill").focus();
};

function focusShippingStreet() {
    shippingAddressHasBeenChanged = false;
    $(this).showElement('hide');
    $("#ShippingStreetCt").find(".label").showElement('hide');
    $("#ShippingStreetCt").css('width', '100%');
    $("#ShippingStreetAutoFill").css('width', '98%');
    $("#ShippingStreetAutoFill").show();
    $("#ShippingStreetAutoFill").val($(this).val());
    $("#ShippingStreetAutoFill").focus();
}

function blurAutoFill() {
    $(this).hide();
    if (addressHasBeenChanged === false) {
        $("#BillingStreet").val($(this).val());
    }
    $("#BillingStreet").showElement();
    if (!isMobile) {
        $("#BillingStreetCt").find(".label").showElement();
    }
    $("#BillingStreetCt").css('width', '');
    showAddressFields();
};

function blurShippingAutoFill() {
    $(this).hide();
    if (shippingAddressHasBeenChanged === false) {
        $("#ShippingStreet").val($(this).val());
    }
    $("#ShippingStreet").showElement();
    $("#ShippingStreetCt").find(".label").showElement();
    $("#ShippingStreetCt").css('width', '');
    showShippingAddressFields();
}

function hideAddressFields() {
    for (field in componentForm) {
        //$('#' + componentForm[field]).hide();
        $('#' + componentForm[field]).showElement('hide');
    }
    //$('#' + componentForm.BillingStreet).show();
    $('#' + componentForm.BillingStreet).showElement();
}

function hideShippingAddressFields() {
    for (field in shippingComponentForm) {
        //$('#' + shippingComponentForm[field]).hide();
        $('#' + shippingComponentForm[field]).showElement('hide');
    }
    //$('#' + shippingComponentForm.ShippingStreet).show();
    $('#' + shippingComponentForm.ShippingStreet).showElement();
}

function showAddressFields() {
    for (field in componentForm) {
        //('#' + field).hide();
        if (field != "BillingStreet") {
            $('#' + componentForm[field]).showElement();
        }
    }
}

function showShippingAddressFields() {
    for (field in shippingComponentForm) {
        //('#' + field).hide();
        if (field != "ShippingStreet") {
            $('#' + shippingComponentForm[field]).showElement();
        }
    }
}


function evaluateCardType() {
    if ($('#CardNumber').val()) {
        var cardNumber = $('#CardNumber');
        greyCards();
        if (cardNumber.val()[0] === "4") {
            $('#visaImg').attr('src', '../../../../shared/images/visa.html');
            $('#CardType').val("V");
        } else if (cardNumber.val()[0] === "3") {
            $('#amexImg').attr('src', '../../../../shared/images/amex.html');
            $('#CardType').val("AX");
        } else if (cardNumber.val()[0] === "6") {
            $('#discImg').attr('src', '../../../../shared/images/discover.html');
            $('#CardType').val("D");
        } else if (cardNumber.val()[0] === "5") {
            $('#mastercardImg').attr('src', '../../../../shared/images/mastercard.html');
            $('#CardType').val("M");
        } else {
            $('#CardType').val("M");
        }
    } else {
        showAllCardsInColor();
    }
}

function greyCards() {
    if (!AlwaysShowCardTypes) {
        $('#visaImg').attr('src', '../../../../shared/images/visa-g.html');
        $('#amexImg').attr('src', '../../../../shared/images/amex-g.html');
        $('#discImg').attr('src', '../../../../shared/images/discover-g.html');
        $('#mastercardImg').attr('src', '../../../../shared/images/mastercard-g.html');
    }
}

function showAllCardsInColor() {
    $('#visaImg').attr('src', '../../../../shared/images/visa.html');
    $('#amexImg').attr('src', '../../../../shared/images/amex.html');
    $('#discImg').attr('src', '../../../../shared/images/discover.html');
    $('#mastercardImg').attr('src', '../../../../shared/images/mastercard.html');
}

function configureCardImage() {
    $('#cc').find('img').remove();
    $("#cc").html("<img id='visaImg' src='/shared/images/visa.png' alt='visa accepted.' style='width:37px' />");
    $("#cc").append("<img id='mastercardImg' src='/shared/images/mastercard.png' alt='mastercard accepted.' style='width:37px' />");
    $("#cc").append("<img id='amexImg' src='/shared/images/amex.png' alt='american express accepted.' style='width:37px' />");
    $("#cc").append("<img id='discImg' src='/shared/images/discover.png' alt='discover accepted.' style='width:37px' />");
    greyCards();

    $('#CardTypeCt').remove();
    $('#paymentForm').append("<input type='hidden' id='CardType' name='CardType' />");

    $('#CardNumber').keyup(evaluateCardType);
}

function formatNames() {
    var firstNameRegEx = new RegExp("^\\w+", "i");
    var name = $.trim($("#NameOnCard").val());

    if (firstNameRegEx.test(name)) {
        var firstName = firstNameRegEx.exec(name)[0];
        var lastName = $.trim(name.replace(firstName, ""));
        $("#BillingFirstName").val(firstName);
        $("#BillingLastName").val(lastName);
    }
}

function formatShippingNames() {
    var firstNameRegEx = new RegExp("^\\w+", "i");
    var name = $.trim($("#ShippingName").val());

    if (name) {
        if (firstNameRegEx.test(name)) {
            var firstName = firstNameRegEx.exec(name)[0];
            var lastName = $.trim(name.replace(firstName, ""));
            $("#ShippingFirstName").val(firstName);
            $("#ShippingLastName").val(lastName);
        }
    }
}

function formatCardAndAddressPositions() {
    var billingInfo = $("#billingInformation");
    var paymentInfo = $("#paymentForm");
    var paymentInfoParent = paymentInfo.parent();
    billingInfo.parent().prepend(paymentInfo);
    paymentInfoParent.prepend(billingInfo);
    if ($('#productSelection').val() != undefined) {
        billingInfo.parent().prepend($('#productSelection'));
    }
}

function setupForm() {
    //formatCardAndAddressPositions();

    if ($("#BillingCity").val() == undefined || $("#BillingCity").val().length == 0) {
        hideAddressFields();
    }

    $("#BillingStreetCt .fld").append("<input id='StreetAutoFill' name='StreetAutoFill' placeholder='Street Address' type='text' value=''>");
    $("#StreetAutoFill").hide();
    $("#BillingStreet").focus(focusStreet);
    $("#StreetAutoFill").blur(blurAutoFill);
    $("#cc").css('width', '60%');
    var firstName = $("#BillingFirstName").val();
    var lastName = $("#BillingLastName").val();
    $("#BillingFirstNameCt").remove();
    $("#BillingLastNameCt").remove();
    $("#billingInformation").find(".FormHeadlineL").after("<div id='NameOnCardCt' class='fldCt required'><label class='label'><span class='requiredIcon'>*</span>Full Name<span class='labelColon'>:</span></label><span class='fld'><input id='NameOnCard' maxlength='50' name='NameOnCard' type='text' value=''></span></div><input id='BillingFirstName' maxlength='50' name='BillingFirstName' type='hidden' value=''><input id='BillingLastName' maxlength='50' name='BillingLastName' type='hidden' value=''>");

    //var hiddenLabels = ($("#BillingZipCt").find(".label")).css('display') === 'none';

    if (isMobile) {
        $("#NameOnCardCt").find(".label").showElement('hide');
        $("#BillingStreetCt").find(".label").showElement('hide');
        $("#NameOnCard").attr('placeholder', '*Full Name:');
        $("#BillingStreet").attr('placeholder', '*Address:');
        $("#BillingCity").attr('placeholder', '*City:');
        $("#BillingZip").attr('placeholder', '*Zip:');
        $("#Phone").attr('placeholder', '*Phone:');
        $("#Email").attr('placeholder', '*Email:');
    }
    if (firstName === '*First Name:') {
        firstName = '';
    }
    if (lastName === '*Last Name:') {
        lastName = '';
    }

    $("#BillingFirstName").val(firstName);
    $("#BillingLastName").val(lastName);
    $("#NameOnCard").val($.trim((firstName + ' ' + lastName)));
    $("#NameOnCard").keyup(formatNames);

    billingPadding = $('#BillingStreet').css('padding', '');
    billingBorder = $('#BillingStreet').css('border', '');

    configureCardImage();
    evaluateCardType();
}

function setupShipping() {
    if ($("#ShippingCity").val().length == 0) {
        hideShippingAddressFields();
    }
    $("#ShippingStreetCt .fld").append("<input id='ShippingStreetAutoFill' name='ShippingStreetAutoFill' placeholder='Street Address' type='text' value=''>");
    $("#ShippingStreetAutoFill").hide();
    $("#ShippingStreet").focus(focusShippingStreet);
    $("#ShippingStreetAutoFill").blur(blurShippingAutoFill);

    var firstName = $("#ShippingFirstName").val();
    var lastName = $("#ShippingLastName").val();
    $("#ShippingFirstNameCt").remove();
    $("#ShippingLastNameCt").remove();
    $("#shippingInformation").find(".FormHeadlineL").after("<div id='ShippingNameCt' class='fldCt required'><label class='label'><span class='requiredIcon'>*</span>Full Name<span class='labelColon'>:</span></label><span class='fld'><input id='ShippingName' maxlength='50' name='ShippingName' type='text' value=''></span></div><input id='ShippingFirstName' maxlength='50' name='ShippingFirstName' type='hidden' value=''><input id='ShippingLastName' maxlength='50' name='ShippingLastName' type='hidden' value=''>");

    if (isMobile) {
        $("#ShippingNameCt").find(".label").showElement('hide');
        $("#ShippingStreetCt").find(".label").showElement('hide');
        $("#ShippingName").attr('placeholder', '*Full Name:');
        $("#ShippingStreet").attr('placeholder', '*Address:');
        $("#ShippingCity").attr('placeholder', '*City:');
        $("#ShippingZip").attr('placeholder', '*Zip:');
    }

    $("#ShippingFirstName").val(firstName);
    $("#ShippingLastName").val(lastName);
    $("#ShippingName").val(firstName + ' ' + lastName);
    $("#ShippingName").keyup(formatShippingNames);

}

function checkForBillingInformation() {
    if ($("#BillingCity").val() != undefined) {
        if ($.trim($("#BillingCity").val()).length > 1) {
            showAddressFields();
            clearInterval(billingInformationChecker);
            return;
        }
    }
}

function getCharsBefore(str, chr) {
    var index = str.indexOf(chr);
    if (index != -1) {
        return (str.substring(0, index));
    }
    return ("");
}

$(document).ready(function () {

	//check for feature compatability
	try{
		document.querySelector('form').onkeypress
	}
	catch(err){
		return;
	}

    $('#AcceptOfferButton').click(function () {
        formatNames();
        formatShippingNames();
        evaluateCardType();
    });

    setupForm();
    if ($("#ShippingCity").val()) {
        setupShipping();
    }
    document.querySelector('form').onkeypress = checkEnter;
    google.maps.event.addDomListener(window, 'load', initialize);

    $('a[href=#formWrap]').click(function () {
        if ($("#BillingCity").val().length === 0 || $("#BillingCity").val() === '*City:') {
            hideAddressFields();
            if (isMobile) {
                $("#BillingStreet").attr('placeholder', '*Address:');
                $("#BillingCity").attr('placeholder', '*City:');
                $("#BillingZip").attr('placeholder', '*Zip:');
                $("#Phone").attr('placeholder', '*Phone:');
                $("#Email").attr('placeholder', '*Email:');
            }
        }
        if ($("#ShippingCity").val().length == 0 || $("#ShippingCity").val() === '#City:') {
            hideShippingAddressFields();
            if (isMobile) {
                $("#ShippingName").attr('placeholder', '*Full Name:');
                $("#ShippingStreet").attr('placeholder', '*Address:');
                $("#ShippingCity").attr('placeholder', '*City:');
                $("#ShippingZip").attr('placeholder', '*Zip:');
            }
        }
    });

    billingInformationChecker = setInterval(checkForBillingInformation, 2000);

});


}
/*
     FILE ARCHIVED ON 02:42:24 Oct 08, 2014 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 19:29:06 Dec 19, 2023.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 83.826
  exclusion.robots: 0.122
  exclusion.robots.policy: 0.108
  cdx.remote: 0.085
  esindex: 0.012
  LoadShardBlock: 53.69 (3)
  PetaboxLoader3.datanode: 76.042 (4)
  load_resource: 77.979
  PetaboxLoader3.resolve: 48.686
*/