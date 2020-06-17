# Payments Rest API - ACH Example
This sample sets the bare minimum fields to create an ACH (Bank Account) Payment Method in Salesforce. Some Gateways require that the Bank Account is verified before a charge can be made to it so we don't create a Transaction and try to charge it in this example. The response payload shows an example of a requests that resulted in the Payment Method being created.


- **Method:** POST
- **Endpoint:** `{sf_domain}/services/apexrest/bt_stripe/checkout/v1/createPaymentMethod`


## Request Payload
```
 {
 	"action":"createPaymentMethodAuthNet",
 	"paymentGatewayId":"a0K4T0000002PbP",
 	"paymentMethodData": {
        "name": "test1",
        "email": "test1@abctest.com",
        "opaqueData": {
           "dataDescriptor": "COMMON.ACCEPT.INAPP.PAYMENT",
           "dataValue": "eyJjb2RlIjoiNTBfMl8wNjAwMDUzNzZDQkFBQzJFRDY0RUFCQ0VCMkU0NEQxRTc1NkI4NjJFMEQ2QjkyQkQxMjk0Qjc2OUU5RThFQzVBMjJBMUUxNEE3QTJGMzM5NTJDMzAwNEVEQUU2QzE2ODJBREYyNkQwIiwidG9rZW4iOiI5NTU5NTU5ODE2MzkxMTM2NTAzNTAyIiwidiI6IjEuMSJ9"
        }
    },
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
            "stripeId": null,
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
