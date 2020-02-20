function slideshow(id) {

    "use strict";

    // ` this is a "back tick". Use it to define multi-line strings in JavaScript.
    var content = `  
        <style>
            /* the html coder can "override" any slideShow CSS they want to */
            .slideShow img {
                height: 250px;
                border-radius: 25px;
                
            }
        </style> 
        
        <div id="slideId" style="float: left; padding: 25px;">
            <div style= "padding-bottom: 8px;">
                <input id="caption1"/>
                <button id="button1">Change caption</button>
            </div>
        </div>
        
        <div id="slideId2" style="float: left; padding: 25px; margin-bottom: 25px;">
            <div style= "padding-bottom: 8px;">
                <input id="caption2"/>
                <button id="button2">Change caption</button>
            </div>
        </div>
    `;

    document.getElementById(id).innerHTML = content;
    
    var ss;
    var ss2;

    ajax3({
        url: "json/allWebUsers.json",
        successFn: success,
        errorEle: document.getElementById("slideId")
    });

    ajax3({
        url: "json/allResorts.json",
        successFn: success2,
        errorEle: document.getElementById("slideId2")
    });

    function success(userList) {
        console.log(userList);

        ss = MakeSlideShow({
            slideShowEle: document.getElementById("slideId"), // id in which to render slideshow,
            objList: userList, // array of objects with image and caption
            picPropName: "image",
            userEmail: "userEmail"
        });
        
        //ss.setNewCaption("andrew");
    }

    function success2(resortList) {
        console.log(resortList);

        ss2 = MakeSlideShow({
            slideShowEle: document.getElementById("slideId2"), // id in which to render slideshow,
            objList: resortList, // array of objects with image and caption
            picPropName: "image",
            resortName: "resortName"
        });
    }
    
    var button1 = document.getElementById("button1");
    button1.onclick = function() {
        var newCaption = document.getElementById("caption1").value;
        ss.setNewCaption(newCaption);
    };
    
    var button2 = document.getElementById("button2");
    button2.onclick = function() {
        var newCaption = document.getElementById("caption2").value;
        ss2.setNewCaption(newCaption);
    };
}
;
