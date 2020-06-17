# Payments Rest API - Complex Example
This sample shows a wide set of request payload attributes that an be set and to create a card (debit or credit) Payment Method and Transaction record in Salesforce and charge it. The additional attributes being set in the request payload will get set on the Payment Method or Transaction record that get created in Salesforce. The response payload shows an example of a requests that resulted in a successful charge.


- **Method:** POST
- **Endpoint:** `{sf_domain}/services/apexrest/bt_stripe/checkout/v1/createPaymentMethod`


## Request Payload
```
{
    "action" : "createPaymentMethod",
    "paymentGatewayId" : "a0K4T0000001Nde",
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
    "paymentMethodData": {
        "name": "someone3",
        "email": "someone3@blackthorn.io",
        "opaqueData": {
           "dataDescriptor": "COMMON.ACCEPT.INAPP.PAYMENT",
           "dataValue": "eyJjb2RlIjoiNTBfMl8wNjAwMDUzNzZDQkFBQzJFRDY0RUFCQ0VCMkU0NEQxRTc1NkI4NjJFMEQ2QjkyQkQxMjk0Qjc2OUU5RThFQzVBMjJBMUUxNEE3QTJGMzM5NTJDMzAwNEVEQUU2QzE2ODJBREYyNkQwIiwidG9rZW4iOiI5NTU5NTU5ODE2MzkxMTM2NTAzNTAyIiwidiI6IjEuMSJ9"
        }
    }
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
            "stripeId": null,
            "status": "Valid",
            "publishableKey": null,
            "paymentMethodId": "a0N4T000000ovgQUAQ",
            "paymentGatewayId": "a0K4T0000001NdeUAE",
            "matchByEmail": null,
            "lead": null,
            "last4": "4242",
            "holderName": "sdada",
            "expYear": "2021",
            "expMonth": "6",
            "errorType": null,
            "errorMessage": null,
            "errorCode": null,
            "email": "someone@blackthorn.io",
            "customFieldMap": null,
            "customerId": "a0W4T0000006GkjUAE",
            "contact": {
                "salutation": "Ms.",
                "otherStreet": null,
                "otherState": null,
                "otherPostalCode": null,
                "otherCountry": null,
                "otherCity": null,
                "name": "Jane Grey",
                "mailingStreet": "888 N Euclid \nHallis Center, Room 501\nTucson, AZ 85721\nUnited States",
                "mailingState": null,
                "mailingPostalCode": null,
                "mailingCountry": null,
                "mailingCity": null,
                "lastName": "Grey",
                "id": "0034T000006AuEzQAK",
                "firstName": "Jane",
                "email": "jane_gray@uoa.edu",
                "accountId": "0014T00000470SiQAI"
            },
            "brand": "Visa",
            "addressStreet": "",
            "addressState": null,
            "addressPostalCode": null,
            "addressCountry": null,
            "addressCity": null,
            "account": {
                "shippingStreet": "888 N Euclid \nHallis Center, Room 501\nTucson, AZ 85721\nUnited States",
                "shippingState": null,
                "shippingPostalCode": null,
                "shippingCountry": null,
                "shippingCity": null,
                "phone": "(520) 773-9050",
                "name": "University of Arizona",
                "id": "0014T00000470SiQAI",
                "billingStreet": "888 N Euclid \nHallis Center, Room 501\nTucson, AZ 85721\nUnited States",
                "billingState": "AZ",
                "billingPostalCode": null,
                "billingCountry": null,
                "billingCity": "Tucson"
            }
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
