# MobileCaddy App Addon - McRest

## Overview

AngularJS service used to access Salesforce REST calls from within a MobileCaddy application.

[![Build Status](https://travis-ci.org/MobileCaddy/mobilecaddy-app-addon-mcrest.svg)](https://travis-ci.org/MobileCaddy/mobilecaddy-app-addon-mcrest)


## Installation

```
npm install mobilecaddy-app-addon-mcrest
```

The installation will include the tasks of moving the relevant scripts into the correct place of your MobileCaddy appication project structure. Included in this copying of files will be the relevant unit tests

## Setup

* Ensure that the MobileCaddy _appDataUtils_ is exposed in your project's _www/js/services/service.module.js_. It should contain these lines;

```
angular.module('appDataUtils', [])
  .factory('appDataUtils', function() {
    return mobileCaddy.require('mobileCaddy/appDataUtils');
});
```

And the appDataUtils should be included in this line also;

```
angular.module('starter.services', ['underscore', 'devUtils', 'vsnUtils', 'smartStoreUtils', 'syncRefresh', 'appDataUtils', 'logger']);
```

## Configuring

You can configure the API version to be used like this. If no API version is set, the default shall be used. This can be run in the `.config` in the _app.js_. The format of the version number is strict, and the call will return false if the supplied value is not valid.

```
McRestService.config({apiVersion: "v41.0"});
```

## Calls Available

For example usage please checkout the [MobileCaddy KitchenSink App](https://github.com/MobileCaddy/ionic-kitchen-sink)


### query ###

For SOQL queries

#### Example ####

Seardhing for a contact

```
var soql = "SELECT name, id FROM Contact WHERE name LIKE 'dave'";

McRestService.query(soql).then(function(result){
	console.log("My results", result.records);
}
```

### request ###

Generic calls

#### Examples ####

Getting the latest chatter posts.

```
var obj = {
	method: 'GET',
	contentType: 'application/json',
	path: '/services/data/v36.0/chatter/feeds/news/me/feed-elements'
};
McRestService.request(obj).then(function(result){
	console.log("getLatestChatter result",
		result.elements[0].actor.displayName,
		result.elements[0].body.text);
});
```
List Salesforce files
```
var obj = {
	method: 'GET',
	contentType: 'application/json',
	path: '/services/data/v40.0/connect/files/users/me'
};
McRestService.request(obj).then(function(result){
	console.log("restCall result", result);
	vm.fs = result.files;
});
```

### requestBuffer ###

Retrieves Salesforce files

#### Example ####

```
var obj = {
	method: 'GET',
	path: myfile.downloadUrl
};
McRestService.requestBuffer(obj).then(function(result){
	console.log("downloadRemote result", result);
	var dataObj = new Blob([result]);
});
```

### upload ###

Uploads files to Salesforce. Returns an object representing the file on Salesforce, if successful.

#### Example ####

```
McRestService.upload(vm.file).then(function(result){

});
```

