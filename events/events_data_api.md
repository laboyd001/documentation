Note: This documentation is currently internal only! We'll most likely post this on a public Git repo once we [dogfood](https://en.wikipedia.org/wiki/Eating_your_own_dog_food) it on the Platform.

### General API Info
The Data API is currently designed to only return data by GET calls to a Rest formatted Urls. All data is returned in JSON format. The platform must oauth into a SF org before making calls to the API. This API can also be called from a SF Site that's setup correctly. The Data API supports getting multiple records in one call and is mainly segregated by SF object. The call to get `Event` records also returns `Event Settings` and `Event Items` data as a convenience since the data is tightly coupled.

### Rest Url Format
- Namespaced = `<sf_domain>/services/apexrest/bt_stripe/data/v1/`
- Non-Namespaced (for dev only) = `<sf_domain>/services/apexrest/data/v1/`
In the documentation below, the Rest Url will all start with `/data/v1/` but when calling the API be sure to use the full Url depending on if you're calling the API in a namespaced org or not.

### SF Site for Testing
A SF Site that exposes the Events Data Rest API has been setup in Quentin's dev org which is not namespaced. Feel free make API calls to see the data format returned. If an API call does not return data, ask Quentin to create test data for it. Examples for the calls below will point to this SF Site.

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


### GET Attendees
Get Attendee records by key(s) or all records for an Event by eventId(s)

**endpoint** = `data/v1/attendees`

**parameters** = key (field is Key__c on Attendee can pass multiple separated by commas) OR eventId (field is Event__c on Attendee can pass multiple separated by commas) - one is required

**examples**

[https://qfevt-developer-edition.na59.force.com/services/apexrest/data/v1/attendees?eventId=a12f4000003vFaa](https://qfevt-developer-edition.na59.force.com/services/apexrest/data/v1/attendees?eventId=a12f4000003vFaa)

[https://qfevt-developer-edition.na59.force.com/services/apexrest/data/v1/attendees?key=qeZgrsYqBa](https://qfevt-developer-edition.na59.force.com/services/apexrest/data/v1/attendees?key=qeZgrsYqBa)


### GET Forms
Get Form and the related Form Elements in one call by Id. Multiple Forms can be retrieved in the same call by passing in multiple Id values separated by commas. If no Id values are passed in, all Forms are returned - up to the 500 Events sorted by `Name`. Form Elements are sorted by the `Sort Order` field.

**endpoint** = `data/v1/forms`

**parameters** = id (field is Id on Form, not required, can pass multiple separated by commas)

**examples**

[https://qfevt-developer-edition.na59.force.com/services/apexrest/data/v1/forms](https://qfevt-developer-edition.na59.force.com/services/apexrest/data/v1/forms)

[https://qfevt-developer-edition.na59.force.com/services/apexrest/data/v1/forms?id=a1Uf4000001Yoj4EAC](https://qfevt-developer-edition.na59.force.com/services/apexrest/data/v1/forms?id=a1Uf4000001Yoj4EAC)


### GET Tracks
Get Track and the related Track Sessions in one call by Event Id. Multiple Tracks can be retrieved in the same call by passing in multiple Event Id values separated by commas. If no Event Id values are passed in, no data is.

**endpoint** = `data/v1/tracks`

**parameters** = eventId (required, can pass multiple separated by commas)

**examples**

[https://qfevt-developer-edition.na59.force.com/services/apexrest/data/v1/tracks?eventId=a12f4000003vFaaAAE](https://qfevt-developer-edition.na59.force.com/services/apexrest/data/v1/tracks?eventId=a12f4000003vFaaAAE)


### GET Picklist Values
Get picklist values from the customer's org. This allows the customer to change picklist values to meet their needs and have their values reflected on the Events platform. The value for `label` should be displayed to the user in the picklist and the value for the `value` should be the value for the picklist. When submitting data to the checkout API, always pass the value for the `value` attribute.

**endpoint** = `/data/v1/picklists`

**parameters** = none

**example**

[https://qfevt-developer-edition.na59.force.com/services/apexrest/data/v1/picklists](https://qfevt-developer-edition.na59.force.com/services/apexrest/data/v1/picklists)

