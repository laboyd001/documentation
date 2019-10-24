# Checkout Rest API
The Checkout API can be used to create a shopping cart to capture relevant data for a custom checkout experience. If you want to do an Event specific shopping cart, you'll want to use our [Event Checkout Rest API](../events/events_checkout_api.md). The Checkout API accepts cart data posted to a Rest formatted url and saves data in Salesforce as a Checkout Submission record. Cart data can also be retrieve from the api by cart key. All data is accepted and returned in JSON format. Your application must [oauth to a Salesforce org](https://help.salesforce.com/articleView?id=connected_app_create_api_integration.htm&type=5) that contains our Payments package before making calls to the API. This API can also be called from a SF Site that's setup correctly.



## Features
- Build a shopping cart application to capture item quantities for Products and Pricebook Entries in Salesforce
- Persist (save) the shopping cart as a Salesforce record so it can be retrieved by a unique key
- Accept and validate Discount Codes for the entire order
- Restrict Access to checkout based on a valid Access Code
- Capture and save Bill To and Ship To information for the Sales Document
- Pass in a Salesforce Id for Account, Contact or Lead to associate the Bill To or Ship To lookups on Sales Document to existing records
- Relate authorized or captured Transactions as payment for the shopping cart
- Submit the shopping cart to create a Sales Document with related Line Items and Transactions in Salesforce



## API Calls
Here are the supported Checkout API calls.

### Save Cart
Call this endpoint to save cart data as a Checkout Submission record in Salesforce. The `cartKey` attribute in the request body determines what happens in Salesforce. If `cartKey` is blank, a values will be generated and a new record will be inserted. If `cartKey` is populated, we query for an existing Checkout Submission record and update it if found. If the record is not found, a new Checkout Submission record is created with the `cartKey` set as the 
record Key.

The save cart does not really require any data and does not do a lot of validations so you can submit as little or as much data as you want. Once the cart is saved, Item Names, Prices and Totals are calculated and returned in the response. Discount Codes are also validated if set.

**Method:** POST
**Endpoint:** `{sf_domain}/services/apexrest/bt_stripe/checkout/v1/cart/save`
**Request Body Payload:** See the API Request and Response Payload section below
**Response Body Payload:** See the API Request and Response Payload section below


### Retrieve Cart
Call this endpoint to retrieve an existing Cart (Checkout Submission) record from Salesforce by cart key. The response returned is the output of the last valid cart save or final submit. If a record is not found for the key, an error is returned.

**Method:** GET
**Endpoint:** `{sf_domain}/services/apexrest/bt_stripe/checkout/v1/cart/retrieve?key={cartKey}`
**Request Body Payload:** None - just set the `key` parameter on the request url
**Response Body Payload:** See the API Request and Response Payload section below


### Submit Cart
Call this endpoint to do a final submit of cart data to generate a new Sales Document (Blackthorn Invoice) record, Line Item records and update the Checkout Submission record as Complete in Salesforce. Once the Checkout Submission record is complete, it cannot be saved or submitted again. If Transaction Id(s) are submitted on the cart, the Transactions are associated to the Sales Document to update the Payment Status and determine the Balance Due. There is additional logic to process Transaction(s) that are only authorized and not yet captured.

**Method:** POST
**Endpoint:** `{sf_domain}/services/apexrest/bt_stripe/checkout/v1/cart/submit`
**Request Body Payload:** See the API Request and Response Payload section below
**Response Body Payload:** See the API Request and Response Payload section below


## Errors
The API will return a Status Code = 400 or 500 depending on the error type:
- 400 - Returned if error is caused by invalid or missing attributes or from validation checks.
- 500 - Returned if error is caused by an unexpected server error such as null pointer or database exception.

For either of these codes, the response body will contain only an error attribute:
`{"error" : "This is what went wrong."}`

If there is an error in a request for the `Save Cart` or `Retrieve Cart` api call, we do not created or updated records in Salesforce. If there is a validation error for the `Submit Cart` api call, we also do not create or update records in Salesforce. But if there is an unexpected error in the request for the `Submit Cart` api call while trying to create a Sales Document and Line Item records, we update the Checkout Submission record in Salesforce with the request Input Payload along with the error. But we roll back any inserts or updates around the Sales Document, Line Items and Transaction.


