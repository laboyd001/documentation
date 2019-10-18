## Events Checkout Rest API
The Events Checkout API is designed to accept data by POST calls from Rest formatted Urls. All data is accepted and returned in JSON format. The platform must oauth into a SF org before making calls to the API. This API can also be called from a SF Site that's setup correctly.


## Features
- Build a shopping cart with application to capture item quantities for Products and Pricebook Entries in Salesforce
- Persist the shopping cart as a Salesforce record so it can be retrieved by a unique key
- Accept and validate Discount Codes for the entire order
- Capture and save Bill to and Ship to information for the Sales Document
- Relate an authorized or captured Transaction as payment for the shopping cart
- Submit the shopping cart to create a Sales Document with related Line Items and Transaction in Salesforce


## Events Package Integration
The 
- 

## Use Cases


### Errors
The API will return a Status Code = 400 or 500 depending on the error type:
- 400 - Returned if error is caused by invalid or missing attributes or from validation checks.
- 500 - Returned if error is caused by an unexpected server error such as null pointer or database exception.

For either of these codes, the response body will contain an error attribute:
`{"error" : "This is what went wrong."}`

If ther are any errors in a request, no records will get created or updated in Salesforce.

## API Calls
--------------TODO: FINISH BELOW
### Waitlist Unauthenticated Attendees for Ticket Event Items
Post Attendees that want to get added to a waitlist for a ticket Event Item. Multiple Attendees and multiple Event Item tickets are supported. If there is waitlist capacity remaining, each Attendee will be added to the waitlist for the submitted Event Item ticket.

**Endpoint:** `<sf_domain>/services/apexrest/conference360/waitlist/v1/eventitem`


JSON Attribute | Required? | Type | Details
----- | ----- | ----- | -----
mainContact | No | MainContact | Name and Email of the main contact. Attributes of MainContact are: firstName, lastName and email.
waitlistAttendees | Yes | Array of WaitlistAttendees | Array of Attendees to Waitlist. Attributes of WaitlistAttendee are: eventItemId (required), firstName (required), lastName (required), email (required), phone, accountId, contactId and leadId.



**Sample Body:** This example will add 2 Attendees to the waitlist for two different ticket event item. Setting the optional contactId, accountId or leadId will associate the Attendees to those parent records. If the email of the MainContact is set, it will be saved in the Attendee - Primary Email field. All Attendees created will have their Registration Status field set to `Waitlisted - Pending` and if more than one Attendee is pass in at a time, all the Attendees will be added to a new Attendee Group.
```
{
  "cartKey" : "u_can_set_this_or_it_will_be_generated",
  "eventId" : "a1Q0b0000084YgiEAE",
  "transactionIds" : null,
  "authenticatedAccountId" : null,
  "salesDocument" : {
    "promoCode" : "NERD_25_DOL_OFF",
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
    "items" : [ {
      "quantity" : 1,
      "eventItemId" : "a1N0b000009YwGtEAK",
      "attendee" : {
        "attendeeKey" : "u_can_set_this_to_track_on_platform",
        "firstName" : "Sally",
        "lastName" : "Uno",
        "salutation" : "Ms",
        "company" : "Burger King",
        "title" : "Chef",
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
        "company" : "Chipotle",
        "title" : "Owner",
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
