
var Module;

if (typeof Module === 'undefined') Module = eval('(function() { try { return Module || {} } catch(e) { return {} } })()');

if (!Module.expectedDataFileDownloads) {
  Module.expectedDataFileDownloads = 0;
  Module.finishedDataFileDownloads = 0;
}
Module.expectedDataFileDownloads++;
(function() {
 var loadPackage = function(metadata) {

    var PACKAGE_PATH;
    if (typeof window === 'object') {
      PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
    } else if (typeof location !== 'undefined') {
      // worker
      PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
    } else {
      throw 'using preloaded data can only be done on a web page or in a web worker';
    }
    var PACKAGE_NAME = 'game.data';
    var REMOTE_PACKAGE_BASE = 'game.data';
    if (typeof Module['locateFilePackage'] === 'function' && !Module['locateFile']) {
      Module['locateFile'] = Module['locateFilePackage'];
      Module.printErr('warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)');
    }
    var REMOTE_PACKAGE_NAME = typeof Module['locateFile'] === 'function' ?
                              Module['locateFile'](REMOTE_PACKAGE_BASE) :
                              ((Module['filePackagePrefixURL'] || '') + REMOTE_PACKAGE_BASE);
  
    var REMOTE_PACKAGE_SIZE = metadata.remote_package_size;
    var PACKAGE_UUID = metadata.package_uuid;
  
    function fetchRemotePackage(packageName, packageSize, callback, errback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', packageName, true);
      xhr.responseType = 'arraybuffer';
      xhr.onprogress = function(event) {
        var url = packageName;
        var size = packageSize;
        if (event.total) size = event.total;
        if (event.loaded) {
          if (!xhr.addedTotal) {
            xhr.addedTotal = true;
            if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
            Module.dataFileDownloads[url] = {
              loaded: event.loaded,
              total: size
            };
          } else {
            Module.dataFileDownloads[url].loaded = event.loaded;
          }
          var total = 0;
          var loaded = 0;
          var num = 0;
          for (var download in Module.dataFileDownloads) {
          var data = Module.dataFileDownloads[download];
            total += data.total;
            loaded += data.loaded;
            num++;
          }
          total = Math.ceil(total * Module.expectedDataFileDownloads/num);
          if (Module['setStatus']) Module['setStatus']('Downloading data... (' + loaded + '/' + total + ')');
        } else if (!Module.dataFileDownloads) {
          if (Module['setStatus']) Module['setStatus']('Downloading data...');
        }
      };
      xhr.onload = function(event) {
        var packageData = xhr.response;
        callback(packageData);
      };
      xhr.send(null);
    };

    function handleError(error) {
      console.error('package error:', error);
    };
  
      var fetched = null, fetchedCallback = null;
      fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, function(data) {
        if (fetchedCallback) {
          fetchedCallback(data);
          fetchedCallback = null;
        } else {
          fetched = data;
        }
      }, handleError);
    
  function runWithFS() {

    function assert(check, msg) {
      if (!check) throw msg + new Error().stack;
    }
Module['FS_createPath']('/', 'assets', true, true);
Module['FS_createPath']('/assets', 'Meteors', true, true);
Module['FS_createPath']('/assets', 'UI', true, true);
Module['FS_createPath']('/assets', 'backgrounds', true, true);
Module['FS_createPath']('/assets', 'damage', true, true);
Module['FS_createPath']('/assets', 'effects', true, true);
Module['FS_createPath']('/assets', 'enemies', true, true);
Module['FS_createPath']('/assets/enemies', 'boss', true, true);
Module['FS_createPath']('/assets/enemies', 'chronos', true, true);
Module['FS_createPath']('/assets/enemies', 'default', true, true);
Module['FS_createPath']('/assets/enemies', 'juggernaut', true, true);
Module['FS_createPath']('/assets/enemies', 'scout', true, true);
Module['FS_createPath']('/assets/enemies', 'spitfire', true, true);
Module['FS_createPath']('/assets', 'music', true, true);
Module['FS_createPath']('/assets', 'powerups', true, true);
Module['FS_createPath']('/assets', 'ships', true, true);
Module['FS_createPath']('/assets/ships', 'ship1', true, true);
Module['FS_createPath']('/assets/ships', 'ship2', true, true);
Module['FS_createPath']('/assets/ships', 'ship3', true, true);
Module['FS_createPath']('/assets', 'ui', true, true);
Module['FS_createPath']('/assets/ui', 'buttons', true, true);
Module['FS_createPath']('/assets/ui', 'lives', true, true);
Module['FS_createPath']('/assets/ui', 'numbers', true, true);
Module['FS_createPath']('/assets', 'weapons', true, true);
Module['FS_createPath']('/assets/weapons', 'blue', true, true);
Module['FS_createPath']('/assets/weapons', 'green', true, true);
Module['FS_createPath']('/assets/weapons', 'red', true, true);
Module['FS_createPath']('/', 'classes', true, true);

    function DataRequest(start, end, crunched, audio) {
      this.start = start;
      this.end = end;
      this.crunched = crunched;
      this.audio = audio;
    }
    DataRequest.prototype = {
      requests: {},
      open: function(mode, name) {
        this.name = name;
        this.requests[name] = this;
        Module['addRunDependency']('fp ' + this.name);
      },
      send: function() {},
      onload: function() {
        var byteArray = this.byteArray.subarray(this.start, this.end);

          this.finish(byteArray);

      },
      finish: function(byteArray) {
        var that = this;

        Module['FS_createDataFile'](this.name, null, byteArray, true, true, true); // canOwn this data in the filesystem, it is a slide into the heap that will never change
        Module['removeRunDependency']('fp ' + that.name);

        this.requests[this.name] = null;
      },
    };

        var files = metadata.files;
        for (i = 0; i < files.length; ++i) {
          new DataRequest(files[i].start, files[i].end, files[i].crunched, files[i].audio).open('GET', files[i].filename);
        }

  
    function processPackageData(arrayBuffer) {
      Module.finishedDataFileDownloads++;
      assert(arrayBuffer, 'Loading data file failed.');
      assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
      var byteArray = new Uint8Array(arrayBuffer);
      var curr;
      
        // copy the entire loaded file into a spot in the heap. Files will refer to slices in that. They cannot be freed though
        // (we may be allocating before malloc is ready, during startup).
        if (Module['SPLIT_MEMORY']) Module.printErr('warning: you should run the file packager with --no-heap-copy when SPLIT_MEMORY is used, otherwise copying into the heap may fail due to the splitting');
        var ptr = Module['getMemory'](byteArray.length);
        Module['HEAPU8'].set(byteArray, ptr);
        DataRequest.prototype.byteArray = Module['HEAPU8'].subarray(ptr, ptr+byteArray.length);
  
          var files = metadata.files;
          for (i = 0; i < files.length; ++i) {
            DataRequest.prototype.requests[files[i].filename].onload();
          }
              Module['removeRunDependency']('datafile_game.data');

    };
    Module['addRunDependency']('datafile_game.data');
  
    if (!Module.preloadResults) Module.preloadResults = {};
  
      Module.preloadResults[PACKAGE_NAME] = {fromCache: false};
      if (fetched) {
        processPackageData(fetched);
        fetched = null;
      } else {
        fetchedCallback = processPackageData;
      }
    
  }
  if (Module['calledRun']) {
    runWithFS();
  } else {
    if (!Module['preRun']) Module['preRun'] = [];
    Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
  }

 }
 loadPackage({"files": [{"audio": 0, "start": 0, "crunched": 0, "end": 123, "filename": "/conf.lua"}, {"audio": 0, "start": 123, "crunched": 0, "end": 1309, "filename": "/draw.lua"}, {"audio": 0, "start": 1309, "crunched": 0, "end": 1769, "filename": "/library.lua"}, {"audio": 0, "start": 1769, "crunched": 0, "end": 3044, "filename": "/load.lua"}, {"audio": 0, "start": 3044, "crunched": 0, "end": 5576, "filename": "/main.lua"}, {"audio": 0, "start": 5576, "crunched": 0, "end": 7105, "filename": "/assets/Meteors/meteorBrown_big1.png"}, {"audio": 0, "start": 7105, "crunched": 0, "end": 8975, "filename": "/assets/Meteors/meteorBrown_big2.png"}, {"audio": 0, "start": 8975, "crunched": 0, "end": 10458, "filename": "/assets/Meteors/meteorBrown_big3.png"}, {"audio": 0, "start": 10458, "crunched": 0, "end": 12113, "filename": "/assets/Meteors/meteorBrown_big4.png"}, {"audio": 0, "start": 12113, "crunched": 0, "end": 13079, "filename": "/assets/Meteors/meteorBrown_med1.png"}, {"audio": 0, "start": 13079, "crunched": 0, "end": 13960, "filename": "/assets/Meteors/meteorBrown_med3.png"}, {"audio": 0, "start": 13960, "crunched": 0, "end": 14652, "filename": "/assets/Meteors/meteorBrown_small1.png"}, {"audio": 0, "start": 14652, "crunched": 0, "end": 15319, "filename": "/assets/Meteors/meteorBrown_small2.png"}, {"audio": 0, "start": 15319, "crunched": 0, "end": 15780, "filename": "/assets/Meteors/meteorBrown_tiny1.png"}, {"audio": 0, "start": 15780, "crunched": 0, "end": 16151, "filename": "/assets/Meteors/meteorBrown_tiny2.png"}, {"audio": 0, "start": 16151, "crunched": 0, "end": 17680, "filename": "/assets/Meteors/meteorGrey_big1.png"}, {"audio": 0, "start": 17680, "crunched": 0, "end": 19550, "filename": "/assets/Meteors/meteorGrey_big2.png"}, {"audio": 0, "start": 19550, "crunched": 0, "end": 21033, "filename": "/assets/Meteors/meteorGrey_big3.png"}, {"audio": 0, "start": 21033, "crunched": 0, "end": 22688, "filename": "/assets/Meteors/meteorGrey_big4.png"}, {"audio": 0, "start": 22688, "crunched": 0, "end": 23654, "filename": "/assets/Meteors/meteorGrey_med1.png"}, {"audio": 0, "start": 23654, "crunched": 0, "end": 24518, "filename": "/assets/Meteors/meteorGrey_med2.png"}, {"audio": 0, "start": 24518, "crunched": 0, "end": 25195, "filename": "/assets/Meteors/meteorGrey_small1.png"}, {"audio": 0, "start": 25195, "crunched": 0, "end": 25852, "filename": "/assets/Meteors/meteorGrey_small2.png"}, {"audio": 0, "start": 25852, "crunched": 0, "end": 26315, "filename": "/assets/Meteors/meteorGrey_tiny1.png"}, {"audio": 0, "start": 26315, "crunched": 0, "end": 26687, "filename": "/assets/Meteors/meteorGrey_tiny2.png"}, {"audio": 0, "start": 26687, "crunched": 0, "end": 27622, "filename": "/assets/UI/cursor.png"}, {"audio": 0, "start": 27622, "crunched": 0, "end": 28593, "filename": "/assets/backgrounds/black.png"}, {"audio": 0, "start": 28593, "crunched": 0, "end": 29761, "filename": "/assets/backgrounds/blue.png"}, {"audio": 0, "start": 29761, "crunched": 0, "end": 31010, "filename": "/assets/backgrounds/dpurple.png"}, {"audio": 0, "start": 31010, "crunched": 0, "end": 32456, "filename": "/assets/backgrounds/purple.png"}, {"audio": 0, "start": 32456, "crunched": 0, "end": 33558, "filename": "/assets/damage/playerShip1_damage1.png"}, {"audio": 0, "start": 33558, "crunched": 0, "end": 34864, "filename": "/assets/damage/playerShip1_damage2.png"}, {"audio": 0, "start": 34864, "crunched": 0, "end": 36337, "filename": "/assets/damage/playerShip1_damage3.png"}, {"audio": 0, "start": 36337, "crunched": 0, "end": 37526, "filename": "/assets/damage/playerShip2_damage1.png"}, {"audio": 0, "start": 37526, "crunched": 0, "end": 38943, "filename": "/assets/damage/playerShip2_damage2.png"}, {"audio": 0, "start": 38943, "crunched": 0, "end": 40407, "filename": "/assets/damage/playerShip2_damage3.png"}, {"audio": 0, "start": 40407, "crunched": 0, "end": 41408, "filename": "/assets/damage/playerShip3_damage1.png"}, {"audio": 0, "start": 41408, "crunched": 0, "end": 42625, "filename": "/assets/damage/playerShip3_damage2.png"}, {"audio": 0, "start": 42625, "crunched": 0, "end": 43981, "filename": "/assets/damage/playerShip3_damage3.png"}, {"audio": 0, "start": 43981, "crunched": 0, "end": 44326, "filename": "/assets/effects/fire00.png"}, {"audio": 0, "start": 44326, "crunched": 0, "end": 44919, "filename": "/assets/effects/fire01.png"}, {"audio": 0, "start": 44919, "crunched": 0, "end": 45516, "filename": "/assets/effects/fire02.png"}, {"audio": 0, "start": 45516, "crunched": 0, "end": 46098, "filename": "/assets/effects/fire03.png"}, {"audio": 0, "start": 46098, "crunched": 0, "end": 46775, "filename": "/assets/effects/fire04.png"}, {"audio": 0, "start": 46775, "crunched": 0, "end": 47559, "filename": "/assets/effects/fire05.png"}, {"audio": 0, "start": 47559, "crunched": 0, "end": 48188, "filename": "/assets/effects/fire06.png"}, {"audio": 0, "start": 48188, "crunched": 0, "end": 48922, "filename": "/assets/effects/fire07.png"}, {"audio": 0, "start": 48922, "crunched": 0, "end": 49300, "filename": "/assets/effects/fire08.png"}, {"audio": 0, "start": 49300, "crunched": 0, "end": 49687, "filename": "/assets/effects/fire09.png"}, {"audio": 0, "start": 49687, "crunched": 0, "end": 50034, "filename": "/assets/effects/fire10.png"}, {"audio": 0, "start": 50034, "crunched": 0, "end": 50645, "filename": "/assets/effects/fire11.png"}, {"audio": 0, "start": 50645, "crunched": 0, "end": 51232, "filename": "/assets/effects/fire12.png"}, {"audio": 0, "start": 51232, "crunched": 0, "end": 51820, "filename": "/assets/effects/fire13.png"}, {"audio": 0, "start": 51820, "crunched": 0, "end": 52504, "filename": "/assets/effects/fire14.png"}, {"audio": 0, "start": 52504, "crunched": 0, "end": 53284, "filename": "/assets/effects/fire15.png"}, {"audio": 0, "start": 53284, "crunched": 0, "end": 53925, "filename": "/assets/effects/fire16.png"}, {"audio": 0, "start": 53925, "crunched": 0, "end": 54664, "filename": "/assets/effects/fire17.png"}, {"audio": 0, "start": 54664, "crunched": 0, "end": 55045, "filename": "/assets/effects/fire18.png"}, {"audio": 0, "start": 55045, "crunched": 0, "end": 55431, "filename": "/assets/effects/fire19.png"}, {"audio": 0, "start": 55431, "crunched": 0, "end": 56864, "filename": "/assets/effects/shield1.png"}, {"audio": 0, "start": 56864, "crunched": 0, "end": 58982, "filename": "/assets/effects/shield2.png"}, {"audio": 0, "start": 58982, "crunched": 0, "end": 61786, "filename": "/assets/effects/shield3.png"}, {"audio": 0, "start": 61786, "crunched": 0, "end": 62094, "filename": "/assets/effects/speed.png"}, {"audio": 0, "start": 62094, "crunched": 0, "end": 62406, "filename": "/assets/effects/star1.png"}, {"audio": 0, "start": 62406, "crunched": 0, "end": 62751, "filename": "/assets/effects/star2.png"}, {"audio": 0, "start": 62751, "crunched": 0, "end": 63121, "filename": "/assets/effects/star3.png"}, {"audio": 0, "start": 63121, "crunched": 0, "end": 78057, "filename": "/assets/enemies/boss/blackheart.png"}, {"audio": 0, "start": 78057, "crunched": 0, "end": 86471, "filename": "/assets/enemies/boss/helion.png"}, {"audio": 0, "start": 86471, "crunched": 0, "end": 93167, "filename": "/assets/enemies/boss/lightwalker.png"}, {"audio": 0, "start": 93167, "crunched": 0, "end": 102273, "filename": "/assets/enemies/boss/tempest.png"}, {"audio": 0, "start": 102273, "crunched": 0, "end": 104719, "filename": "/assets/enemies/chronos/black.png"}, {"audio": 0, "start": 104719, "crunched": 0, "end": 107188, "filename": "/assets/enemies/chronos/blue.png"}, {"audio": 0, "start": 107188, "crunched": 0, "end": 109657, "filename": "/assets/enemies/chronos/green.png"}, {"audio": 0, "start": 109657, "crunched": 0, "end": 112126, "filename": "/assets/enemies/chronos/red.png"}, {"audio": 0, "start": 112126, "crunched": 0, "end": 114788, "filename": "/assets/enemies/default/black.png"}, {"audio": 0, "start": 114788, "crunched": 0, "end": 117516, "filename": "/assets/enemies/default/blue.png"}, {"audio": 0, "start": 117516, "crunched": 0, "end": 120253, "filename": "/assets/enemies/default/green.png"}, {"audio": 0, "start": 120253, "crunched": 0, "end": 122990, "filename": "/assets/enemies/default/red.png"}, {"audio": 0, "start": 122990, "crunched": 0, "end": 125079, "filename": "/assets/enemies/juggernaut/black.png"}, {"audio": 0, "start": 125079, "crunched": 0, "end": 127188, "filename": "/assets/enemies/juggernaut/blue.png"}, {"audio": 0, "start": 127188, "crunched": 0, "end": 129297, "filename": "/assets/enemies/juggernaut/green.png"}, {"audio": 0, "start": 129297, "crunched": 0, "end": 131406, "filename": "/assets/enemies/juggernaut/red.png"}, {"audio": 0, "start": 131406, "crunched": 0, "end": 134064, "filename": "/assets/enemies/scout/black.png"}, {"audio": 0, "start": 134064, "crunched": 0, "end": 136787, "filename": "/assets/enemies/scout/blue.png"}, {"audio": 0, "start": 136787, "crunched": 0, "end": 139519, "filename": "/assets/enemies/scout/green.png"}, {"audio": 0, "start": 139519, "crunched": 0, "end": 142251, "filename": "/assets/enemies/scout/red.png"}, {"audio": 0, "start": 142251, "crunched": 0, "end": 145404, "filename": "/assets/enemies/spitfire/enemyBlack3.png"}, {"audio": 0, "start": 145404, "crunched": 0, "end": 148620, "filename": "/assets/enemies/spitfire/enemyBlue3.png"}, {"audio": 0, "start": 148620, "crunched": 0, "end": 151837, "filename": "/assets/enemies/spitfire/enemyGreen3.png"}, {"audio": 0, "start": 151837, "crunched": 0, "end": 155054, "filename": "/assets/enemies/spitfire/enemyRed3.png"}, {"audio": 1, "start": 155054, "crunched": 0, "end": 10442501, "filename": "/assets/music/background.mp3"}, {"audio": 0, "start": 10442501, "crunched": 0, "end": 10443192, "filename": "/assets/powerups/damage_bronze.png"}, {"audio": 0, "start": 10443192, "crunched": 0, "end": 10443867, "filename": "/assets/powerups/damage_gold.png"}, {"audio": 0, "start": 10443867, "crunched": 0, "end": 10444504, "filename": "/assets/powerups/damage_silver.png"}, {"audio": 0, "start": 10444504, "crunched": 0, "end": 10445087, "filename": "/assets/powerups/special_bronze.png"}, {"audio": 0, "start": 10445087, "crunched": 0, "end": 10445646, "filename": "/assets/powerups/special_gold.png"}, {"audio": 0, "start": 10445646, "crunched": 0, "end": 10446183, "filename": "/assets/powerups/special_silver.png"}, {"audio": 0, "start": 10446183, "crunched": 0, "end": 10448802, "filename": "/assets/ships/ship1/blue.png"}, {"audio": 0, "start": 10448802, "crunched": 0, "end": 10451421, "filename": "/assets/ships/ship1/green.png"}, {"audio": 0, "start": 10451421, "crunched": 0, "end": 10453819, "filename": "/assets/ships/ship1/orange.png"}, {"audio": 0, "start": 10453819, "crunched": 0, "end": 10456438, "filename": "/assets/ships/ship1/red.png"}, {"audio": 0, "start": 10456438, "crunched": 0, "end": 10460229, "filename": "/assets/ships/ship2/blue.png"}, {"audio": 0, "start": 10460229, "crunched": 0, "end": 10464029, "filename": "/assets/ships/ship2/green.png"}, {"audio": 0, "start": 10464029, "crunched": 0, "end": 10467626, "filename": "/assets/ships/ship2/orange.png"}, {"audio": 0, "start": 10467626, "crunched": 0, "end": 10471423, "filename": "/assets/ships/ship2/red.png"}, {"audio": 0, "start": 10471423, "crunched": 0, "end": 10474257, "filename": "/assets/ships/ship3/blue.png"}, {"audio": 0, "start": 10474257, "crunched": 0, "end": 10477104, "filename": "/assets/ships/ship3/green.png"}, {"audio": 0, "start": 10477104, "crunched": 0, "end": 10479691, "filename": "/assets/ships/ship3/orange.png"}, {"audio": 0, "start": 10479691, "crunched": 0, "end": 10482543, "filename": "/assets/ships/ship3/red.png"}, {"audio": 0, "start": 10482543, "crunched": 0, "end": 10483012, "filename": "/assets/ui/buttons/buttonBlue.png"}, {"audio": 0, "start": 10483012, "crunched": 0, "end": 10483498, "filename": "/assets/ui/buttons/buttonGreen.png"}, {"audio": 0, "start": 10483498, "crunched": 0, "end": 10483974, "filename": "/assets/ui/buttons/buttonRed.png"}, {"audio": 0, "start": 10483974, "crunched": 0, "end": 10484438, "filename": "/assets/ui/buttons/buttonYellow.png"}, {"audio": 0, "start": 10484438, "crunched": 0, "end": 10485209, "filename": "/assets/ui/lives/playerLife1_blue.png"}, {"audio": 0, "start": 10485209, "crunched": 0, "end": 10485987, "filename": "/assets/ui/lives/playerLife1_green.png"}, {"audio": 0, "start": 10485987, "crunched": 0, "end": 10486758, "filename": "/assets/ui/lives/playerLife1_orange.png"}, {"audio": 0, "start": 10486758, "crunched": 0, "end": 10487533, "filename": "/assets/ui/lives/playerLife1_red.png"}, {"audio": 0, "start": 10487533, "crunched": 0, "end": 10488442, "filename": "/assets/ui/lives/playerLife2_blue.png"}, {"audio": 0, "start": 10488442, "crunched": 0, "end": 10489360, "filename": "/assets/ui/lives/playerLife2_green.png"}, {"audio": 0, "start": 10489360, "crunched": 0, "end": 10490274, "filename": "/assets/ui/lives/playerLife2_orange.png"}, {"audio": 0, "start": 10490274, "crunched": 0, "end": 10491187, "filename": "/assets/ui/lives/playerLife2_red.png"}, {"audio": 0, "start": 10491187, "crunched": 0, "end": 10491922, "filename": "/assets/ui/lives/playerLife3_blue.png"}, {"audio": 0, "start": 10491922, "crunched": 0, "end": 10492661, "filename": "/assets/ui/lives/playerLife3_green.png"}, {"audio": 0, "start": 10492661, "crunched": 0, "end": 10493399, "filename": "/assets/ui/lives/playerLife3_orange.png"}, {"audio": 0, "start": 10493399, "crunched": 0, "end": 10494135, "filename": "/assets/ui/lives/playerLife3_red.png"}, {"audio": 0, "start": 10494135, "crunched": 0, "end": 10494368, "filename": "/assets/ui/numbers/numeral0.png"}, {"audio": 0, "start": 10494368, "crunched": 0, "end": 10494621, "filename": "/assets/ui/numbers/numeral1.png"}, {"audio": 0, "start": 10494621, "crunched": 0, "end": 10494850, "filename": "/assets/ui/numbers/numeral2.png"}, {"audio": 0, "start": 10494850, "crunched": 0, "end": 10495076, "filename": "/assets/ui/numbers/numeral3.png"}, {"audio": 0, "start": 10495076, "crunched": 0, "end": 10495325, "filename": "/assets/ui/numbers/numeral4.png"}, {"audio": 0, "start": 10495325, "crunched": 0, "end": 10495551, "filename": "/assets/ui/numbers/numeral5.png"}, {"audio": 0, "start": 10495551, "crunched": 0, "end": 10495787, "filename": "/assets/ui/numbers/numeral6.png"}, {"audio": 0, "start": 10495787, "crunched": 0, "end": 10496011, "filename": "/assets/ui/numbers/numeral7.png"}, {"audio": 0, "start": 10496011, "crunched": 0, "end": 10496238, "filename": "/assets/ui/numbers/numeral8.png"}, {"audio": 0, "start": 10496238, "crunched": 0, "end": 10496476, "filename": "/assets/ui/numbers/numeral9.png"}, {"audio": 0, "start": 10496476, "crunched": 0, "end": 10496893, "filename": "/assets/ui/numbers/numeralX.png"}, {"audio": 0, "start": 10496893, "crunched": 0, "end": 10497628, "filename": "/assets/weapons/default.png"}, {"audio": 0, "start": 10497628, "crunched": 0, "end": 10498372, "filename": "/assets/weapons/blue/laserBlue01.png"}, {"audio": 0, "start": 10498372, "crunched": 0, "end": 10498690, "filename": "/assets/weapons/blue/laserBlue02.png"}, {"audio": 0, "start": 10498690, "crunched": 0, "end": 10498964, "filename": "/assets/weapons/blue/laserBlue03.png"}, {"audio": 0, "start": 10498964, "crunched": 0, "end": 10499286, "filename": "/assets/weapons/blue/laserBlue04.png"}, {"audio": 0, "start": 10499286, "crunched": 0, "end": 10499562, "filename": "/assets/weapons/blue/laserBlue05.png"}, {"audio": 0, "start": 10499562, "crunched": 0, "end": 10500253, "filename": "/assets/weapons/blue/laserBlue06.png"}, {"audio": 0, "start": 10500253, "crunched": 0, "end": 10500870, "filename": "/assets/weapons/blue/laserBlue07.png"}, {"audio": 0, "start": 10500870, "crunched": 0, "end": 10501738, "filename": "/assets/weapons/blue/laserBlue08.png"}, {"audio": 0, "start": 10501738, "crunched": 0, "end": 10502492, "filename": "/assets/weapons/blue/laserBlue09.png"}, {"audio": 0, "start": 10502492, "crunched": 0, "end": 10503263, "filename": "/assets/weapons/blue/laserBlue10.png"}, {"audio": 0, "start": 10503263, "crunched": 0, "end": 10503982, "filename": "/assets/weapons/blue/laserBlue11.png"}, {"audio": 0, "start": 10503982, "crunched": 0, "end": 10504303, "filename": "/assets/weapons/blue/laserBlue12.png"}, {"audio": 0, "start": 10504303, "crunched": 0, "end": 10504584, "filename": "/assets/weapons/blue/laserBlue13.png"}, {"audio": 0, "start": 10504584, "crunched": 0, "end": 10504916, "filename": "/assets/weapons/blue/laserBlue14.png"}, {"audio": 0, "start": 10504916, "crunched": 0, "end": 10505198, "filename": "/assets/weapons/blue/laserBlue15.png"}, {"audio": 0, "start": 10505198, "crunched": 0, "end": 10506000, "filename": "/assets/weapons/blue/laserBlue16.png"}, {"audio": 0, "start": 10506000, "crunched": 0, "end": 10506709, "filename": "/assets/weapons/green/laserGreen01.png"}, {"audio": 0, "start": 10506709, "crunched": 0, "end": 10507030, "filename": "/assets/weapons/green/laserGreen02.png"}, {"audio": 0, "start": 10507030, "crunched": 0, "end": 10507314, "filename": "/assets/weapons/green/laserGreen03.png"}, {"audio": 0, "start": 10507314, "crunched": 0, "end": 10507630, "filename": "/assets/weapons/green/laserGreen04.png"}, {"audio": 0, "start": 10507630, "crunched": 0, "end": 10507908, "filename": "/assets/weapons/green/laserGreen05.png"}, {"audio": 0, "start": 10507908, "crunched": 0, "end": 10508237, "filename": "/assets/weapons/green/laserGreen06.png"}, {"audio": 0, "start": 10508237, "crunched": 0, "end": 10508516, "filename": "/assets/weapons/green/laserGreen07.png"}, {"audio": 0, "start": 10508516, "crunched": 0, "end": 10508834, "filename": "/assets/weapons/green/laserGreen08.png"}, {"audio": 0, "start": 10508834, "crunched": 0, "end": 10509107, "filename": "/assets/weapons/green/laserGreen09.png"}, {"audio": 0, "start": 10509107, "crunched": 0, "end": 10509920, "filename": "/assets/weapons/green/laserGreen10.png"}, {"audio": 0, "start": 10509920, "crunched": 0, "end": 10510669, "filename": "/assets/weapons/green/laserGreen11.png"}, {"audio": 0, "start": 10510669, "crunched": 0, "end": 10511366, "filename": "/assets/weapons/green/laserGreen12.png"}, {"audio": 0, "start": 10511366, "crunched": 0, "end": 10511987, "filename": "/assets/weapons/green/laserGreen13.png"}, {"audio": 0, "start": 10511987, "crunched": 0, "end": 10512855, "filename": "/assets/weapons/green/laserGreen14.png"}, {"audio": 0, "start": 10512855, "crunched": 0, "end": 10513616, "filename": "/assets/weapons/green/laserGreen15.png"}, {"audio": 0, "start": 10513616, "crunched": 0, "end": 10514388, "filename": "/assets/weapons/green/laserGreen16.png"}, {"audio": 0, "start": 10514388, "crunched": 0, "end": 10515123, "filename": "/assets/weapons/red/laserRed01.png"}, {"audio": 0, "start": 10515123, "crunched": 0, "end": 10515433, "filename": "/assets/weapons/red/laserRed02.png"}, {"audio": 0, "start": 10515433, "crunched": 0, "end": 10515708, "filename": "/assets/weapons/red/laserRed03.png"}, {"audio": 0, "start": 10515708, "crunched": 0, "end": 10516025, "filename": "/assets/weapons/red/laserRed04.png"}, {"audio": 0, "start": 10516025, "crunched": 0, "end": 10516297, "filename": "/assets/weapons/red/laserRed05.png"}, {"audio": 0, "start": 10516297, "crunched": 0, "end": 10516986, "filename": "/assets/weapons/red/laserRed06.png"}, {"audio": 0, "start": 10516986, "crunched": 0, "end": 10517596, "filename": "/assets/weapons/red/laserRed07.png"}, {"audio": 0, "start": 10517596, "crunched": 0, "end": 10518464, "filename": "/assets/weapons/red/laserRed08.png"}, {"audio": 0, "start": 10518464, "crunched": 0, "end": 10519216, "filename": "/assets/weapons/red/laserRed09.png"}, {"audio": 0, "start": 10519216, "crunched": 0, "end": 10519946, "filename": "/assets/weapons/red/laserRed10.png"}, {"audio": 0, "start": 10519946, "crunched": 0, "end": 10520617, "filename": "/assets/weapons/red/laserRed11.png"}, {"audio": 0, "start": 10520617, "crunched": 0, "end": 10520935, "filename": "/assets/weapons/red/laserRed12.png"}, {"audio": 0, "start": 10520935, "crunched": 0, "end": 10521217, "filename": "/assets/weapons/red/laserRed13.png"}, {"audio": 0, "start": 10521217, "crunched": 0, "end": 10521544, "filename": "/assets/weapons/red/laserRed14.png"}, {"audio": 0, "start": 10521544, "crunched": 0, "end": 10521822, "filename": "/assets/weapons/red/laserRed15.png"}, {"audio": 0, "start": 10521822, "crunched": 0, "end": 10522625, "filename": "/assets/weapons/red/laserRed16.png"}, {"audio": 0, "start": 10522625, "crunched": 0, "end": 10523520, "filename": "/classes/Bullet.lua"}, {"audio": 0, "start": 10523520, "crunched": 0, "end": 10524400, "filename": "/classes/Enemy.lua"}, {"audio": 0, "start": 10524400, "crunched": 0, "end": 10525609, "filename": "/classes/Ship.lua"}, {"audio": 0, "start": 10525609, "crunched": 0, "end": 10526581, "filename": "/classes/enemyController.lua"}], "remote_package_size": 10526581, "package_uuid": "c9cacf57-53ec-4f08-bce6-53870b10d87c"});

})();
