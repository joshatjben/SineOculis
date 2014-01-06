# SineOculis
A simple node js script that uses ffmpeg to extract audio from video files.

## Usage
### Example
```
node soculis.js --inputDir "c:\music\folder" --ouputDir "c:\music\output" --fileType mp4
```

### Options:
**--inputDir**   *[required]*  
**--outputDir**  *[required]*  
**--fileType**   *[required]*

## Install

### Windows / Mac
Grab the latest code from https://github.com/joshatjben/SineOculis  
```sh
git clone https://github.com/joshatjben/SineOculis.git
```
Install required node modules 
```sh
npm install
```
Make sure you have [ffmpeg](http://www.ffmpeg.org/download.html) installed, which you can download [here](http://www.ffmpeg.org/download.html)

### Ubuntu/Debian
Grab the latest code from https://github.com/joshatjben/SineOculis  
```sh
git clone https://github.com/joshatjben/SineOculis.git
```

Install required node modules
```sh
npm install
```

Make sure you have [ffmpeg](http://www.ffmpeg.org/download.html) installed using
```sh
sudo apt-get install ffmpeg
```

### Fedora
Grab the latest code from https://github.com/joshatjben/SineOculis  
```sh
git clone https://github.com/joshatjben/SineOculis.git
```

Install required node modules
```sh
npm install
```

Make sure you have [ffmpeg](http://www.ffmpeg.org/download.html) installed using
```sh
su -c 'yum -y install ffmpeg'
```