## Oauth to Salesforce
If you want to build a custom app that uses Salesforce data and functionality, you'll first need to authenticate to Salesforce. The simpliest and safest way to accomplish this is with a Salesforce Connected App. Here are some instructions on how to setup a Connected App.
-
-
- https://help.salesforce.com/articleView?id=connected_app_create_api_integration.htm&type=5




### Oauth in Postman
If you want to try out our API calls in Postman, you'll need to authenticate to Salesforce first.


Postman Field | Value
----- | -----
Token Name | (Any descriptive name)
Grant Type | Authorization Code
Callback URL | https://www.getpostman.com/oauth2/callback
Auth URL | https://login.salesforce.com/services/oauth2/authorize
Access Token URL | https://login.salesforce.com/services/oauth2/token
Client ID | (the consumer key from your connected app)
Client Secret | (the consumer secret from your connected app)
Scope | (leave empty)
State | (leave empty)
Client Authentication | Send as Basic Auth Header

If you're testing in a Salesforce sandbox, use the `https://test.salesforce.com` domain in the urls above.


Token Name = (Any descriptive name)
Grant Type = Authorization Code
Callback URL = https://www.getpostman.com/oauth2/callback
Auth URL = https://login.salesforce.com/services/oauth2/authorize
Access Token URL = https://login.salesforce.com/services/oauth2/token
Client ID = (the consumer key from your connected app)
Client Secret = (the consumer secret from your connected app)
Scope = (leave empty)
State = (leave empty)
Client Authentication = Send as Basic Auth Header



***

