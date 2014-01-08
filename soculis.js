#!/usr/bin/env node

var async = require('async'),
  argv = require('optimist')
    .string('inputDir')
    .demand('inputDir')
    .string('outputDir')
    .demand('outputDir')
    .string('fileType')
    .demand('fileType')
    .argv,
  exec = require('child_process').exec,
  filesToConvert = [],
  fs = require('fs'),
  isWin = process.platform.match(/^win/),
  SLASH = isWin ? "\\" : "/",
  ENDS_WITH_SLASH = new RegExp( "(?:\\|/)$", "gi"),
  MATCH_FILE = new RegExp( "\." +argv.fileType + "$", "gi" ),
  ECHO = true;

// Make sure paths always end with slash
argv.inputDir = ENDS_WITH_SLASH.test(argv.inputDir) ? argv.inputDir : argv.inputDir + SLASH;
argv.outputDir = ENDS_WITH_SLASH.test(argv.outputDir) ? argv.inputDir : argv.outputDir + SLASH;

// Execute at launch
function main() {
  
  async.series([
      // Check to see if the output directory exists
	  function (callback) {
		fs.exists(argv.outputDir, function(exists){
			createOutputDirIfDoesNotExist(exists, callback);
		});
	  },
	  // Find all the files that need audio copied out
	  function (callback) {
        walk(argv.inputDir, function (err, results) {
          filesToConvert = results;
          callback(err, results);
        });
      },
	  // Copy Audio to new location
      function (callback) {
        async.each(
          filesToConvert,
          convertFile,
          function (err) {
            //callback(err, null);
          }
        );
      }
    ],

    function (err, results) {
      if (err) console.log(err);
      
      console.log(filesToConvert.length.toString() + " files extracted.")
    }
  );
}

function createOutputDirIfDoesNotExist(exists, callback){
	if(exists)
		return;
		
	fs.mkdir(argv.outputDir, function(){
		callback(null, argv.outputDir + "Created");
	});
}

// Run the fffmpeg command against all the files    
function convertFile(item, callback) {
  if(!MATCH_FILE.test(item)){
    callback(null);
    return;
  }
  var command = 'ffmpeg.exe -i "' + argv.inputDir + item + '" -vn -y -acodec copy "' + argv.outputDir + item + '"';
  async.series([
      function (cb) {
        execute(command, cb);
        
      }
    ],
    function(err){
      callback(err, null);
    }
  )
}

// Print execution info to the console
function printExecResultsToConsole(error, stdout, stderr, command) {
  console.log("--------");
  console.log("Command");
  console.log("--------");
  console.log(command);
  console.log("");

  console.log("");
  console.log("Restuls");
  console.log("--------");

  if (stderr !== "" && typeof stderr !== 'undefined' && stderr === null) {
    console.log(stderr);
    console.log("");
    console.log("");
  }

  if (error !== null) {
    console.log(error);
    console.log("");
    console.log("");
  }

  console.log(stdout);
  console.log("");
  console.log("");

}

function execute(command, callback) {
  exec(command, function (error, stdout, stderr) {
    handleExecDone(error, stdout, stderr, callback, command);
  });
}

// Handle regular command executions
function handleExecDone(error, stdout, stderr, callback, command) {
  if(ECHO){
    printExecResultsToConsole(error, stdout, stderr, command);
  }

  if (error !== null) {
    callback(stderr, null);
    return;
  }

  if (stderr !== "" && typeof stderr !== 'undefined' && stderr === null) {
    callback(stderr, null);
    return;
  }

  callback(null, stdout);
}

var walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function(file) {
      //file = dir + '/' + file;
      file = file;
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

main();