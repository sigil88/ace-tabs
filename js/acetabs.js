// Copyright (c) 2018 Jennifer Cant. All rights reserved.
document.addEventListener("DOMContentLoaded", function() {

    var pinButton = document.getElementById("pin");
    var pinInput = document.getElementById("pin-url");
    var checkButton = document.getElementById("check-storage");
    var pinnedContainer = document.getElementsByClassName("pinned__container");
    var bookmarks;
    const aceBookmarks = [];
    

    chrome.runtime.onInstalled.addListener(function() {
        chrome.storage.local.set({ace_bookmarks: []}, function() {
          console.log('ace_bookmarks area created');
        });
    });

    function getAceBookmarks() {
        chrome.storage.local.get('ace_bookmarks',function(data) {
            if (chrome.runtime.lastError) {
                /* error */
                console.log(chrome.runtime.lastError);
                return;
            } else {
                return data;
            }
        });
    }

    function storeBookmarkUrl(pinUrl) {
        // call local storage and insert new data
        chrome.storage.local.get(function(data) {
            // console.log('pinurl: ' + pinUrl);

            // if key exists, push new url object
            if (data["ace_bookmarks"] !== undefined) {
                data["ace_bookmarks"].push({'url':pinUrl});

            // if key doesn't exist, create array and insert new url object
            } else {
                data["ace_bookmarks"] = [{'url':pinUrl}];
            }

            // send it to local storage
            chrome.storage.local.set(data);

            // console.log(data);

            // TODO:
            // * check for duplicate url 
        });
        console.log('finished storing ' + pinUrl);
        return; //exit
    }

    // chrome.browserAction.onClicked.addListener(updateIcon);
    
    // trigger storage of new bookmark on button click
    pinButton.onclick = function(e) {
        e.preventDefault();
        let pinUrl = pinInput.value;

        if (pinUrl.length > 0) {
            storeBookmarkUrl(pinUrl);

        }

    };

    
    function loadPinnedItems() {
        
        console.log('loading pinned');
        // Q: should be global?
        chrome.storage.local.get('ace_bookmarks', function(data) {
            if (chrome.runtime.lastError) {
                /* error */
                console.log(chrome.runtime.lastError);
                return;
            } else {
                bookmarks = data.ace_bookmarks;
            }
            
            if (bookmarks.length > 0) {
                // refresh container
                console.log('reloading');
                $('.pinned__container').html("");
                console.log(bookmarks);
                bookmarks.forEach(function (bookmark, index) {
                        // console.log(bookmark);
    
                        $('.pinned__container').append('<div data-id="'+ index +'" class="box is-inline-flex ace__bookmark"><div class="content"></div><a href="'+bookmark.url+'">'+bookmark.url+'</a><a data-id="'+ index +'"class="button delete-pinned is-small is-danger">DELETE</a></div></div>');
    
                    });
    
            } else {
                $('.pinned__container').html("<p>Better start pinning!</p>");
                console.log('nada sorry dude');
            }
        });
        
        
        // console.log(data);

    }

    // get all stored items
    checkButton.onclick = function() {
        let test = chrome.storage.local.get(function(data) {
            if (chrome.runtime.lastError) {
                /* error */
                console.log(chrome.runtime.lastError);
                return;
            } else {
                console.log(data);
            }
        });
    };

    // delete on click
    $(document).on("click", '.delete-pinned', function(e) {
        e.preventDefault();
        let deleteId = $(this).data('id');

        console.log(deleteId);

        deletePinnedItem(deleteId);
    });

    
    function deletePinnedItem(id) {
        if (id !== undefined && id !== null) {
            chrome.storage.local.get('ace_bookmarks', function(data) {
                data.ace_bookmarks.splice(id,1);


                // update local storage
                chrome.storage.local.set(data);


            });
        }

    }


    // fill container with any saved 
    loadPinnedItems();

    // recall loadPinnedItems on storage change
    chrome.storage.onChanged.addListener(function () {
        loadPinnedItems();
    });

    // TODO: define name
    // welcome bros & brosephines
    // const name = function() {
    //     chrome.identity.getProfileUserInfo(function() {
    //         console.log(identity.email);
    //     });
        
    // }

    // name();



    
    function greetAdvice() {
        var greets = [
            "Why, you stuck-up, half-witted, scruffy-looking nerf herder!",
            "Never tell me the odds!",
            "Do. Or do not. There is no try.",
            "Help me, Obi-Wan Kenobi. You’re my only hope.",
            "I find your lack of faith disturbing.",
            "Chewie, we’re home.",
            "I’ve got a bad feeling about this.",
            "It’s a trap!",
            "That’s no moon.",
            "Aren't you a little short for a storm trooper?",
            "These aren’t the droids you’re looking for..."
        ];

        var rand = greets[Math.floor(Math.random()*greets.length)];
        
        $('.is-subtitle').text('"'+rand+'"');

    }
    greetAdvice();

}); // end dom loaded



  