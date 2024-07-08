# ChangeManagementPlateform.AIAssessmentApi

All URIs are relative to *http://localhost:3000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiAssessmentInspirePost**](AIAssessmentApi.md#apiAssessmentInspirePost) | **POST** /api/assessment/inspire | Inspire Me
[**apiAssessmentPost**](AIAssessmentApi.md#apiAssessmentPost) | **POST** /api/assessment/ | Assessment
[**assessmentPatch**](AIAssessmentApi.md#assessmentPatch) | **PATCH** /assessment/ | Update Assessment
[**surveyPatch**](AIAssessmentApi.md#surveyPatch) | **PATCH** /survey/ | Update Survey
[**surveyPost**](AIAssessmentApi.md#surveyPost) | **POST** /survey/ | Survey



## apiAssessmentInspirePost

> apiAssessmentInspirePost(opts)

Inspire Me

### Example

```javascript
import ChangeManagementPlateform from 'change_management_plateform';

let apiInstance = new ChangeManagementPlateform.AIAssessmentApi();
let opts = {
  'body': {key: null} // Object | 
};
apiInstance.apiAssessmentInspirePost(opts, (error, data, response) => {
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


## apiAssessmentPost

> apiAssessmentPost(opts)

Assessment

### Example

```javascript
import ChangeManagementPlateform from 'change_management_plateform';

let apiInstance = new ChangeManagementPlateform.AIAssessmentApi();
let opts = {
  'body': {key: null} // Object | 
};
apiInstance.apiAssessmentPost(opts, (error, data, response) => {
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


## assessmentPatch

> assessmentPatch(opts)

Update Assessment

### Example

```javascript
import ChangeManagementPlateform from 'change_management_plateform';

let apiInstance = new ChangeManagementPlateform.AIAssessmentApi();
let opts = {
  'body': {key: null} // Object | 
};
apiInstance.assessmentPatch(opts, (error, data, response) => {
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


## surveyPatch

> surveyPatch(opts)

Update Survey

### Example

```javascript
import ChangeManagementPlateform from 'change_management_plateform';

let apiInstance = new ChangeManagementPlateform.AIAssessmentApi();
let opts = {
  'body': {key: null} // Object | 
};
apiInstance.surveyPatch(opts, (error, data, response) => {
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


## surveyPost

> surveyPost(opts)

Survey

### Example

```javascript
import ChangeManagementPlateform from 'change_management_plateform';

let apiInstance = new ChangeManagementPlateform.AIAssessmentApi();
let opts = {
  'body': {key: null} // Object | 
};
apiInstance.surveyPost(opts, (error, data, response) => {
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

