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

## Usage

```
TBC
```
