# Payments Rest API - Error Example
This sample sets the bare minimum fields to create a card (debit or credit) Payment Method and Transaction record in Salesforce and charge it. The response payload shows an example of a requests that resulted in a error and an un-successful charge.


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
    "success": false,
    "scaRequired": false,
    "paypalLinks": null,
    "paymentScheduleId": null,
    "paymentMethodList": [
        {
            "transactionList": null,
            "stripePayload": null,
            "stripeId": null,
            "status": "Invalid",
            "publishableKey": null,
            "paymentMethodId": "a0N4T000000owJnUAI",
            "paymentGatewayId": "a0K4T0000002PbPUAU",
            "matchByEmail": null,
            "lead": null,
            "last4": null,
            "holderName": "test1",
            "expYear": null,
            "expMonth": null,
            "errorType": null,
            "errorMessage": "Invalid OTS Token.",
            "errorCode": "E00114",
            "email": "test1@abctest.com",
            "customFieldMap": null,
            "customerId": null,
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
    "errorMessage": "Invalid OTS Token.",
    "defaultPublishableKey": "pk_test_ijs3P3CLjq7uvdyYWJc16MSm00newxHxIE",
    "defaultGatewayId": "a0K4T0000001NdeUAE",
    "customerList": null,
    "clientSecret": null
}
```
