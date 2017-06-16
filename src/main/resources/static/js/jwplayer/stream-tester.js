(function() {

  // if not stream tester page, return and skip rest of script
  if (!document.getElementById('stream-tester')) {
    return;
  }

  // dom elements
  var win = $(window),
    fileInputEl = $('#file'),
    primaryInputEl = $('[name="primary"]'),
    hlsInputEl = $('[name="hls"]'),
    drmEl = $('#drm'),
    drmItemInputEl = $('[name="drm"]'),
    drmItemEl = $('.drm-item'),
    drmItemOptionsEl = $('.drm-item-options'),
    drmItemInputCheckedEl = drmItemInputEl.filter(':checked'),
    drmItemInputCheckedElValue = drmItemInputCheckedEl.val(),
    drmItemCustomDataInputEl = $('[name="drm-item-custom-data"]'),
    drmWidevineUrlInputEl = $('#drm-widevine-url'),
    drmWidevineCustomNameInputEl = $('#drm-widevine-custom-name'),
    drmWidevineCustomValueInputEl = $('#drm-widevine-custom-value'),
    drmPlayreadyUrlInputEl = $('#drm-playready-url'),
    drmPlayreadyCustomNameInputEl = $('#drm-playready-custom-name'),
    drmPlayreadyCustomValueInputEl = $('#drm-playready-custom-value'),
    drmClearkeyKeyInputEl = $('#drm-clearkey-key'),
    drmClearkeyKeyIdInputEl = $('#drm-clearkey-key-id'),
    drmFairplayCertificateUrlInputEl = $('#drm-fairplay-certificate-url'),
    drmFairplayProcessSpcUrlInputEl = $('#drm-fairplay-process-spc-url'),
    buttonEl = $('[name="button"]'),
    testOutputEl = $('#test-output'),
    outputCodeEl = $('#output-code'),
    playerHttpsEl = $('#'),
    playerHttpEl = $('#stream-tester-player-http'),
    playerHttpIframeEl = playerHttpEl.find('iframe');
    buttonHTTP = $('[name="http-button"]');



  // player instance
  var playerInstance = null;

  // local config object
  var config = {};

  // player config object
  var playerConfig = {};

  // temp item config with default keys
  var data = {
    file: fileInputEl.val(),
    fileProtocol: 'https:',
    primary: 'html5',
    hlshtml: true,
    hls: false,
    drm: null,
    widevine: {},
    playready: {},
    fairplay: {},
    clearkey: {}
  };

  function updateConfig() {
    config = {
      playlist: [{
        sources: [{
          file: data.file
        }]
      }],
      primary: data.primary,
      hlshtml: data.hlshtml
    };
    if (data.hls || data.drm === 'fairplay') {
      config.playlist[0].sources[0].type = 'hls';
    }
    if (data.drm) {
      config.playlist[0].sources[0].drm = {};
      config.playlist[0].sources[0].drm[data.drm] = data[data.drm];
    }
  }

  // set drm config items as unsupported by current browser
  function setUnsupportedDrmItems(els) {
    for (var i = 0; i < els.length; i++) {
      var el = $('#drm-' + els[i]);
      el.addClass('drm-item-not-supported').find('input').prop({
        disabled: true
      });
    }
  }

  function setDrmDisplay() {
    if (data.hlshtml) {
      drmEl.removeClass('drm-not-supported');
    } else {
      drmEl.addClass('drm-not-supported');
    }
  }

  function setDrmItemDisplay() {
    drmItemEl.removeClass('drm-item-selected');
    if (!data.drm) {
      $('#drm-default').addClass('drm-item-selected');
    } else {
      $('#drm-' + data.drm).addClass('drm-item-selected');
    }
  }

  function setDrmCustomData() {
    if (data.drm === 'widevine' || data.drm === 'playready') {
      data[data.drm].headers = [{
        name: null,
        value: null
      }];
    }
  }

  function deleteDrmCustomData() {
    if (data.drm === 'widevine' || data.drm === 'playready') {
      delete(data[data.drm].headers);
    }
  }

  function setOutput() {
    outputCodeEl.html(JSON.stringify(config, null, 2));
    testOutputEl.addClass('test-output-visible');
    hljs.highlightBlock(outputCodeEl[0]);
  }

  function setPlayerInstance() {
    playerConfig = Object.create(config);
    playerInstance = jwplayer('stream-tester-player-https').setup(playerConfig);
  }

  function protocolAlert() {
    if (window.location.protocol === data.fileProtocol) {
      playerConfig = Object.create(config);
      playerInstance = jwplayer('stream-tester-player-https').setup(playerConfig);

    } else {
      alert('This stream tester supports testing & debugging HTTPS streams. Please visit demo.jwplayer.com/developer-tools/http-stream-tester/ to test HTTP streams.');
    }
  }


  //function removePlayerInstance() {
    //if (playerInstance) {
     // playerInstance.remove();
    //}
  //}

  // alert for demo.jwplayer.com domain only
    function httpTesterAlert() {

     if (window.location.protocol === 'http') {
          playerConfig = Object.create(config);
          playerInstance = jwplayer('stream-tester-player-https').setup(playerConfig);
      } else {
      alert('You are currently using our deprecated HTTP stream tester. Please visit developer.jwplayer.com/tools/stream-tester/ to securely test HTTPS streams with the latest version of the JW Player Stream Tester.');
      }
    }

  //function setPlayerDisplay() {
    //if (data.fileProtocol === 'http:' && data.file) {
      // playerHttpsEl.addClass('u-hidden');
      // playerHttpEl.removeClass('u-hidden');
      //alert('This stream tester requires HTTPS streams. Please visit demo.jwplayer.com/stream-tester/ to test HTTP streams.');
    //} else {
     // playerHttpEl.addClass('u-hidden');
      //playerHttpsEl.removeClass('u-hidden');
    //}
  //}


  // initialize stream tester
  function init() {
    setDrmItemDisplay();
    updateConfig();
    setPlayerInstance();
    //setPlayerDisplay();
    setOutput();
  }

  win.resize(function() {

  });

  fileInputEl.on('input', function() {
    data.file = fileInputEl.val();
    var url = document.createElement('a');
    url.href = data.file;
    data.fileProtocol = url.protocol;
  });

  // update config when render mode option changes
  primaryInputEl.on('change', function() {
    data.primary = primaryInputEl.filter(':checked').val();
    data.hlshtml = data.primary === 'html5';
    setDrmDisplay();
  });

  drmItemCustomDataInputEl.on('change', function() {
    var el = $(this),
      elCustomDataEl = el.parent().siblings('.drm-item-custom-data');
    if (el.is(':checked')) {
      elCustomDataEl.addClass('drm-item-custom-data-visible');
      setDrmCustomData();
    } else {
      elCustomDataEl.removeClass('drm-item-custom-data-visible');
      deleteDrmCustomData();
    }
  });

  drmClearkeyKeyInputEl.on('keyup', function() {
    data.clearkey.key = drmClearkeyKeyInputEl.val();
  });

  drmClearkeyKeyIdInputEl.on('keyup', function() {
    data.clearkey.keyId = drmClearkeyKeyIdInputEl.val();
  });

  drmFairplayCertificateUrlInputEl.on('keyup', function() {
    data.fairplay.certificateUrl = drmFairplayCertificateUrlInputEl.val();
  });

  drmFairplayProcessSpcUrlInputEl.on('keyup', function() {
    data.fairplay.processSpcUrl = drmFairplayProcessSpcUrlInputEl.val();
  });

  drmWidevineUrlInputEl.on('keyup', function() {
    data.widevine.url = drmWidevineUrlInputEl.val();
  });

  drmWidevineCustomNameInputEl.on('keyup', function() {
    data.widevine.headers[0].name = drmWidevineCustomNameInputEl.val();
  });

  drmWidevineCustomValueInputEl.on('keyup', function() {
    data.widevine.headers[0].value = drmWidevineCustomValueInputEl.val();
  });

  drmPlayreadyUrlInputEl.on('keyup', function() {
    data.playready.url = drmPlayreadyUrlInputEl.val();
  });

  drmPlayreadyCustomNameInputEl.on('keyup', function() {
    data.playready.headers[0].name = drmPlayreadyCustomNameInputEl.val();
  });

  drmPlayreadyCustomValueInputEl.on('keyup', function() {
    data.playready.headers[0].value = drmPlayreadyCustomValueInputEl.val();
  });

  hlsInputEl.on('change', function() {
    data.hls = hlsInputEl.is(':checked');
  });

  // update config when drm input value changes
  drmItemInputEl.on('change', function() {
    drmItemInputCheckedEl = drmItemInputEl.filter(':checked');
    drmItemInputCheckedElValue = drmItemInputCheckedEl.val();
    if (drmItemInputCheckedElValue) {
      data.drm = drmItemInputCheckedElValue;
    } else {
      data.drm = null;
    }
    setDrmItemDisplay();
  });

  // re-initialize player instance with modified config when button is clicked
  buttonEl.on('click', function() {
    init();
    protocolAlert();
  });

  buttonHTTP.on('click', function() {
    init();
  });

  // hide options not supported by user's current browser
  if (bowser.chrome) {
    setUnsupportedDrmItems(['playready', 'fairplay']);
  } else if (bowser.safari) {
    setUnsupportedDrmItems(['playready', 'widevine', 'clearkey']);
  } else if (bowser.firefox) {
    setUnsupportedDrmItems(['playready', 'fairplay']);
  } else if (bowser.msie || bowser.msedge) {
    setUnsupportedDrmItems(['widevine', 'fairplay', 'clearkey']);
  }

  var acceptedOrigins = [
    'http://demo.jwplayer.com',
    'http://local.developer.jwplayer.com'
  ];

  // initialize default player instance
  init();

})();
