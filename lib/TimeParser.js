(function () {
    "use strict";

    var root;

    if (typeof exports === 'undefined') {
        window.me = window.me || {};
        window.me.joshbennett = window.me.joshbennett || {};
        root = window.me.joshbennett;
    } else {
        root = exports;
    }

    (function (root) {

        var REGEX_PATTERNS = {
            DefaultTime: new RegExp("^(\\d+)\\.\\s+(.+?)\\s+(\\d+):(\\d+)$", "mig"),
            DefaultTimeWithHours: new RegExp("^(\\d+)\\.\\s+(.+?)\\s+(\\d+):(\\d+):(\\d+)$", "mig"),
            DefaultTimeWithOutTrackNumber: new RegExp("^(.+?)\\s+(\\d+):(\\d+)$", "mig")
        };

        var trackListCallbacks = {
            DefaultTime: function (rawTrackString, rawNextTrackString) {
                return {
                    "TrackNumber": parseInt(rawTrackString.replace(REGEX_PATTERNS.DefaultTime, "$1")),
                    "SongTitle": rawTrackString.replace(REGEX_PATTERNS.DefaultTime, "$2"),
                    "startingAt": {
                        "hour": 0,
                        "minute": parseInt(rawTrackString.replace(REGEX_PATTERNS.DefaultTime, "$3")),
                        "second": parseInt(rawTrackString.replace(REGEX_PATTERNS.DefaultTime, "$4")),
                    },
                    "endingAt": rawNextTrackString === null ? null : {
                        "hour": 0,
                        "minute": parseInt(rawNextTrackString.replace(REGEX_PATTERNS.DefaultTime, "$3")),
                        "second": parseInt(rawNextTrackString.replace(REGEX_PATTERNS.DefaultTime, "$4"))
                    }
                };
            }
        };

        function trim(str) {
            return str.replace(/^\s+|\s+$/, "");
        }

        function ruleDoesNotExist(formatRuleName) {
            return (
                typeof REGEX_PATTERNS[formatRuleName] === "undefined" ||
                REGEX_PATTERNS[formatRuleName] === null ||
                typeof trackListCallbacks[formatRuleName] === "undefined" ||
                trackListCallbacks[formatRuleName] === null
            );
        }

        root.TimeParser = {

            "parseFromString": function (trackListings, formatRuleName) {

                var trackList = trim(trackListings).split(/[\n\r]+/),
                    curTrack = 0,
                    nextTrackInList = null,
                    formatName = formatRuleName ? formatRuleName : "DefaultTime",
                    results = [];

                if (ruleDoesNotExist(formatName)) {
                    throw "The Formatting rule named \"" + formatName + "\" does not exist.";
                }

                for (; curTrack < trackList.length; curTrack++) {
                    nextTrackInList = typeof trackList[curTrack + 1] === "undefined" ? null : trackList[curTrack + 1];
                    results.push(trackListCallbacks[formatName](trackList[curTrack], nextTrackInList));
                }

                return results;
            },

            "getFormatedTrackStartAndEndTime": function (trackInfoObject) {

                throw "not implimented yet";

            }

        };



    }(root));


}).call(this);