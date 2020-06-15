# Payments Rest API - Complex Example
This sample shows a wide set of request payload attributes that an be set and to create a card (debit or credit) Payment Method and Transaction record in Salesforce and charge it. The additional attributes being set in the request payload will get set on the Payment Method or Transaction record that get created in Salesforce. The response payload shows an example of a requests that resulted in a successful charge.


- **Method:** POST
- **Endpoint:** `{sf_domain}/services/apexrest/bt_stripe/checkout/v1/createPaymentMethod`


## Request Payload
```
{
    "action" : "createPaymentMethod",
    "paymentGatewayId" : "a0141000001jhoh",
    "email" : "someone@blackthorn.io",
    "isDefault" : true,
    "contactId" : "0034T000006AuEz",
     "accountId" : "0014T00000470Si",
    "transactionList": [
	    {
	        "amount": 100,
	        "dueDate": "2019-12-31",
            "openOnly": true,
            "account" : { "id" : "0014T00000470Si" }
	    },
	    {
            "transactionId" : "a0X2D000000RkXX",
            "amount" : 100,
            "description : "My updated description",
            "contact" : { "id" : "0034T000006AuEz" }
        },
        {
        	"amount": 200,
        }
    ],
    "stripePayload" : "{\"id\":\"tok_19AkExDXJoGaqeOAHLrQSufI\",\"object\":\"token\",\"card\":{\"id\":\"card_19AkExDXJoGaqeOA9NDGpROK\",\"object\":\"card\",\"address_city\":null,\"address_country\":null,\"address_line1\":null,\"address_line1_check\":null,\"address_line2\":null,\"address_state\":null,\"address_zip\":null,\"address_zip_check\":null,\"brand\":\"Visa\",\"country\":\"US\",\"cvc_check\":\"unchecked\",\"dynamic_last4\":null,\"exp_month\":11,\"exp_year\":2019,\"funding\":\"credit\",\"last4\":\"4242\",\"metadata\":{},\"name\":\"sdada\",\"tokenization_method\":null},\"client_ip\":\"188.143.37.52\",\"created\":1477937435,\"livemode\":false,\"type\":\"card\",\"used\":false}"
}
```

## Response Payload
```
{
    "transactionList": [
        {
            "transactionStatus": "Completed",
            "transactionId": "a083600000Gn5rlAAB",
            "refundAmount": null,
            "paymentStatus": "Authorized",
            "paymentMethodId": "a013600000Ij3BfAAJ",
            "paymentGatewayId": "a003600000AjOeLAAV",
            "openOnly": false,
            "errorMessage": null,
            "dueDate": "2019-01-01",
            "customFieldMap": null,
            "authOnly": true,
            "amount": 200
        },
        {
            "transactionStatus": "Open",
            "transactionId": "a083600000Gn5rmAAB",
            "refundAmount": null,
            "paymentStatus": null,
            "paymentMethodId": "a013600000Ij3BfAAJ",
            "paymentGatewayId": "a003600000AjOeLAAV",
            "openOnly": true,
            "errorMessage": null,
            "dueDate": "2019-03-03",
            "customFieldMap": null,
            "authOnly": false,
            "amount": 55
        },
        {
            "transactionStatus": "Completed",
            "transactionId": "a083600000Gn5rnAAB",
            "refundAmount": null,
            "paymentStatus": "Captured",
            "paymentMethodId": "a013600000Ij3BfAAJ",
            "paymentGatewayId": "a003600000AjOeLAAV",
            "openOnly": false,
            "errorMessage": null,
            "dueDate": null,
            "customFieldMap": null,
            "authOnly": false,
            "amount": 77
        }
    ],
    "success": true,
    "paymentMethodList": [
        {
            "transactionList": null,
            "stripePayload": null,
            "status": "Valid",
            "publishableKey": null,
            "paymentMethodId": "a013600000Ij3BfAAJ",
            "paymentGatewayId": "a003600000AjOeLAAV",
            "matchByEmail": null,
            "last4": "4242",
            "holderName": "Holder Maki",
            "expYear": "2019",
            "expMonth": "5",
            "email": null,
            "customFieldMap": null,
            "customerId": "a053600000HbMpUAAV",
            "contactId": null,
            "brand": "Visa",
            "addressStreet": "Add l. 1",
            "addressPostalCode": "1234",
            "addressCountry": "Hungary",
            "addressCity": "Budapest",
            "accountId": null
        }
    ],
    "errorParam": null,
    "errorMessage": null,
    "customerList": null
}
```
