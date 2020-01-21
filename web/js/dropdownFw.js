// Sally's JS naming convention: every JS file shall be named for the single funtion 
// or object that is defined within the file (helps to organize and find code).

// Initialize the drop down framework by calling function dropDownFw (below). So that the framework 
// has no dependencies on outside code, you pass in the name you want for your dropdown header 
// style, the drop down content style and what position you want (off screen to the right) for your 
// drop contents to zoom in from. 

// Note: you have to use the "visibility" (hidden/visible) rather than "display" (none/block) 
// if you want to use transitions/animation on the open/close of the dropdown content elements. 

"use strict"; // We dont want the browser auto-declaring  global variable if we misspell a variable name.

function dropdownFw(dropHeaderStyle, dropContentStyle, hiddenRight) {

    // get an array of all drop down headers and add an onclick event handler to each of these.
    var headerList = document.getElementsByClassName(dropHeaderStyle);

    for (var i = 0; i < headerList.length; i++) {

        // add an onclick function to this drop down header - to toggle the associated drop down content.
        headerList[i].onclick = function () {

            // "this" means what was clicked.
            // this.parentElement means the container of what was clicked. 
            // dContent is the first element (within that container) that has class dropContentStyle.
            // dContent is the element we want to toggle (hide/show).
            var dContent = this.parentElement.getElementsByClassName(dropContentStyle)[0];

            hideExcept(dContent); // in case any other dropcontent is opened, close it 

            toggle(dContent); // hide/show submenu

        }; // end of onclick function for drop header
        
    } // end of for loop

    function toggle(ele) { // hide the dropcontent if showing, show if hiding
        // In JS, remember to test for the CSS value that the element is NOT at page load time 
        // (otherwise, you'll have to use JS function getComputedStyle to get an exact match from the CSS).
        // In other words, do not reverse the following condition.
        if (ele.style.visibility === "visible") {
            hide(ele);
        } else {
            show(ele);
        }
    } // end function toggle

    function hide(ele) {  // make element invisible and move off to right
        ele.style.right = hiddenRight; // e.g., "-500px", however far off to right the user wants
        ele.style.visibility = "hidden";
    }

    function show(ele) { // make element visible and bring back from right
        ele.style.visibility = "visible";
        ele.style.right = "0px";
    }

    function hideExcept(ele) { // hide all dropContent elements, except for element 'ele'
        var dropContentList = document.getElementsByClassName(dropContentStyle);
        for (var i = 0; i < dropContentList.length; i++) {
            if (dropContentList[i] !== ele) {
                hide(dropContentList[i]);
            }
        }
    }

    // Make it so that whenever the user clicks something other than a dropHeader, 
    // all dropContents are closed.
    window.onclick = function (event) {

        // if the user clicks something besides a dropHeader...
        if (!event.target.className.includes(dropHeaderStyle)) {

            // then close all dropContents
            hideExcept(null);
            console.log("hiding all drop contents");
        }
    };

} // end of function dropdownFw
