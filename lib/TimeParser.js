(function () {
  "use strict";

  var root;

  if (
    typeof module !== "undefined" &&
    module !== null &&
    typeof module.exports !== undefined &&
    module.exports !== null) {
    root = module.exports;

  } else {
    window.me = window.me || {};
    window.me.joshbennett = window.me.joshbennett || {};
    root = window.me.joshbennett;
  }

  (function (root) {

    var trackListFormatMatches = {
      Default: new RegExp("^(\\d+)\\.\\s+(.+?)\\s+(\\d+):(\\d+)$", "mig"),
      DefaultWithHours: new RegExp("^(\\d+)\\.\\s+(.+?)\\s+(\\d+):(\\d+):(\\d+)$", "mig"),
      DefaultWithOutTrackNumber: new RegExp("^(.+?)\\s+(\\d+):(\\d+)$", "mig")
    };

    var trackListCallbacks = {
      Default: function (rawTrackString, rawNextTrackString) {
        return {
          "TrackNumber": parseInt(rawTrackString.replace(trackListFormatMatches.Default, "$1")),
          "SongTitle": rawTrackString.replace(trackListFormatMatches.Default, "$2"),
          "startingAt": {
            "hour": 0,
            "minute": parseInt(rawTrackString.replace(trackListFormatMatches.Default, "$3")),
            "second": parseInt(rawTrackString.replace(trackListFormatMatches.Default, "$4")),
          },
          "endingAt": rawNextTrackString === null ? null : {
            "hour": 0,
            "minute": parseInt(rawNextTrackString.replace(trackListFormatMatches.Default, "$3")),
            "second": parseInt(rawNextTrackString.replace(trackListFormatMatches.Default, "$4"))
          }
        };
      }
    };

    function trim(str){
      return str.replace(/^\s+|\s+$/, "");
    }
    
    function ruleDoesNotExist(formatRuleName) {
      return (
        typeof trackListFormatMatches[formatRuleName] === "undefined" ||
        trackListFormatMatches[formatRuleName] === null || !(trackListFormatMatches[formatRuleName] instanceof RegExp) ||
        typeof trackListCallbacks[formatRuleName] === "undefined" ||
        trackListCallbacks[formatRuleName] === null || !(trackListCallbacks[formatRuleName] instanceof Function)
      );
    }

    root.TimeParser = (function () {

      return {

        parseFromString: function (trackListings, formatRuleName) {

          var trackList = trim(trackListings).split(/[\n\r]+/),
            curTrack = 0,
            nextTrackInList = null,
            formatName = formatRuleName ? formatRuleName : "Default",
            results = [];
          
          if (ruleDoesNotExist(formatName)) {
            throw "The Formatting rule named \"" + formatName + "\" does not exist.";
          }

          for (;curTrack < trackList.length; curTrack ++) {
            nextTrackInList = typeof trackList[curTrack + 1] === "undefined" ? null : trackList[curTrack + 1];
            results.push(trackListCallbacks[formatName](trackList[curTrack], nextTrackInList));
          }

          return results;
        }

      };

    }());

  }(root));


}());