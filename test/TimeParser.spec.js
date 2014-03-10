describe("TimeParser", function () {
  it("using default input format [n. title here hh:mm] format should return an array of objects containing time, songtitle, songnumber", function () {

    var inputTimeString =
      "1. Test title here 0:00\n\r" +
      "2. The second track 03:31\n\r" +
      "3. Third track 07:09\n\r";

    var expectedParsedOutput = [{
      "TrackNumber": 1,
      "SongTitle": "Test title here",
      "startingAt": {
        "hour": 0,
        "minute": 0,
        "second": 0
      }
    }, {
      "TrackNumber": 2,
      "SongTitle": "The second track",
      "startingAt": {
        "hour": 0,
        "minute": 3,
        "second": 31
      }
    }, {
      "TrackNumber": 3,
      "SongTitle": "Third track",
      "startingAt": {
        "hour": 0,
        "minute": 7,
        "second": 9
      }
    }];

    var actualParsedOutput = new window.me.joshbennett.TimeParser.parseFromString(inputTimeString);

    expect(actualParsedOutput).toEqual(expectedParsedOutput);
  });
});