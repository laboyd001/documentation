### Events Add To Waitlist Rest API
The Events Add To Waitlist API is designed to accept data by POST calls from Rest formatted Urls. All data is accepted and returned in JSON format. The platform must oauth into a SF org before making calls to the API. This API can also be called from a SF Site that's setup correctly.

### Rest Url Format
`<sf_domain>/services/apexrest/conference360/waitlist/v1/`

### Errors
Any API calls that result in an error return a Status Code = 500 and a response body of:

`{"error" : "This is what went wrong."}`

## API Calls

### Waitlist Attendees for a Ticket Event Item
Post Attendees that want to get added to a waitlist for a ticket Event Item. If there is waitlist capacity remaining, all Attendees will be added to the waitlist for the Event Item ticket.

**endpoint** = `waitlist/v1/eventitem`


JSON Attribute | Required? | Type | Details
----- | ----- | ----- | -----
eventItemId | Yes | String |The Id of the ticket Event Item for which the Attendees will be waitlisted.
mainContact | No | MainContact | Name and Email of the main contact. Attributes of MainContact are: firstName, lastName and email.
waitlistAttendees | Yes | Array of WaitlistAttendee | Array of Attendees to Waitlist. Attributes of WaitlistAttendee are: firstName (required), lastName (required), email (required), accountId, contactId and leadId.



**Sample Body**
This example will add 2 Attendees to the waitlist for a ticket event item. Setting the optional contactId, accountId or leadId will associate the Attendees to those parent records.
```
{
  "eventItemId" : "a0zf4000003CfQiAAK",
  "waitlistAttendees" : [ {
    "firstName" : "Tom",
    "lastName" : "Smith",
    "email" : "tom@blackthorn.io",
    "contactId" : "003f400000PLfd2AAD",
    "accountId" : "001f400000QepmMAAR"
  }, {
    "firstName" : "Sally",
    "lastName" : "Thomas",
    "email" : "sally@blackthorn.io",
    "leadId" : "00Qf4000007tVCMEA2"
  } ],
  "mainContact" : {
    "lastName" : "Contact",
    "firstName" : "Main",
    "email" : "someone@blackthorn.io"
  }
}
```


***


### GET Events Lite
This call works the same as the Get Events but a limited number of fields are returned. This can be called for a listing page or to get capacity or sales date data for validations.

**endpoint** = `data/v1/events/lite`

**parameters** = key (field is Key__c on Event, not required, can pass multiple separated by commas)

**examples**

[https://qfevt-developer-edition.na59.force.com/services/apexrest/data/v1/events/lite](https://qfevt-developer-edition.na59.force.com/services/apexrest/data/v1/events/lite)

[https://qfevt-developer-edition.na59.force.com/services/apexrest/data/v1/events/lite?key=67yd9G08EP](https://qfevt-developer-edition.na59.force.com/services/apexrest/data/v1/events/lite?key=67yd9G08EP)

