function resorts(id) {

    // ` this is a "back tick". Use it to define multi-line strings in JavaScript.
    var content = `  
        <style>
            /* override size of image from the clicksort.css */
            .clickSort td img { /* applies to any <img> tag in a <td> tag in any element classed "clickSort" */
                width: 40px;
                border-radius: 6px;
                box-shadow: 3px 3px 3px #444444;
            }
        </style> 
        
        <div id="listHere" class="clickSort"></div>
    `;
    
    document.getElementById(id).innerHTML = content;
    
    ajax("json/allResorts.json", processData, "listHere");

    function processData(list) {

        // print out JS object/array that was converted from JSON data by ajax function
        console.log(list);

        // build new list as we want the fields to appear in the HTML table
        // we can decide the order we want the fields to appear (first property defined is shown first)
        // we can combine, decide to exclude etc...
        var resortList = [];

        // modify properties (image and price) of the array of objects so it will look 
        // better on the page.
        for (var i = 0; i < list.length; i++) {

            resortList[i] = {};
            // Don't show the id (no meaningful data)
            
            resortList[i].resortName = list[i].resortName;
            resortList[i].image = "<img  src='" + list[i].image + "'>";
            resortList[i].userEmail = list[i].userEmail; // show this first
            // Don't show the password
            resortList[i].birthday = list[i].birthday;
            resortList[i].webUserId = list[i].webUserId;
            resortList[i].ticketPrice = list[i].ticketPrice;
            resortList[i].resortId = list[i].resortId;
            resortList[i].visitDate = list[i].visitDate;
            resortList[i].ticketNumber = list[i].ticketNumber;
            resortList[i].description = list[i].description;
        }

        console.log("RESORT LIST");
        console.log(resortList);

        // Making a DOM object, nothing shows yet... 
        //MakeFilteredTable(userList,"listHere");
        MakeUpDownSortableTable(resortList, "listHere", "userEmail", "icons/sortUpDown16.png");
    }
};