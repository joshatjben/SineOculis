var dummyInputDirectory = "z:\\input\\";
var dummyOutputDirectory = "z:\\output\\";
var dummyInputFile = "input.mp4";
var dummyOutputFile = "output.mp4";

var dummyTrackList = [{
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

describe("Command Line Interface ", function () {

    it("Sould generate ffmpeg command given a single input and single output file when no track/time info is specified", function () {

        var expectedFfmpegeCommand = 'ffmpeg.exe -i "' + dummyInputDirectory + dummyInputFile +
            '" -vn -y -acodec copy "' + 
            dummyOutputDirectory + dummyOutputFile + '"';

        var clg = new window.me.joshbennett.CommandLineGenerator(dummyInputDirectory, dummyInputFile, dummyOutputDirectory, dummyOutputFile);
        var actualFfmpegCommand = clg.getCommand();

        expect(actualFfmpegCommand).toEqual(expectedFfmpegeCommand);

    });

    it("Sould spit out three ffmpeg commands given a single file with track/time info", function () {

        var expectedFfmpegeCommands = [
            'ffmpeg.exe -i "' + dummyInputDirectory + dummyInputFile + 
                '" -vn -y -acodec copy -ss ' + 
                dummyTrackList[0].startingAt.formattedTime + ' -t ' + 
                dummyTrackList[0].endingAt.formattedTime + ' "' + 
                dummyOutputDirectory + dummyOutputDirectory + '"',
            'ffmpeg.exe -i "' + dummyInputDirectory + dummyInputFile + 
                '" -vn -y -acodec copy -ss ' + 
                dummyTrackList[1].startingAt.formattedTime + ' -t ' + 
                dummyTrackList[1].endingAt.formattedTime + ' "' + 
                dummyOutputDirectory + dummyOutputDirectory + '"',
            'ffmpeg.exe -i "' + dummyInputDirectory + dummyInputFile + 
                '" -vn -y -acodec copy -ss ' + 
                dummyTrackList[2].startingAt.formattedTime + 
                dummyOutputDirectory + dummyOutputDirectory + '"'
        ];
        
        var clg = new window.me.joshbennett.CommandLineGenerator(dummyInputDirectory, dummyInputFile, dummyOutputDirectory, dummyOutputFile, dummyTrackList);
        var actualFfmpegCommand = clg.getCommand();

        expect(actualFfmpegCommand).toEqual(expectedFfmpegeCommands);
    });

});