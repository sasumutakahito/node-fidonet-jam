/* global describe, it */
var JAM = require('../');
var assert = require('assert');
var path = require('path');
var util = require('util');
var headCount = 8222;

describe('Fidonet JAM', function(){
   it('reads index and can destroy it', function(done){
      var blog = JAM( path.join(__dirname, 'BLOG-MTW') );
      blog.readJDX(function(err){
         if (err) throw err;

         assert.equal(blog.indexStructure.length, headCount);
         blog.clearCache();
         assert.equal(blog.indexStructure, null);

         done();
      });
   });
   it('reads '+headCount+' headers from the message base', function(done){
      var blog = JAM( path.join(__dirname, 'BLOG-MTW') );

      blog.readAllHeaders(function(err,data){
         if (err) throw err;

         assert.equal(data.MessageHeaders.length, headCount);
         console.log('The last header:');
         console.log(util.inspect(
            data.MessageHeaders[data.MessageHeaders.length-1],
            false, Infinity, true
         ));
         done();
      });
   });
});