## API Request and Response Payload

JSON Attribute | Required? | Type | Details
----- | ----- | ----- | -----
mainContact | No | MainContact | Name and Email of the main contact. Attributes of MainContact are: firstName, lastName and email.
waitlistAttendees | Yes | Array of WaitlistAttendees | Array of Attendees to Waitlist. Attributes of WaitlistAttendee are: eventItemId (required), firstName (required), lastName (required), email (required), phone, accountId, contactId and leadId.



**Sample Body:** This example will add 2 Attendees to the waitlist for two different ticket event item. Setting the optional contactId, accountId or leadId will associate the Attendees to those parent records. If the email of the MainContact is set, it will be saved in the Attendee - Primary Email field. All Attendees created will have their Registration Status field set to `Waitlisted - Pending` and if more than one Attendee is pass in at a time, all the Attendees will be added to a new Attendee Group.
```
{
  "transactionIds" : null,
  "authenticatedAccountId" : null,
  "salesDocument" : {
    "promoCode" : "1_OFF",
    "currencyCode" : "USD",
    "paymentTerm" : "Net 30",
    "paymentGatewayId" : "a0C0b00000UbO5FEAV",
    "billTo" : {
      "title" : "VP of Sales",
      "street" : "1060 W Addison Ave",
      "state" : "IL",
      "relatedId" : null,
      "postalCode" : "62626",
      "phone" : "808-555-1234",
      "lastName" : "lastName",
      "firstName" : "firstName",
      "email" : "email@blackthorn.io",
      "country" : "USA",
      "company" : "McDonalds",
      "city" : "Chicago"
    },
    "shipTo" : {
      "title" : "VP of Sales",
      "street" : "1060 W Addison Ave",
      "state" : "IL",
      "relatedId" : null,
      "postalCode" : "62626",
      "phone" : "808-555-1234",
      "lastName" : "lastName",
      "firstName" : "firstName",
      "email" : "email@blackthorn.io",
      "country" : "USA",
      "company" : "McDonalds",
      "city" : "Chicago"
    },
    "items" : [ {
      "quantity" : 1,
      "priceBookId" : "01s0b000002sibWAAQ",
      "productId" : "01t0b00000HQxv5AAD"
    }, {
      "quantity" : 1,
      "priceBookId" : "01s0b000002sibWAAQ",
      "productId" : "01t0b00000HQxv0AAD"
    } ]
  }
}

```

**Success Message:** If the API request was successful, the following response message will be returned:
```
{
  "message" : "The Attendees were successfully added to the ticket waitlist.",
  "attendeeIds" : [ "a0wf4000005ElWQAA0", "a0wf4000005ElWRAA0" ]
}
```


***


### Waitlist Authenticated Attendees for Event Sessions
Post Authenticated Attendees (has a known Attendee Id) that want to get added to a waitlist for one or more Event Sessions. If there is waitlist capacity remaining for a Session, the Attendees will be added to the waitlist.

**Endpoint:** `<sf_domain>/services/apexrest/conference360/waitlist/v1/eventsessions`


JSON Attribute | Required? | Type | Details
----- | ----- | ----- | -----
waitlistAttendees | Yes | Array of WaitlistAttendees | Array of Attendees to Waitlist. Attributes of WaitlistAttendee are: sessionIds (required - Array of Strings), attendeeId (required), contactId and leadId.


**Sample Body:** This example will add the submitted Attendee to the waitlist for 2 Event Sessions by creating 2 Session Attendee records. Each Session Attendee record will have The Session and Attendee set to the Ids passed in along with the optional contactId, accountId or leadId fields. All Session Attendees created will have their Registration Status field set to `Waitlisted - Pending`.
```
{
  "waitlistAttendees" : [ {
    "sessionIds" : [ "a1Bf4000001PH2zEAG", "a1Bf4000004Pv0tEAC" ],
    "attendeeId" : "a0wf40000026ZbEAAU",
    "contactId" : "003f400000PLfd2AAD"
  } ]
}
```

**Success Message:** If the API request was successful, the following response message will be returned:
```
{
  "message" : "All Sessions were successfully waitlisted for the Attendee.",
  "sessionAttendeeIds" : [ "a18f4000002ZOsRAAW", "a18f4000002ZOsSAAW" ]
}
```
