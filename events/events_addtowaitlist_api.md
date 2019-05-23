### Events Add To Waitlist Rest API
The Events Add To Waitlist API is designed to accept data by POST calls from Rest formatted Urls. All data accepted and returned is in JSON format. The platform must oauth into a SF org before making calls to the API. This API can also be called from a SF Site that's setup correctly.

### Rest Url Format
`<sf_domain>/services/apexrest/conference360/waitlist/v1/`

### Errors
Any API calls that result in an error return a Status Code = 500 and a response body of:

`{"error" : "This is what went wrong."}`

## API Calls

### GET Events
Get Event and the related Event Settings and Event Items in one call by key (not Id). Multiple Events can be retrieved in the same call by passing in multiple key values separated by commas. If no key values are passed in, all future Events with a Status of `Draft` or `Active` are returned - up to the 500 Events sorted by `Event Start Date`.

**endpoint** = `data/v1/events`

**parameters** = key (field is Key__c on Event, not required, can pass multiple separated by commas)

**examples**

[https://qfevt-developer-edition.na59.force.com/services/apexrest/data/v1/events](https://qfevt-developer-edition.na59.force.com/services/apexrest/data/v1/events)

[https://qfevt-developer-edition.na59.force.com/services/apexrest/data/v1/events?key=67yd9G08EP](https://qfevt-developer-edition.na59.force.com/services/apexrest/data/v1/events?key=67yd9G08EP)


***


### GET Events Lite
This call works the same as the Get Events but a limited number of fields are returned. This can be called for a listing page or to get capacity or sales date data for validations.

**endpoint** = `data/v1/events/lite`

**parameters** = key (field is Key__c on Event, not required, can pass multiple separated by commas)

**examples**

[https://qfevt-developer-edition.na59.force.com/services/apexrest/data/v1/events/lite](https://qfevt-developer-edition.na59.force.com/services/apexrest/data/v1/events/lite)

[https://qfevt-developer-edition.na59.force.com/services/apexrest/data/v1/events/lite?key=67yd9G08EP](https://qfevt-developer-edition.na59.force.com/services/apexrest/data/v1/events/lite?key=67yd9G08EP)

