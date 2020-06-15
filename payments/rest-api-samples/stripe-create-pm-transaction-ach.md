# Payments Rest API - ACH Example
This sample sets the bare minimum fields to create an ACH (Bank Account) Payment Method in Salesforce. Some Gateways require that the Bank Account is verified before a charge can be made to it so we don't create a Transaction and try to charge it in this example. The response payload shows an example of a requests that resulted in the Payment Method being created.


- **Method:** POST
- **Endpoint:** `{sf_domain}/services/apexrest/bt_stripe/checkout/v1/createPaymentMethod`


## Request Payload
```
 {
 	"action":"createPaymentMethod",
 	"paymentGatewayId":"a0K4T0000001Nde",
 	"stripePayload":"{\"id\":\"btok_us_verified\",\"bank_account\":{\"country\":\"US\",\"bank_name\":\"BANK OF AMERICA, N.A\",\"last4\":\"6789\",\"validated\":false,\"object\":\"bank_account\"},\"livemode\":true,\"type\":\"bank_account\",\"object\":\"token\",\"used\":false}",
 	"transactionList":[]
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
            "stripeId": "ba_1G8LyJD8uZr98YkldQVd7yTg",
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
