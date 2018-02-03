// Copyright (c) 2018 Jennifer Cant. All rights reserved.
document.addEventListener("DOMContentLoaded", function() {
    // code...
    console.log('testing');
    
    var pinButton = document.getElementById("pin");
    var pinInput = document.getElementById("pin-url");
    var checkButton = document.getElementById("check-storage");

    chrome.runtime.onInstalled.addListener(function() {
        chrome.storage.local.set({acetabs: 1}, function() {
          console.log('acetabs is 1.');
        });
    });


    function storeBookmark(pinUrl) {
        // chrome.storageArea.set('aceBookmark', function(data) {
            // var pinUrl = data.pinUrl;
        
            chrome.storage.local.set({aceBookmark: pinUrl}, function() {
            console.log('bookmark is set to ' + pinUrl);
        });
        // });

    };
    // console.log(pinButton);
    // chrome.browserAction.onClicked.addListener(updateIcon);
    
    pinButton.onclick = function(e) {
        e.preventDefault();
        let pinUrl = pinInput.value;


        if (pinUrl.length > 0) {
            console.log('store it yo');
            storeBookmark(pinUrl);

        }
    };

    checkButton.onclick = function(e) {
        let test = chrome.storage.local.get('aceBookmark', function(data) {
            if (chrome.runtime.lastError) {
                /* error */
                return;
            }

            console.log(data);

        });
    };

    



}); // end dom loaded



  