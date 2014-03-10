var dummyInputDirectory = "z:\\input\\";
var dummyOutputDirectory = "z:\\output\\";
var dummyInputItem = "input.mp4";
var dummyOutputItem = "output.mp4";
var dummyTrackInto = [{
  "TrackNumber": 1,
  "SongTitle": "Test title here",
  "startingAt": {
    "hour": 0,
    "minute": 0,
    "second": 0,
    "formattedTime": "00:00:00"
  },
  "endingAt": {
    "hour": 0,
    "minute": 3,
    "second": 31,
    "formattedTime": "00:03:31"
  }
}, {
  "TrackNumber": 2,
  "SongTitle": "The second track",
  "startingAt": {
    "hour": 0,
    "minute": 3,
    "second": 31,
    "formattedTime": "00:03:31"
  },
  "endingAt": {
    "hour": 0,
    "minute": 7,
    "second": 9,
    "formattedTime": "00:07:09"
  }
}, {
  "TrackNumber": 3,
  "SongTitle": "Third track",
  "startingAt": {
    "hour": 0,
    "minute": 7,
    "second": 9,
    "formattedTime": "00:07:09"
  },
  "endingAt": null,
}];

describe("Command Line Generation ", function () {

  it("Sould spit out a single expected ffmpeg command given a single file with no track/time info", function () {

    var expectedFfmpegeCommand = ['ffmpeg.exe -i "' + dummyInputDirectory + dummyInputItem +
      '" -vn -y -acodec copy "' + dummyOutputDirectory + dummyOutputDirectory + '"'
    ];

    var actualFfmpegCommand = window.me.joshbennett.CommandLineGenerator.getCommand(dummyInputDirectory, dummyInputItem, dummyOutputDirectory, dummyOutputItem);

    expect(actualFfmpegCommand).toEqual(expectedFfmpegeCommand);

  });

  it("Sould spit out a three ffmpeg commands given a single file with track/time info", function () {

    var expectedFfmpegeCommands = [
      'ffmpeg.exe -i "' + dummyInputDirectory + dummyInputItem //+
      //'" -vn -y -acodec copy -ss ' +  dummyTrackInto[0] , +' -t ' +  +' "' + dummyOutputDirectory + dummyOutputDirectory + '"'
    ];

    var actualFfmpegCommand = window.me.joshbennett.CommandLineGenerator.getCommand(dummyInputDirectory, dummyInputItem, dummyOutputDirectory, dummyOutputItem);

    expect(actualFfmpegCommand).toEqual(expectedFfmpegeCommand);

  });

});