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
//var paymentsRestEndpoint = 'https://fieldservicemobilepay.secure.force.com/webhooks/services/apexrest/bt_stripe/v1';

var paymentsRestEndpoint = 'http://paydev7-developer-edition.na136.force.com/gateway/services/apexrest/v1';


function sendTokenBlackthornPaymentsAPI(publicToken,example) {

	example.classList.add('submitting');

	console.log('publicToken: ' + publicToken);

	document.getElementById('example-2').style.display = 'none';
	document.getElementById('example-3').style.display = 'visible';
	// build the payload for the Payments Rest API - lots of attributes can be set here
	// we're only creating a Payment Method for the Bank Account because Stripe requires
	// the customer verify with micro deposits before the Bank Account can be charged
	var payload = {
		token : publicToken,
		email : document.getElementById('example2-email').value,
		action : "createPaymentMethodSpreedly",
		isDefault : true,
		paymentGatewayId : 'a0K4T0000003LoN'
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

Spreedly.on('ready', function(frame) {
      Spreedly.setFieldType('number', 'text');
      Spreedly.setFieldType('cvv', 'text');
    
      //Spreedly.setNumberFormat('maskedFormat');
      Spreedly.setStyle('number','padding: .65em .5em; font-size: 91%;');
      Spreedly.setStyle('cvv', 'padding: .65em .5em; font-size: 91%;');

      Spreedly.setPlaceholder("number", "Card Number");
  	  Spreedly.setPlaceholder("cvv", "CVV");
});

Spreedly.on('fieldEvent', function(name, event, activeElement, inputData) {
    Spreedly.on('fieldEvent', function(name, type, activeEl, inputProperties) {
	  if(name == "number") {
	    var numberParent = document.getElementById("spreedly-number-test");

	    if(type == "focus") { numberParent.classList .add('focused'); }
	    if(type == "blur") { numberParent.classList.remove('focused'); }
	    if(type == "input" && !inputProperties["numberValid"]) {
	      numberParent.className == "error";
	    }
	  }
	});
});

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

		//collect the data here
		var options = {};//['first_name', 'last_name', 'month', 'year']
	  	options['first_name'] = document.getElementById('example2-first-name').value;
	  	options['last_name'] = document.getElementById('example2-last-name').value;
	  	options['year'] = document.getElementById('example2-year').value;
	  	options['month'] = document.getElementById('example2-month').value;
	  	options['address1'] = document.getElementById('example2-address').value;
	  	options['city'] = document.getElementById('example2-city').value;
	  	options['state'] = document.getElementById('example2-state').value;
	  	options['zip'] = document.getElementById('example2-zip').value;
	  	//options['country'] = document.getElementById('example2-month').value;
	  	Spreedly.tokenizeCreditCard(options);
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

	 Spreedly.init();

    Spreedly.on('paymentMethod', function(token, pmData) {
    	var formClass = '.example2';
		var example = document.querySelector(formClass);
    	sendTokenBlackthornPaymentsAPI(token,example);
    });

    Spreedly.on('errors', function(errors) {
      var messageEl = document.getElementById('errors');
      var errorBorder = "1px solid red";
      for(var i = 0; i < errors.length; i++) {
        var error = errors[i];
        if(error["attribute"]) {
          var masterFormElement = document.getElementById(error["attribute"]);
          if(masterFormElement) {
            masterFormElement.style.border = errorBorder
          } else {
            Spreedly.setStyle(error["attribute"], "border: " + errorBorder + ";");
          }
        }
        messageEl.innerHTML += error["message"] + "<br/>";
      }
    });


	

	register('example2');

})();


