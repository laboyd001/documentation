/*
get this value from the Payment Gateway - Gateway Public Key field.
It will be different for test and live Payment Gateways.
*/
var publishableKey = 'pk_test_JaW3gRm7yo57hInDNH4mREYR00JgVjOstq';
var stripe = Stripe(publishableKey);

var amountToCharge = 19.75;

/*
This is setup to submit to a Salesforce Site. The recommended approach is to oauth to Salesforce
and call our Payments Rest API as an authenticated user. It adds an extra layer of security to
your checkout.

If you oauth to Salesforce, your endpoint will be: <SF_DOMAIN>/services/apexrest/bt_stripe/v1
*/
var paymentsRestEndpoint = 'https://fieldservicemobilepay.secure.force.com/webhooks/services/apexrest/bt_stripe/v1';

(function() {
	'use strict';

	var elements = stripe.elements();

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
		});
	});

	var elementStyles = {
		base: {
			color: '#32325D',
			fontWeight: 500,
			fontFamily: 'monospace, sans-serif',
			fontSize: '16px',
			fontSmoothing: 'antialiased',

			'::placeholder': {
				color: '#CFD7DF',
			},
			':-webkit-autofill': {
				color: '#e39f48',
			},
		},
		invalid: {
			color: '#E25950',
			'::placeholder': {
				color: '#FFCCA5',
			},
		},
	};

	var elementClasses = {
		focus: 'focused',
		empty: 'empty',
		invalid: 'invalid',
	};

	var cardNumber = elements.create('cardNumber', {
		style: elementStyles,
		classes: elementClasses,
	});
	cardNumber.mount('#example2-card-number');

	var cardExpiry = elements.create('cardExpiry', {
		style: elementStyles,
		classes: elementClasses,
	});
	cardExpiry.mount('#example2-card-expiry');

	var cardCvc = elements.create('cardCvc', {
		style: elementStyles,
		classes: elementClasses,
	});
	cardCvc.mount('#example2-card-cvc');

	registerElements([cardNumber, cardExpiry, cardCvc], 'example2');

	// changing button to show amount to charge
	document.getElementById('pay_button').innerHTML = 'Pay $' + amountToCharge;
})();


function registerElements(elements, exampleName) {
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

	// Listen for errors from each Element, and show error messages in the UI.
	var savedErrors = {};
	elements.forEach(function(element, idx) {
		element.on('change', function(event) {
			if (event.error) {
				error.classList.add('visible');
				savedErrors[idx] = event.error.message;
				errorMessage.innerText = event.error.message;
			} else {
				savedErrors[idx] = null;

				// Loop over the saved errors and find the first one, if any.
				var nextError = Object.keys(savedErrors)
				.sort()
				.reduce(function(maybeFoundError, key) {
					return maybeFoundError || savedErrors[key];
				}, null);

				if (nextError) {
					// Now that they've fixed the current error, show another one.
					errorMessage.innerText = nextError;
				} else {
					// The user fixed the last error; no more errors.
					error.classList.remove('visible');
				}
			}
		});
	});

	resetButton.addEventListener('click', function(e) {
		e.preventDefault();
		// Resetting the form (instead of setting the value to `''` for each input)
		// helps us clear webkit autofill styles.
		form.reset();

		// Clear each Element.
		elements.forEach(function(element) {
			element.clear();
		});

		// Reset error state as well.
		error.classList.remove('visible');

		// Resetting the form does not un-disable inputs, so we need to do it separately:
		enableInputs();
		example.classList.remove('submitted');
	});

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

		// Gather additional customer data we may have collected in our form.
		var name = form.querySelector('#' + exampleName + '-name');
		var email = form.querySelector('#' + exampleName + '-email');
		var address1 = form.querySelector('#' + exampleName + '-address');
		var city = form.querySelector('#' + exampleName + '-city');
		var state = form.querySelector('#' + exampleName + '-state');
		var zip = form.querySelector('#' + exampleName + '-zip');
		var additionalData = {
			name: name ? name.value : undefined,
			email: email ? email.value : undefined,
			address_line1: address1 ? address1.value : undefined,
			address_city: city ? city.value : undefined,
			address_state: state ? state.value : undefined,
			address_zip: zip ? zip.value : undefined,
		};

		// Use Stripe.js to create a token. We only need to pass in one Element
		// from the Element group in order to create a token. We can also pass
		// in the additional customer data we collected in our form.
		stripe.createToken(elements[0], additionalData).then(function(result) {

			if (result.token) {
				// If we received a token, show the token ID
				example.querySelector('.token').innerText = result.token.id;

				// here's where we call the Blackthorn Payments Rest API
				sendTokenBlackthornPaymentsAPI(result.token);
			} else {
				// Otherwise, un-disable inputs.
				enableInputs();
			}
		});
	});
}

function sendTokenBlackthornPaymentsAPI(stripeToken) {
	console.log('stripeToken: ' + JSON.stringify(stripeToken));

	// build the payload for the Payments Rest API - lots of attributes can be set here
	// TODO: document some other sample payload for passing in additional data
	var payload = {
		stripePayload : JSON.stringify(stripeToken),
		action : "createPaymentMethod",
		isDefault : true,
		publishableKey : publishableKey,
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
			console.log('xhr.response.success: ' + xhr.response.success);
			var msg;
			if (xhr.response.success == true) { // see if success
				console.log('xhr.response.paymentMethodList: ' + xhr.response.paymentMethodList);
				console.log('xhr.response.transactionList: ' + xhr.response.transactionList);
				msg = 'Blackthorn Payments API charged $' + amountToCharge + ' on the card and created Transaction: ';
	//			msg += xhr.response.transactionList[0].transactionId;
			} else {
				msg = 'Error from Blackthorn Payments Rest API: ' + xhr.response.errorMessage;
			}

			document.getElementById('salesforce_message').innerText = msg;

			// Stop loading!
			example.classList.remove('submitting');
			example.classList.add('submitted');
		}
	};
	xhr.send(JSON.stringify(payload));
}
