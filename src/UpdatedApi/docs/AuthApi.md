# ChangeManagementPlateform.AuthApi

All URIs are relative to *http://localhost:3000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiAuthForgotPasswordPost**](AuthApi.md#apiAuthForgotPasswordPost) | **POST** /api/auth/forgot/password | Forget Password
[**apiAuthPost**](AuthApi.md#apiAuthPost) | **POST** /api/auth/ | Register
[**apiAuthResetPasswordPost**](AuthApi.md#apiAuthResetPasswordPost) | **POST** /api/auth/reset/password | Reset Password
[**apiAuthUsers647f32504743d3582c8b278aGet**](AuthApi.md#apiAuthUsers647f32504743d3582c8b278aGet) | **GET** /api/auth/users/647f32504743d3582c8b278a | Get User
[**apiAuthVerificationPost**](AuthApi.md#apiAuthVerificationPost) | **POST** /api/auth/verification | Verify Email
[**authGet**](AuthApi.md#authGet) | **GET** /auth/ | Get All Users
[**authLoginPost**](AuthApi.md#authLoginPost) | **POST** /auth/login | Login
[**authUsers647f32504743d3582c8b278aDelete**](AuthApi.md#authUsers647f32504743d3582c8b278aDelete) | **DELETE** /auth/users/647f32504743d3582c8b278a | Delete User
[**authUsers647f32504743d3582c8b278aPut**](AuthApi.md#authUsers647f32504743d3582c8b278aPut) | **PUT** /auth/users/647f32504743d3582c8b278a | Update User



## apiAuthForgotPasswordPost

> apiAuthForgotPasswordPost(opts)

Forget Password

This is a POST request, submitting data to an API via the request body. This request submits JSON data, and the data is reflected in the response.  A successful POST request typically returns a &#x60;200 OK&#x60; or &#x60;201 Created&#x60; response code.

### Example

```javascript
import ChangeManagementPlateform from 'change_management_plateform';
let defaultClient = ChangeManagementPlateform.ApiClient.instance;
// Configure Bearer access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new ChangeManagementPlateform.AuthApi();
let opts = {
  'body': {key: null} // Object | 
};
apiInstance.apiAuthForgotPasswordPost(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **Object**|  | [optional] 

### Return type

null (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiAuthPost

> apiAuthPost(opts)

Register

This is a POST request, submitting data to an API via the request body. This request submits JSON data, and the data is reflected in the response.  A successful POST request typically returns a &#x60;200 OK&#x60; or &#x60;201 Created&#x60; response code.

### Example

```javascript
import ChangeManagementPlateform from 'change_management_plateform';

let apiInstance = new ChangeManagementPlateform.AuthApi();
let opts = {
  'body': {key: null} // Object | 
};
apiInstance.apiAuthPost(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **Object**|  | [optional] 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiAuthResetPasswordPost

> apiAuthResetPasswordPost(opts)

Reset Password

This is a POST request, submitting data to an API via the request body. This request submits JSON data, and the data is reflected in the response.  A successful POST request typically returns a &#x60;200 OK&#x60; or &#x60;201 Created&#x60; response code.

### Example

```javascript
import ChangeManagementPlateform from 'change_management_plateform';
let defaultClient = ChangeManagementPlateform.ApiClient.instance;
// Configure Bearer access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new ChangeManagementPlateform.AuthApi();
let opts = {
  'body': {key: null} // Object | 
};
apiInstance.apiAuthResetPasswordPost(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **Object**|  | [optional] 

### Return type

null (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiAuthUsers647f32504743d3582c8b278aGet

> apiAuthUsers647f32504743d3582c8b278aGet()

Get User

This is a GET request and it is used to \&quot;get\&quot; data from an endpoint. There is no request body for a GET request, but you can use query parameters to help specify the resource you want data on (e.g., in this request, we have &#x60;id&#x3D;1&#x60;).  A successful GET response will have a &#x60;200 OK&#x60; status, and should include some kind of response body - for example, HTML web content or JSON data.

### Example

```javascript
import ChangeManagementPlateform from 'change_management_plateform';

let apiInstance = new ChangeManagementPlateform.AuthApi();
apiInstance.apiAuthUsers647f32504743d3582c8b278aGet((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiAuthVerificationPost

> apiAuthVerificationPost(opts)

Verify Email

This is a POST request, submitting data to an API via the request body. This request submits JSON data, and the data is reflected in the response.  A successful POST request typically returns a &#x60;200 OK&#x60; or &#x60;201 Created&#x60; response code.

### Example

```javascript
import ChangeManagementPlateform from 'change_management_plateform';
let defaultClient = ChangeManagementPlateform.ApiClient.instance;
// Configure Bearer access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new ChangeManagementPlateform.AuthApi();
let opts = {
  'body': {key: null} // Object | 
};
apiInstance.apiAuthVerificationPost(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **Object**|  | [optional] 

### Return type

null (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## authGet

> authGet()

Get All Users

This is a GET request and it is used to \&quot;get\&quot; data from an endpoint. There is no request body for a GET request, but you can use query parameters to help specify the resource you want data on (e.g., in this request, we have &#x60;id&#x3D;1&#x60;).  A successful GET response will have a &#x60;200 OK&#x60; status, and should include some kind of response body - for example, HTML web content or JSON data.

### Example

```javascript
import ChangeManagementPlateform from 'change_management_plateform';

let apiInstance = new ChangeManagementPlateform.AuthApi();
apiInstance.authGet((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## authLoginPost

> authLoginPost(opts)

Login

### Example

```javascript
import ChangeManagementPlateform from 'change_management_plateform';

let apiInstance = new ChangeManagementPlateform.AuthApi();
let opts = {
  'body': {key: null} // Object | 
};
apiInstance.authLoginPost(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **Object**|  | [optional] 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## authUsers647f32504743d3582c8b278aDelete

> authUsers647f32504743d3582c8b278aDelete()

Delete User

This is a DELETE request, and it is used to delete data that was previously created via a POST request. You typically identify the entity being updated by including an identifier in the URL (eg. &#x60;id&#x3D;1&#x60;).  A successful DELETE request typically returns a &#x60;200 OK&#x60;, &#x60;202 Accepted&#x60;, or &#x60;204 No Content&#x60; response code.

### Example

```javascript
import ChangeManagementPlateform from 'change_management_plateform';

let apiInstance = new ChangeManagementPlateform.AuthApi();
apiInstance.authUsers647f32504743d3582c8b278aDelete((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## authUsers647f32504743d3582c8b278aPut

> authUsers647f32504743d3582c8b278aPut(opts)

Update User

This is a PUT request and it is used to overwrite an existing piece of data. For instance, after you create an entity with a POST request, you may want to modify that later. You can do that using a PUT request. You typically identify the entity being updated by including an identifier in the URL (eg. &#x60;id&#x3D;1&#x60;).  A successful PUT request typically returns a &#x60;200 OK&#x60;, &#x60;201 Created&#x60;, or &#x60;204 No Content&#x60; response code.

### Example

```javascript
import ChangeManagementPlateform from 'change_management_plateform';

let apiInstance = new ChangeManagementPlateform.AuthApi();
let opts = {
  'body': {key: null} // Object | 
};
apiInstance.authUsers647f32504743d3582c8b278aPut(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **Object**|  | [optional] 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

