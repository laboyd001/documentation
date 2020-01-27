'use strict';
/*
get this value from the Payment Gateway - Gateway Public Key field.
It will be different for test and live Payment Gateways.
*/
var publicClientKey = '7Qj4j9d5cmAQ3gZdy5qF4TJb54ME5twRYJ2DnRD27eQj29kY4Jh9c8ZXSX8DXqdX';
var apiLoginID = '3KPxu628Zq';

var amountToCharge = 10.75;

// changing button to show amount to charge
document.getElementById('pay_button').innerHTML = 'Pay $' + amountToCharge;

/*
This is setup to submit to a Salesforce Site. The recommended approach is to oauth to Salesforce
and call our Payments Rest API as an authenticated user. It adds an extra layer of security to
your checkout.

If you oauth to Salesforce, your endpoint will be: <SF_DOMAIN>/services/apexrest/bt_stripe/v1
*/
var paymentsRestEndpoint = 'https://fieldservicemobilepay.secure.force.com/webhooks/services/apexrest/bt_stripe/v1';

function sendPaymentDataToAnet(exampleName) {
	var formClass = '.' + exampleName;
	var example = document.querySelector(formClass);

	var form = example.querySelector('form');
	var resetButton = example.querySelector('a.reset');
	var error = form.querySelector('.error');
	var errorMessage = error.querySelector('.message');

	function enableInputs() {
		Array.prototype.forEach.call(
			form.querySelectorAll(
				"input[type='text'], input[type='email'], input[type='tel']"
			),
			function(input) {
				input.removeAttribute('disabled');
			}
		);
	}

	function disableInputs() {
		Array.prototype.forEach.call(
			form.querySelectorAll(
				"input[type='text'], input[type='email'], input[type='tel']"
			),
			function(input) {
				input.setAttribute('disabled', 'true');
			}
		);
	}

	function triggerBrowserValidation() {
		// The only way to trigger HTML5 form validation UI is to fake a user submit event
		var submit = document.createElement('input');
		submit.type = 'submit';
		submit.style.display = 'none';
		form.appendChild(submit);
		submit.click();
		submit.remove();
	}

	// Listen on the form's 'submit' handler - here's where all the magic happens
	form.addEventListener('submit', function(e) {
		e.preventDefault();

		// Trigger HTML5 validation UI on the form if any of the inputs fail validation
		var plainInputsValid = true;
		Array.prototype.forEach.call(form.querySelectorAll('input'), function(input) {
			if (input.checkValidity && !input.checkValidity()) {
				plainInputsValid = false;
				return;
			}
		});
		if (!plainInputsValid) {
			triggerBrowserValidation();
			return;
		}

		// Show a loading screen...
		example.classList.add('submitting');

		// Disable all inputs.
		disableInputs();
	});
}

	function sendDataToAuthNet() {
		var formClass = '.' + 'example2';
		var example = document.querySelector(formClass);
	
		var form = example.querySelector('form');
		var resetButton = example.querySelector('a.reset');
		var error = form.querySelector('.error');
		var errorMessage = error.querySelector('.message');
		var authData = {};
			authData.clientKey = publicClientKey;
			authData.apiLoginID = apiLoginID;
	
		var cardData = {};
			var cc = form.querySelector('#' + 'example2' + '-card-number').value;
			cardData.cardNumber = cc.replace(' '/g, '');
			var cardExpiry = form.querySelector('#' + 'example2' + '-card-expiry').value;
			var	cardArray = cardExpiry.toString().split('/');
			cardData.month = cardArray[0];
			cardData.year = cardArray[1];
			cardData.cardCode = form.querySelector('#' + 'example2' + '-card-cvc').value;
			console.log('cardData ===> ' + JSON.stringify(cardData));
	
		var secureData = {};
			secureData.authData = authData;
			secureData.cardData = cardData;
	
		Accept.dispatchData(secureData, 'responseHandler');
	}

	function responseHandler(response) {
		var formClass = '.' + 'example2';
		var example = document.querySelector(formClass);
		var form = example.querySelector('form');
		var example = document.querySelector(formClass);
		if (response.messages.resultCode === "Error") {
			var i = 0;
			while (i < response.messages.message.length) {
				console.log(
					response.messages.message[i].code + ": " +
					response.messages.message[i].text
				);
				i = i + 1;
			}
		} else {
			var name = form.querySelector('#' + 'example2' + '-name');
			var email = form.querySelector('#' + 'example2' + '-email');
		var additionalData = {
			name: name ? name.value : undefined,
			email: email ? email.value : undefined,
			opaqueData: response.opaqueData
		};
			sendTokenBlackthornPaymentsAPI(additionalData, example);
		}
	}



	function sendTokenBlackthornPaymentsAPI(additionalData, example) {
		console.log('additionalData: ' + JSON.stringify(additionalData));

		// build the payload for the Payments Rest API - lots of attributes can be set here
		// TODO: document some other sample payload for passing in additional data
		var payload = {
			paymentMethodData : additionalData,
			action : "createPaymentMethodAuthNet",
			isDefault : true,
			paymentGatewayId: "a0C0b00000XDp7MEAT",
			transactionList : [
				{
					"amount" : amountToCharge
				}
			]
		};

		// this makes a rest call to our Payments API - feel free to use JQuery to make this call
		var xhr = new XMLHttpRequest(); // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
		xhr.open('POST', paymentsRestEndpoint);
		xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.onload = function() {
				if (xhr.status === 200) {
					console.log('paymentsRestAPIResponse: ' + xhr.responseText);
	
					var response = JSON.parse(xhr.responseText);
					console.log('response.success: ' + response.success);
					var msg;
					if (response.success == true) { // see if success
						msg = 'Blackthorn Payments API charged $' + amountToCharge + ' on the card and created Transaction: ';
						msg += response.transactionList[0].transactionId + ' and Payment Method: ';
						msg += response.transactionList[0].paymentMethodId;
					} else {
						msg = 'Error from Blackthorn Payments Rest API: ' + response.errorMessage;
					}
					alert(msg);
	
					document.getElementById('salesforce_message').innerText = msg;
	
					// Stop loading!
					example.classList.remove('submitting');
	
					// todo: figure out how to show error below form instead of on success page
					example.classList.add('submitted');
				}
			};
			var jsn = JSON.stringify(payload);
			xhr.send(jsn.replace(/\\/g, ""));
	}

