/**
 * Telstra Messaging API
 *  The Telstra SMS Messaging API allows your applications to send and receive SMS text messages from Australia's leading network operator.  It also allows your application to track the delivery status of both sent and received SMS messages. 
 *
 * OpenAPI spec version: 2.2.4
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: unset
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD.
    define(['expect.js', '../../src/index'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    factory(require('expect.js'), require('../../src/index'));
  } else {
    // Browser globals (root is window)
    factory(root.expect, root.TelstraMessaging);
  }
}(this, function(expect, TelstraMessaging) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new TelstraMessaging.SendMmsRequestMMSContent();
  });

  var getProperty = function(object, getter, property) {
    // Use getter method if present; otherwise, get the property directly.
    if (typeof object[getter] === 'function')
      return object[getter]();
    else
      return object[property];
  }

  var setProperty = function(object, setter, property, value) {
    // Use setter method if present; otherwise, set the property directly.
    if (typeof object[setter] === 'function')
      object[setter](value);
    else
      object[property] = value;
  }

  describe('SendMmsRequestMMSContent', function() {
    it('should create an instance of SendMmsRequestMMSContent', function() {
      // uncomment below and update the code to test SendMmsRequestMMSContent
      //var instane = new TelstraMessaging.SendMmsRequestMMSContent();
      //expect(instance).to.be.a(TelstraMessaging.SendMmsRequestMMSContent);
    });

    it('should have the property type (base name: "type")', function() {
      // uncomment below and update the code to test the property type
      //var instane = new TelstraMessaging.SendMmsRequestMMSContent();
      //expect(instance).to.be();
    });

    it('should have the property filename (base name: "filename")', function() {
      // uncomment below and update the code to test the property filename
      //var instane = new TelstraMessaging.SendMmsRequestMMSContent();
      //expect(instance).to.be();
    });

    it('should have the property payload (base name: "payload")', function() {
      // uncomment below and update the code to test the property payload
      //var instane = new TelstraMessaging.SendMmsRequestMMSContent();
      //expect(instance).to.be();
    });

  });

}));
