'use strict';
/*
get this value from the Payment Gateway - Plaid Public Key.
It will be different for test and live Payment Gateways.
*/
var publishableKey = 'ac74fa22c24ef930a371dcdb50e451';



/*
This is setup to submit to a Salesforce Site. The recommended approach is to oauth to Salesforce
and call our Payments Rest API as an authenticated user. It adds an extra layer of security to
your checkout.

If you oauth to Salesforce, your endpoint will be: <SF_DOMAIN>/services/apexrest/bt_stripe/v1
*/
var paymentsRestEndpoint = 'https://fieldservicemobilepay.secure.force.com/webhooks/services/apexrest/bt_stripe/v1';

//var paymentsRestEndpoint = 'http://paydev7-developer-edition.na136.force.com/gateway/services/apexrest/v1';


function sendTokenBlackthornPaymentsAPI(publicToken,accountId,example) {

	example.classList.add('submitting');

	console.log('publicToken: ' + publicToken);

	document.getElementById('example-2').style.display = 'none';
	document.getElementById('example-3').style.display = 'visible';
	// build the payload for the Payments Rest API - lots of attributes can be set here
	// we're only creating a Payment Method for the Bank Account because Stripe requires
	// the customer verify with micro deposits before the Bank Account can be charged
	var payload = {
		plaidPublicToken : publicToken,
		plaidAccountId : accountId,
		email : document.getElementById('example2-email').value,
		action : "createPaymentMethod",
		isDefault : true,
		publishableKey : publishableKey
	};


	// this makes a rest call to our Payments API - feel free to use JQuery to make this call
	var xhr = new XMLHttpRequest(); // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
	xhr.open('POST', paymentsRestEndpoint);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onload = function() {
		document.getElementById('example-3').style.display = 'none';
		document.getElementById('example-2').style.display = '';
		if (xhr.status === 200) {
			console.log('paymentsRestAPIResponse: ' + xhr.responseText);

			var response = JSON.parse(xhr.responseText);
			console.log('response.success: ' + response.success);
			var msg;
			if (response.success == true) { // see if success
				msg = 'Blackthorn Payments API create a Payment Method: ' + response.paymentMethodList[0].paymentMethodId;
			} else {
				msg = 'Error from Blackthorn Payments Rest API: ' + response.errorMessage;
			}

			document.getElementById('salesforce_message').innerText = msg;

			// Stop loading!
			example.classList.remove('submitting');
	
			// todo: figure out how to show error below form instead of on success page
			example.classList.add('submitted');
			
		}
	};
	xhr.send(JSON.stringify(payload));
}

function register(exampleName) {
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

	var linkHandler = Plaid.create({
	  	env: 'sandbox',
	 	clientName: 'Blackthorn Payments',
	  	key: 'ac74fa22c24ef930a371dcdb50e451',
	  	product: ['auth'],
	  	selectAccount: true,
		onSuccess: function(public_token, metadata) {
		    // Send the public_token and account ID to your app server.
		    console.log('public_token: ' + public_token);
		    console.log('account ID: ' + metadata.account_id);

		    sendTokenBlackthornPaymentsAPI(public_token, metadata.account_id,example);
		},
	  	onExit: function(err, metadata) {
	    	// The user exited the Link flow.
	    	if (err != null) {
	      		// The user encountered a Plaid API error prior to exiting.
	    	}
	  	},
	});

	// Trigger the Link UI
	document.getElementById('pay_button').onclick = function() {
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

		disableInputs();

	  	linkHandler.open();
	};

	
}


(function() {
	'use strict';

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


	

	register('example2');

	




})();