(function() {
	'use strict';

//	var elements = stripe.elements();

	// Floating labels
	var inputs = document.querySelectorAll('.cell.example.example2 .input');
	Array.prototype.forEach.call(inputs, function(input) {
		input.addEventListener('focus', function() {
			input.classList.add('focused');
		});
		input.addEventListener('blur', function() {
			input.classList.remove('focused');
		});
		input.addEventListener('keyup', function() {
			if (input.value.length === 0) {
				input.classList.add('empty');
			} else {
				input.classList.remove('empty');
			}
			document.getElementById('example2-card-number').value = cc_format(document.getElementById('example2-card-number').value);
			document.getElementById('example2-card-expiry').value = cc_expiryMonthAndYear (document.getElementById('example2-card-expiry').value);
		});
	});

	sendPaymentDataToAnet('example2');
})();

function cc_format(value) {
	var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
	var matches = v.match(/\d{4,16}/g);
	var match = matches && matches[0] || ''
	var parts = []
	for (var i=0, len=match.length; i<len; i+=4) {
	  parts.push(match.substring(i, i+4))
	}
	if (parts.length) {
	  return parts.join(' ')
	} else {
	  return value
	}
  }

  function cc_expiryMonthAndYear(value) {
	var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
	var matches = v.match(/\d{2,4}/g);
	var match = matches && matches[0] || ''
	var parts = []
	for (var i=0, len=match.length; i<len; i+=2) {
	  parts.push(match.substring(i, i+2))
	}
	if (parts.length) {
	  return parts.join('/')
	} else {
	  return value
	}
  }