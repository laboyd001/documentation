# Events Checkout Rest API
The Event Checkout API can be used to create a shopping cart to capture relevant data for a custom Event checkout experience.
The Checkout API accepts cart data posted to a Rest formatted url and saves data in Salesforce as a Checkout Submission record. Cart data can also be retrieve from the api by cart key. All data is accepted and returned in JSON format. Your application must [oauth to a Salesforce org](https://help.salesforce.com/articleView?id=connected_app_create_api_integration.htm&type=5) that contains our Payments and Events packages before making calls to the API. This API can also be called from a SF Site that's setup correctly.



## Checkout Features
- Build a shopping cart application to capture item quantities for Products and Pricebook Entries in Salesforce
- Persist (save) the shopping cart as a Salesforce record so it can be retrieved by a unique key
- Accept and validate Discount Codes for the entire order
- Restrict Access to checkout based on a valid Access Code
- Capture and save Bill To and Ship To information for the Sales Document
- Pass in a Salesforce Id for Account, Contact or Lead to set on the Sales Document record for Bill To or Ship To lookups
- Relate authorized or captured Transactions as payment for the shopping cart
- Submit the shopping cart to create a Sales Document with related Line Items and Transactions in Salesforce



## Event Checkout Features
- Build a shopping cart application to capture item quantities for Event Items (tickets) in Salesforce
- Validate Event Registration Status (on sale) upon cart submit
- Validate Event Item capacity (quantity available) upon cart submit
- Save standard Attendee information on the cart that's validated (required fields) upon cart submit
- Pass in a Salesforce Id for Account, Contact or Lead to set on the Attendee record lookups
- Save customer Attendee information on the cart that will get saved on the Attendee record upon cart submit
- Save multiple Event Session Ids per Attendees that get saved as Session Attendee records upon cart submit
- Only one Attendee can be submitted per Event Item (ticket) to avoid a complex data structure



## API Calls
Here are the supported Checkout API calls.

### Save Cart
Call this endpoint to save cart data as a Checkout Submission record in Salesforce. The `cartKey` attribute in the request body determines what happens in Salesforce. If `cartKey` is blank, a values will be generated and a new record will be inserted. If `cartKey` is populated, we query for an existing Checkout Submission record and update it if found. If the record is not found, a new Checkout Submission record is created with the `cartKey` set as the 
record Key.

The save cart does not really require any data and does not do a lot of validations so you can submit as little or as much data as you want. Once the cart is saved, Item Names, Prices and Totals are calculated and returned in the response. Discount Codes are also validated if set.

- **Method:** POST
- **Endpoint:** `{sf_domain}/services/apexrest/bt_stripe/checkout/v1/cart/save`
- **Request Body Payload:** See the API Request and Response Payload section below
- **Response Body Payload:** See the API Request and Response Payload section below


### Retrieve Cart
Call this endpoint to retrieve an existing Cart (Checkout Submission) record from Salesforce by cart key. The response returned is the output of the last valid cart save or final submit. If a record is not found for the key, an error is returned.

- **Method:** GET
- **Endpoint:** `{sf_domain}/services/apexrest/bt_stripe/checkout/v1/cart/retrieve?key={cartKey}`
- **Request Body Payload:** None - just set the `key` parameter on the request url
- **Response Body Payload:** See the API Request and Response Payload section below


### Submit Cart
Call this endpoint to do a final submit of cart data to generate a new Sales Document (Blackthorn Invoice) record, Line Item records and update the Checkout Submission record as Complete in Salesforce. Once the Checkout Submission record is complete, it cannot be saved or submitted again. If Transaction Id(s) are submitted on the cart, the Transactions are associated to the Sales Document to update the Payment Status and determine the Balance Due. There is additional logic to process Transaction(s) that are only authorized and not yet captured.

- **Method:** POST
- **Endpoint:** `{sf_domain}/services/apexrest/bt_stripe/checkout/v1/cart/submit`
- **Request Body Payload:** See the API Request and Response Payload section below
- **Response Body Payload:** See the API Request and Response Payload section below


## Errors
The API will return a Status Code = 400 or 500 depending on the error type:
- **400** - Returned if error is caused by invalid or missing attributes or from validation checks.
- **500** - Returned if error is caused by an unexpected server error such as null pointer or database exception.

For either of these codes, the response body will contain only an error attribute:
`{"error" : "This is what went wrong."}`

If there is an error in a request for the `Save Cart` or `Retrieve Cart` api call, we do not created or updated records in Salesforce. If there is a validation error for the `Submit Cart` api call, we also do not create or update records in Salesforce. But if there is an unexpected error in the request for the `Submit Cart` api call while trying to create a Sales Document and Line Item records, we update the Checkout Submission record in Salesforce with the request Input Payload along with the error. But we roll back any inserts or updates around the Sales Document, Line Items and Transaction.


## API Request and Response Payload

JSON Attribute | Section | Required? | Type | Details
----- | ----- | ----- | ----- | -----
cartKey | root | On Submit | String | 
eventId | root | On Submit | String | 
transactionIds | root | No | String Array | 
authenticatedAccountId | root | No | String | 
salesDocument | root | No | Sales Document | 
promoCode | salesDocument | No | String | 
currencyCode | salesDocument | No | String | 
paymentTerm | salesDocument | No | String | 
paymentGatewayId | salesDocument | No | String | 
billTo | salesDocument | No | Bill To | 
shipTo | salesDocument | No | Ship To | 
items | salesDocument | No | Item Array | 



## Sample Cart Save Request Payload
```
{
  "cartKey" : "u_can_set_this_or_it_will_be_generated",
  "eventId" : "a1Q0b0000084YgiEAE",
  "transactionIds" : null,
  "authenticatedAccountId" : null,
  "salesDocument" : {
    "promoCode" : "25_DOL_OFF",
    "currencyCode" : "USD",
    "paymentTerm" : "Net 30",
    "paymentGatewayId" : "a0C0b00000UbO5FEAV",
    "billTo" : {
      "firstName" : "Cui",
      "lastName" : "John",
      "phone" : "808-555-1234",
      "email" : "jc@blackthorn.io",
      "company" : "Blackthorn",
      "title" : "VP of Sales",
      "relatedId" : null,
      "street" : "1060 W Addison Ave",
      "city" : "Chicago",
      "state" : "IL",
      "postalCode" : "62626",
      "country" : "USA"
    },
    "shipTo" : {
      "firstName" : "Cui",
      "lastName" : "John",
      "phone" : "808-555-1234",
      "email" : "jc@blackthorn.io",
      "company" : "Blackthorn",
      "title" : "VP of Sales",
      "relatedId" : null,
      "street" : "1060 W Addison Ave",
      "city" : "Chicago",
      "state" : "IL",
      "postalCode" : "62626",
      "country" : "USA"
    },
    "items" : [ {
      "quantity" : 1,
      "eventItemId" : "a1N0b000009YwGtEAK",
      "attendee" : {
        "attendeeKey" : "u_can_set_this_or_it_will_be_generated",
        "firstName" : "Sally",
        "lastName" : "Uno",
        "salutation" : "Ms",
        "company" : "Blackthorn",
        "title" : "Marketing Mgr",
        "email" : "sally@yahoo.com",
        "emailOptIn" : true,
        "phone" : "808-456-7890",
        "dietaryPreference" : null,
        "relatedId" : null,
        "street" : "100 Main St",
        "city" : "Denver",
        "state" : "CO",
        "postalCode" : "80214",
        "country" : "USA",
        "sessionIds" : [
          "a1c0b0000061PEUAA2",
          "a1c0b0000061PEZAA2"
        ]
      }
    }, {
      "quantity" : 1,
      "eventItemId" : "a1N0b000009YwH3EAK",
      "attendee" : {
        "attendeeKey" : null,
        "firstName" : "John",
        "lastName" : "Dos",
        "salutation" : "Mr",
        "company" : "Blackthorn",
        "title" : "Director of Ops",
        "email" : null,
        "emailOptIn" : false,
        "phone" : null,
        "dietaryPreference" : "Vegan",
        "relatedId" : null,
        "street" : "2800 Gray St",
        "city" : "Wheat Ridge",
        "state" : "FL",
        "postalCode" : "20202",
        "country" : "USA",
        "sessionIds" : [
          "a1c0b0000061PEUAA2",
          "a1c0b0000061PEZAA2"
        ]
      }
    } ]
  }
}
```
