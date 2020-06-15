# Payments Rest API - Success Example
This sample sets the bare minimum fields to create a card (debit or credit) Payment Method and Transaction record in Salesforce and charge it. The response payload shows an example of a requests that resulted in a successful charge.


- **Method:** POST
- **Endpoint:** `{sf_domain}/services/apexrest/bt_stripe/checkout/v1/createPaymentMethod`


## Request Payload
```
{
      "action" : "createPaymentMethod",
      "paymentGatewayId" : "a0141000001jhoh",
      "email" : "someone@blackthorn.io",
      "isDefault" : true,
      "stripePayload" : "{\"id\":\"tok_19AkExDXJoGaqeOAHLrQSufI\",\"object\":\"token\",\"card\":{\"id\":\"card_19AkExDXJoGaqeOA9NDGpROK\",\"object\":\"card\",\"address_city\":null,\"address_country\":null,\"address_line1\":null,\"address_line1_check\":null,\"address_line2\":null,\"address_state\":null,\"address_zip\":null,\"address_zip_check\":null,\"brand\":\"Visa\",\"country\":\"US\",\"cvc_check\":\"unchecked\",\"dynamic_last4\":null,\"exp_month\":11,\"exp_year\":2019,\"funding\":\"credit\",\"last4\":\"4242\",\"metadata\":{},\"name\":\"sdada\",\"tokenization_method\":null},\"client_ip\":\"188.143.37.52\",\"created\":1477937435,\"livemode\":false,\"type\":\"card\",\"used\":false}"
}
```

## Response Payload
```
{
    "transactionList": null,
    "success": true,
    "scaRequired": false,
    "paypalLinks": null,
    "paymentScheduleId": null,
    "paymentMethodList": [
        {
            "transactionList": null,
            "stripePayload": null,
            "stripeId": "card_19AkExDXJoGaqeOA9NDGpROK",
            "status": "Verified",
            "publishableKey": null,
            "paymentMethodId": "a0N4T000000CSVCUA4",
            "paymentGatewayId": "a0K4T0000001NdeUAE",
            "matchByEmail": null,
            "lead": null,
            "last4": "6789",
            "holderName": "2593 ACH T2",
            "expYear": null,
            "expMonth": null,
            "errorType": null,
            "errorMessage": null,
            "errorCode": null,
            "email": null,
            "customFieldMap": null,
            "customerId": "a0W4T0000005SXvUAM",
            "contact": null,
            "brand": null,
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
    "defaultPublishableKey": "pk_test_ijs3P3CLjq7uvdyYWJc16",
    "defaultGatewayId": "a0K4T0000001NdeUAE",
    "customerList": null,
    "clientSecret": null
}
```
