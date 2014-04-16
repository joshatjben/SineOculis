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

    function CommandLineGenerator(inputDirectory, inputFile, outputDirectory, outputFile, times) {

        var _inputDirectory = inputDirectory, 
            _inputFile = inputFile, 
            _outputDirectory = outputDirectory, 
            _outputFile = outputFile, 
            _timeList = times,
            BASE_COMMAND = 'ffmpeg.exe -i "',
            COPY_COMMAND = '" -vn -y -acodec copy "';
        
        ValidateTimeList();

        function GenerateCommandForSingleFileInputAndSingleFileOutput() {
            return BASE_COMMAND + _inputDirectory + _inputFile + COPY_COMMAND + _outputDirectory + _outputFile + '"';
        }

        function GenerateCommandForMultiFileOutputBasedOnSingleFileInputAndTimeList() {
            var curTimeInfo, timeIndex;
            
            for(timeIndex = 0; timeIndex < _timeList.length ){
                
            }
        }
        
        this.ValidateTimeList(timeList){
            if(typeof timelist !== 'array'){
                throw "time list should be an array";
            }
        }

        this.getCommand = function() {

            if (typeof _timeList === "object") {
                return GenerateCommandForMultiFileOutputBasedOnSingleFileInputAndTimeList(inputDirectory, inputFile, outputDirectory, outputFile, times);
            }

            return GenerateCommandForSingleFileInputAndSingleFileOutput(inputDirectory, inputFile, outputDirectory, outputFile);
        }
        
        // Getters and Setters
        this.setInputDirectory = function(dir){
            _inputDirectory;
        }
        
        this.getInputDirectory = function(){
            return _inputDirectory;
        }
        
        this.setInputFile = function(file){
            _inputFile = file;
        }
        
        this.getInputFile = function(){
            return _inputFile;
        }
        
        this.setOutputDirectory = function(dir){
            _outputDirectory = file;
        }
        
        this.getOutputDirectory = function(){
            return _outputFile;
        }
        
        this.setOutputFile = function(file){
            _outputFile = file;
        }
        
        this.getOutputFile = function(){
            return _outputFile;
        }
        
        this.setTimeList = function(times){
            ValidateTimeList();
            _timeList = times;
        }
        
        this.getTimeList = function(){
            return _timeList;
        }
    }
    
    root.CommandLineGenerator = CommandLineGenerator;


}());