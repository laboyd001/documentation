# Payments Rest API - ACH Example
This sample sets the bare minimum fields to create an ACH (Bank Account) Payment Method in Salesforce. Some Gateways require that the Bank Account is verified before a charge can be made to it so we don't create a Transaction and try to charge it in this example. The response payload shows an example of a requests that resulted in the Payment Method being created.


- **Method:** POST
- **Endpoint:** `{sf_domain}/services/apexrest/bt_stripe/checkout/v1/createPaymentMethod`


## Request Payload
```
{
}
```

## Response Payload
```
{
}
```
