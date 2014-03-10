describe("TimeParser", function () {

  var inputTimeString, expectedParsedOutput;

  beforeEach(function () {
    inputTimeString =
      "1. Test title here 0:00\n\r" +
      "2. The second track 03:31\n\r" +
      "3. Third track 07:09\n\r";

    expectedParsedOutput = [{
      "TrackNumber": 1,
      "SongTitle": "Test title here",
      "startingAt": {
        "hour": 0,
        "minute": 0,
        "second": 0
      },
      "endingAt": {
        "hour": 0,
        "minute": 3,
        "second": 31
      }
    }, {
      "TrackNumber": 2,
      "SongTitle": "The second track",
      "startingAt": {
        "hour": 0,
        "minute": 3,
        "second": 31
      },
      "endingAt": {
        "hour": 0,
        "minute": 7,
        "second": 9,
      }
    }, {
      "TrackNumber": 3,
      "SongTitle": "Third track",
      "startingAt": {
        "hour": 0,
        "minute": 7,
        "second": 9
      },
      "endingAt": null,
    }];

    spyOn(window.me.joshbennett.TimeParser, "getFormatedTrackStartAndEndTime").andCallThrough();
    spyOn(window.me.joshbennett.TimeParser, "parseFromString").andCallThrough();

  });

  afterEach(function () {
    inputTimeString = null;
    expectedParsedOutput = null;
  });

  it("should return an array of track information usign the default input format [n. title here hh:mm]", function () {
    var actualParsedOutput = new window.me.joshbennett.TimeParser.parseFromString(inputTimeString);

    expect(actualParsedOutput).toEqual(expectedParsedOutput);
  });

  it("should return throw an error when an invalid formatingName is passed to parseFromString", function () {
    var formatName = "xyzzy";

    expect(window.me.joshbennett.TimeParser.parseFromString.bind(null, inputTimeString, formatName)).toThrow();

  });

  it("should return formated start and end times for the second track in 'expectedParsedOutput'.  the format is hh:mm:ss", function () {
    var expectedFormattedTimes = {
      startTime: "00:03:31",
      endTime: "00:07:09"
    };

    var actualFormattedOutput = new window.me.joshbennett.TimeParser.getFormatedTrackStartAndEndTime(expectedParsedOutput[1]);

    expect(actualParsedOutput).toEqual(expectedParsedOutput);
  });

  it("should handle inproper object handded to getFormatedTrackStartAndEndTime", function () {
    var actualFormattedOutput = new window.me.joshbennett.TimeParser.getFormatedTrackStartAndEndTime({});

    expect(window.me.joshbennett.TimeParser.getFormatedTrackStartAndEndTime.bind(null, {}))
      .toThrowError("Invalid TrackInfo object. expects start at and end at");

    expect(window.me.joshbennett.TimeParser.getFormatedTrackStartAndEndTime.bind(null, {
      "startAt": {
        hour: 0
      }}))
      .toThrowError("Invalid TrackInfo object. expects start at and end at");

  });

});