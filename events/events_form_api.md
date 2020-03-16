# Events Form Submission Rest API
The Event Form Submission API can be used to create a form submission to capture relevant data for a custom Event checkout experience.
The Form Submission API accepts form data posted to a Rest formatted url and saves data in Salesforce as a Form Submission record. Form Submission data can also be retrieve from the api by Form Submission key. All data is accepted and returned in JSON format. Your application must [oauth to a Salesforce org](https://help.salesforce.com/articleView?id=connected_app_create_api_integration.htm&type=5) that contains our Payments and Events packages before making calls to the API. This API can also be called from a SF Site that's setup correctly.



## Form Submission Features
- Build a Form Submission to capture all the answer for survey or custom question asked during registration
- Persist (save) the Form Submission as a Salesforce record so it can be retrieved by a unique key
- Relate Form Submission to associated Contact/Lead/Account 
- Related the Form Submission to attendee,session,event & session attendee



## Event Checkout Features
- Build a Form Submission application to capture answer for Event Items (tickets) in Salesforce
- Validate Form Submission Status  upon Form Submission submit
- Pass in a Salesforce Id for Account, Contact or Lead to set on the Form Submission record lookups
- Pass in a Salesforce Id for Attendee, Session , Event,Session Attendee to set on the Form Submission record lookups
- Only one Form Submission can be submitted per call to avoid a complex data structure



## API Calls
Here are the supported Form Submission API calls.

### Save Form Submission
Call this endpoint to save Form Submission data as a Form Submission record in Salesforce. The `key` attribute in the request body determines what happens in Salesforce. If `key` is blank, a values will be generated and a new record will be inserted. If `key` is populated, we query for an existing Form Submission record and update it if found. If the record is not found, a new Form Submission record is created with the `key` set as the 
record Key.

The save form  does not really require any data and does not do a lot of validations so you can submit as little or as much data as you want. Once the submission is saved, form submission payload is returned. Discount Codes are also validated if set.

- **Method:** POST
- **Endpoint:** `{sf_domain}/services/apexrest/bt_stripe/form/v1/save`
- **Request Body Payload:** See the API Request and Response Payload section below
- **Response Body Payload:** See the API Request and Response Payload section below


### Retrieve Form Submission
Call this endpoint to retrieve an existing Submission (Form Submission) record from Salesforce by  key. The response returned is the output of the last valid form save or final submit. If a record is not found for the key, an error is returned.

- **Method:** GET
- **Endpoint:** `{sf_domain}/services/apexrest/bt_stripe/form/v1/retrieve?key={key}`
- **Request Body Payload:** None - just set the `key` parameter on the request url
- **Response Body Payload:** See the API Request and Response Payload section below


### Submit Form Submission
Call this endpoint to do a final submit of Form Submission data. This updates the Form Submission record as Complete in Salesforce. Once the Form Submission record is complete, it cannot be saved or submitted again.

- **Method:** POST
- **Endpoint:** `{sf_domain}/services/apexrest/bt_stripe/form/v1/submit`
- **Request Body Payload:** See the API Request and Response Payload section below
- **Response Body Payload:** See the API Request and Response Payload section below


## Errors
The API will return a Status Code = 400 or 500 depending on the error type:
- **400** - Returned if error is caused by invalid or missing attributes or from validation checks.
- **500** - Returned if error is caused by an unexpected server error such as null pointer or database exception.

For either of these codes, the response body will contain only an error attribute:
`{"error" : "This is what went wrong."}`

If there is an error in a request for the `Save Form` or `Retrieve Form` api call, we do not created or updated records in Salesforce. If there is a validation error for the `Submit Form` api call, we also do not create or update records in Salesforce. But if there is an unexpected error in the request for the `Submit Form` api call while trying to create a form elements records, we update the Form Submission record in Salesforce with the request Input Payload along with the error. But we roll back any inserts or updates around the Form elements.


## API Request and Response Payload

JSON Attribute | Section | Required? | Type | Details
----- | ----- | ----- | ----- | -----
key | root | On Submit | String | 
eventId | root | On Submit | String | 
attendeeId | root | No | String Array | 
relatedId | root | No | String | 
formId | root | On Submit | Sales Document | 
sessionAttendeeId | root | No | String | 
sessionId | root | No | String | 
formElements | formElements | No | Item Array | 




## Sample Cart Save Request Payload
```
{
  "key" : "bt_na1expakpbBJVxq1",
  "eventId" : "a1Q0b0000084YgiEAE",
  "relatedId" : null,
  "attendeeId" : "a1P0b0000084YgiEAE",
  "formId": "a1Z0b0000084YgiFAQ",
  "sessionId": "a100b0000084YgiMNM"
  "formElements" : [{
    "answer" : "USD",
    "answerLong" : null,
    "answerDate" : null,
    "answerNumber" : null,
    "formElementId" : "a100b0000084YgiMNM"

  },
  {
    "answer" : null,
    "answerLong" : "I am long answer",
    "answerDate" : null,
    "answerNumber" : null,
    "formElementId" : "a100b0000084YgiMNM"
   
  },
  {
    "answer" : null,
    "answerLong" : null,
    "answerDate" : "2009/12/10",
    "answerNumber" : null,
    "formElementId" : "a100b0000084YgiMNM"
   
  },
  {
    "answer" : null,
    "answerLong" : null,
    "answerDate" : "2009/12/10",
    "answerNumber" : null,
    "formElementId" : "a100b0000084YgiMNM",
    "fileUploadKey" :"bt_na6expakpbBJVxq1"
   
  },
  {
    "answer" : null,
    "answerLong" : null,
    "bigListGroupOptionId" : "a100b0000084YgiMNM",
    "answerNumber" : null,
    "formElementId" : "a100b0000084YgiMNM"
   
  }]
}
```


