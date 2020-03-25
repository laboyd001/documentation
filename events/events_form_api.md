# Events Form Submission Rest API
The Event Form Submission API can be used to capture relevant data for a custom Form or Survey.
The Form Submission API accepts data posted to a Rest formatted url and saves data in Salesforce as a Form Submission record. Form Submission data can also be retrieve from the api by Form Submission key. All data is accepted and returned in JSON format. Your application must [oauth to a Salesforce org](https://help.salesforce.com/articleView?id=connected_app_create_api_integration.htm&type=5) that contains our Events package before making calls to the API. This API can also be called from a SF Site that's setup correctly.



## Form Submission Features
- Build a Form Submission to capture answers for a survey or custom questions
- Persist (save) the Form Submission as a Salesforce record so it can be retrieved by a unique key
- Relate a Form Submission to any Event, Attendee, Attendee Session, Contact/Lead/Account/User as well as the Form
- Only one Form Submission can be submitted per call to avoid a complex data structure



## API Calls
Here are the supported Form Submission API calls.

### Save Form Submission
Call this endpoint to save Form Submission data as a Form Submission record in Salesforce. The `key` attribute in the request body determines what happens in Salesforce. If `key` is blank, a values will be generated and a new record will be inserted. If `key` is populated, we query for an existing Form Submission record and update it if found. If the record is not found, a new Form Submission record is created with the `key` set as the record Key.

The save form does not really require any data and does not do a lot of validations so you can submit as little or as much data as you want. Once the submission is saved, the form submission payload is returned.

- **Method:** POST
- **Endpoint:** `{sf_domain}/services/apexrest/conference360/form/v1/save`
- **Request Body Payload:** See the API Request and Response Payload section below
- **Response Body Payload:** See the API Request and Response Payload section below


### Retrieve Form Submission
Call this endpoint to retrieve an existing Form Submission record from Salesforce by key. The response returned is the output of the last valid form save or final submit. If a record is not found for the key, an error is returned.

- **Method:** GET
- **Endpoint:** `{sf_domain}/services/apexrest/conference360/form/v1/retrieve?key={key}`
- **Request Body Payload:** None - just set the `key` parameter on the request url
- **Response Body Payload:** See the API Request and Response Payload section below


### Submit Form Submission
Call this endpoint to do a final submit of Form Submission data. This updates the Form Submission record as Complete in Salesforce. Once the Form Submission record is complete, it cannot be saved or submitted again.

- **Method:** POST
- **Endpoint:** `{sf_domain}/services/apexrest/conference360/form/v1/submit`
- **Request Body Payload:** See the API Request and Response Payload section below
- **Response Body Payload:** See the API Request and Response Payload section below


## Errors
The API will return a Status Code = 400 or 500 depending on the error type:
- **400** - Returned if error is caused by invalid or missing attributes or from validation checks.
- **500** - Returned if error is caused by an unexpected server error such as null pointer or database exception.

For either of these codes, the response body will contain only an error attribute:
`{"error" : "This is what went wrong."}`

If there is an error in a request for the `Save Form` or `Retrieve Form` api call, we do not created or updated records in Salesforce. If there is a validation error for the `Submit Form` api call, we also do not create or update records in Salesforce. But if there is an unexpected error in the request for the `Submit Form` api call while trying to create a form elements records, we update the Form Submission record in Salesforce with the request Input Payload along with the error. But we roll back any inserts or updates around the Form Elements.


## API Request and Response Payload

JSON Attribute | Section | Required? | Type | Details
----- | ----- | ----- | ----- | -----
key | root | On Submit | String | Generate or have it generated for you.
formId | root | On Submit | String | Id of the Form record.
eventId | root | On Submit | String | Id of the related Event.
attendeeId | root | No | String | Id of the related Attendee.
attendeeKey | root | No | String | Key of the yet to be created Attendee. Use the same key here that you use in the Event Checkout API to relate the Form Submission to an Attendee record created by the Checkout API.
relatedId | root | No | String | Id of the related Account, Contact, Lead or User.
sessionAttendeeId | root | No | String | Id of the related Session Attendee.
sessionId | root | No | String | Id of the related Session.
formElements | root | No | Form Element Array | Array of Form Elements.
formElementId | formElement | On Submit | String | Id of the related Form Element.
answer | formElement | No | String | Text answer that's 255 characters or less for a Form Element. This can also be used to set a selected Picklist value (separated multiple with a semicolon) or the answer to a checkbox form field.
answerLong | formElement | No | String | Text answer that's greater than 255 characters but less than 10,000 characters for a Form Element.
answerDate | formElement | No | Date | Date formatted answer for a Form Element.
answerNumber | formElement | No | Decimal | Decimal formatted answer for a Form Element.
fileUploadKey | formElement | No | String | Key of a File that was uploaded to [Salesforce as a ContentVersion record using the Salesforce Rest API](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/dome_sobject_insert_update_blob.htm#inserting_a_contentversion). Use the same key here that you set on the ContentVersion - `Related_Key__c` field to relate the ContentVersion (File) record to the Form Submission.
bigListGroupOptionId | formElement | No | String | Id of the related Big List Group Option selected as an answer.


## Sample Form Save Request Payload
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
