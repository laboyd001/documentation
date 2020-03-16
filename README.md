# Blackthorn API Documentation

Blackthorn provides multiple APIs to give you the most flexibility for custom implementations. All of our APIs are documented in this repository along with some working examples.

## Payments

### Stripe Elements + Payments Rest API
Here are recommended working examples on how to use Stripe Elements with the Blackthorn Payments Rest API to ensure a **SAQ A** PCI Compliance Level.

[Stripe Elements for Card](https://blackthornio.github.io/documentation/payments/stripe-web-elements-card/stripe-elements-blackthorn-payments-card.html) - source is viewable from the example

[Stripe Elements for ACH](https://blackthornio.github.io/documentation/payments/stripe-web-elements-ach/stripe-elements-blackthorn-payments-ach.html) - source is viewable from the example

<!-- uncomment these once they're done
### Authorize.net Accept Hosted + Payments Rest API
Here are recommended working examples on how to use Accept Hosted with the Blackthorn Payments Rest API to ensure a **SAQ A** PCI Compliance Level.

[Authorize.net Accept Hosted for Card](https://blackthornio.github.io/documentation/payments/authorizenet-accept-hosted-card/TODO-card.html) - source is viewable from the example


[Authorize.net Accept Hosted for eCheck](https://blackthornio.github.io/documentation/payments/authorizenet-accept-hosted-echeck/TODO-echeck.html) - source is viewable from the example
 -->


### Rest Payments API
The Rest Payments API can be used to build custom Card and ACH Payment processing. It works with our supported Payment Gateways to save reusable Payment Methods and authorize or capture Transaction Charges. All data is saved in Salesforce and can also be related to whatever objects you use. [More information is available in the documentation](/payments/payments_rest_api.md).


### Apex Payments API
The Apex Payments API makes it easy to create Customers, Payment Methods, Transactions and Payment Schedules with simple method calls from your Salesforce Apex code. It makes callouts to the Payment Gateway to create Customers, Payment Methods and Charge Transactions as well as creating the corresponding records in Salesforce. [More information is available in the documentation](/payments/payments_apex_api.md).


### Checkout Rest API
The Checkout API can be used to create a shopping cart to capture relevant data for a custom checkout experience. It can be used with our Payments Rest API to capture a payment as a checkout step. [More information is available in the documentation](/payments/checkout_api.md).


## Events

### Events Data Rest API
The Events Data API can be used to retrieve Event records in a format that is convienent to use in a custom implementation. [More information is available in the documentation](/events/events_data_api.md).

### Events Form Submission Rest API
Save, Retrieve and Submit Form Submission data for custom questions and surveys.
 [More information is available in the documentation](/events/events_form_api.md).

### Events Waitlist Rest API
Add Attendees to ticket or session waitlists. [More information is available in the documentation](/events/events_addtowaitlist_api.md).

### Events Checkout Rest API
Save, Retrieve and Submit Event specific checkouts data. [More information is available in the documentation](/events/events_checkout_api.md).

