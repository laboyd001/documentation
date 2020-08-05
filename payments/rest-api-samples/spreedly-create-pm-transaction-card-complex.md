# Spreedly Payments Rest API - Complex Example
This sample shows a wide set of request payload attributes that an be set and to create a card (debit or credit) Payment Method and Transaction record in Salesforce and charge it. The additional attributes being set in the request payload will get set on the Payment Method or Transaction record that get created in Salesforce. The response payload shows an example of a requests that resulted in a successful charge.


- **Method:** POST
- **Endpoint:** `{sf_domain}/services/apexrest/bt_stripe/v1`


## Request Payload
```
{
    "action" : "createPaymentMethodSpreedly",
    "paymentGatewayId" : "a0K4T0000001Nde",
    "email" : "someone@blackthorn.io",
    "isDefault" : true,
    "contactId" : "0034T000006AuEz",
    "accountId" : "0014T00000470Si",
    "addressStreet":"test street",
    "addressCity":"New York",
    "addressState":"New York",
    "addressCountry":"USA",
    "addressPostalCode":"11022"
    "transactionList": [
	    {
	        "amount": 100,
	        "dueDate": "2021-12-31",
            "openOnly": true,
            "account" : { "id" : "0014T00000470Si" }
	    },
	    {
	        "amount": 100,
            "authOnly": true,
            "contact" : { "id" : "0034T000006AuEz" }
	    },
	    {
	        "amount": 100,
            "contact" : { "id" : "0034T000006AuEz" }
	    }
    ],
    "token" : "MyqAcmraqhTGOAyVTM6qGJAjInN"
}
```

## Response Payload
```
{
    "transactionList": [
        {
            "transactionStatus": "Open",
            "transactionSource": null,
            "transactionId": "a0d4T000001RI6IQAW",
            "refundAmount": null,
            "publishableKey": null,
            "processedDate": null,
            "paymentStatus": null,
            "paymentMethodId": "a0N4T000000ovgQUAQ",
            "paymentMethod": null,
            "paymentGatewayId": "a0K4T0000001NdeUAE",
            "openOnly": true,
            "name": null,
            "lead": null,
            "forceCapture": null,
            "errorMessage": null,
            "dueDate": "2021-12-31",
            "description": null,
            "customFieldMap_p": null,
            "currencyISO": "USD",
            "contact": null,
            "authOnly": false,
            "amount": 100,
            "account": null
        },
        {
            "transactionStatus": "Completed",
            "transactionSource": null,
            "transactionId": "a0d4T000001RI6JQAW",
            "refundAmount": null,
            "publishableKey": null,
            "processedDate": "2020-06-15T17:53:36.000Z",
            "paymentStatus": "Authorized",
            "paymentMethodId": "a0N4T000000ovgQUAQ",
            "paymentMethod": null,
            "paymentGatewayId": "a0K4T0000001NdeUAE",
            "openOnly": false,
            "name": null,
            "lead": null,
            "forceCapture": null,
            "errorMessage": null,
            "dueDate": null,
            "description": null,
            "customFieldMap_p": null,
            "currencyISO": "USD",
            "contact": null,
            "authOnly": true,
            "amount": 100,
            "account": null
        },
        {
            "transactionStatus": "Completed",
            "transactionSource": null,
            "transactionId": "a0d4T000001RI6KQAW",
            "refundAmount": null,
            "publishableKey": null,
            "processedDate": "2020-06-15T17:53:37.000Z",
            "paymentStatus": "Captured",
            "paymentMethodId": "a0N4T000000ovgQUAQ",
            "paymentMethod": null,
            "paymentGatewayId": "a0K4T0000001NdeUAE",
            "openOnly": false,
            "name": null,
            "lead": null,
            "forceCapture": null,
            "errorMessage": null,
            "dueDate": null,
            "description": null,
            "customFieldMap_p": null,
            "currencyISO": "USD",
            "contact": null,
            "authOnly": false,
            "amount": 100,
            "account": null
        }
    ],
    "success": true,
    "scaRequired": false,
    "paypalLinks": null,
    "paymentScheduleId": null,
    "paymentMethodList": [
        {
            "transactionList": null,
            "stripePayload": null,
            "stripeId": "MyqAcmraqhTGOAyVTM6qGJAjInN",
            "status": "Valid",
            "publishableKey": null,
            "paymentMethodId": "a0N4T000000p2RBUAY",
            "paymentGatewayId": "a0K4T0000003SyXUAU",
            "matchByEmail": null,
            "lead": null,
            "last4": "4444",
            "holderName": "StripeTest Trial1",
            "expYear": "2021",
            "expMonth": "11",
            "errorType": null,
            "errorMessage": null,
            "errorCode": null,
            "email": null,
            "customFieldMap": null,
            "customerId": null,
            "contact": null,
            "brand": "master",
            "addressStreet": null,
            "addressState": null,
            "addressPostalCode": null,
            "addressCountry": null,
            "addressCity": null,
            "account": null
        }
    ],
    "errorParam": null,
    "errorMessage": null,
    "defaultPublishableKey": "pk_test_ijs3P3CLjq7uvdyYWJc16MSm00newxHxIE",
    "defaultGatewayId": "a0K4T0000001NdeUAE",
    "customerList": null,
    "clientSecret": null
}
```
