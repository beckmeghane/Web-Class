var resorts = {};

resorts.list = function (id) {

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
        
        <div>
            <h2 style="text-align:center;">
                <span>Resort List</span>
                <a href="#/insertResort"><img src="icons/insert_H18.png"></a>
            </h2>
        </div >
        
        <div style="clear:both;" id="listHere" class="clickSort"></div>
    `;

    document.getElementById(id).innerHTML = content;

    ajax("webAPIs/listResortsAPI.jsp", processData, "listHere");


    function processData(list) {
        list = list.resortList;
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
            resortList[i].update = "<img src='icons/update.png' alt='update icon' onclick='resorts.updateUI(" +
                    resortList[i].resortId + ", `" + id + "` )' />";
        }

        console.log("RESORT LIST");
        console.log(resortList);

        // Making a DOM object, nothing shows yet... 
        //MakeFilteredTable(userList,"listHere");
        MakeUpDownSortableTable(resortList, "listHere", "userEmail", "icons/sortUpDown16.png");
    }
};

resorts.updateUI = function (resortId, id) {

    window.location.hash = "#/resortUpdate";

    var content = `
        <div id="insertArea">

                <table>
                    <tr>
                        <td>Resort Id</td>
                        <td><input type="text"  id="resortId" disabled /></td>
                        <td id="resortIdError" class="error"></td> 
                    </tr>
                    <tr>
                        <td>Resort Name</td>
                        <td><input type="text"  id="resortName" /></td>
                        <td id="resortNameError" class="error"></td> 
                    </tr>
                    <tr>
                        <td>Image URL</td>
                        <td><input type="text" id="image" /></td>
                        <td id="imageError" class="error"></td>
                    </tr>
                    <tr>
                        <td>Web User ID</td>
                        <td>
                            <select id="userPickList">
                            <!-- JS code will make ajax call to get all the roles 
                            then populate this select tag's options with those roles -->
                            </select>
                        </td>
                        <td id="webUserIdError" class="error"></td> 
                    </tr>
                    <tr>
                        <td>Visit Date</td>
                        <td><input type="text" id="visitDate" /></td>
                        <td id="visitDateError" class="error"></td>
                    </tr>
                    <tr>
                        <td>Ticket Price</td>
                        <td><input type="text" id="ticketPrice" /></td>
                        <td id="ticketPriceError" class="error"></td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td><input type="text" id="description" /></td>
                        <td id="descriptionError" class="error"></td>
                    </tr>
                    <tr>
                        <td>Ticket Number</td>
                        <td><input type="text" id="ticketNumber" /></td>
                        <td id="ticketNumberError" class="error"></td>
                    </tr>
                    <tr>
                        <!-- see js/insertUser.js to see the insertUser function (make sure index.html references the js file) -->
                        <td><button id="saveButton">Save</button></td>
                        <td id="recordError" class="error"></td>
                        <td></td>
                    </tr>
                </table>
            </div>
    `;

    document.getElementById(id).innerHTML = content;

    ajax("webAPIs/getResortWithUsersAPI.jsp?id=" + resortId, proceed, "ajaxError");

    function proceed(obj) { // obj is what got JSON.parsed from Web API's output
        dbDataToUI(obj);
    }



    var saveButton = document.getElementById("saveButton");
    saveButton.onclick = function () {
        console.log("updateSave was called");
        // create a user object from the values that the user has typed into the page.
        var ddList = document.getElementById("userPickList");
        var resortInputObj = {
            "resortId": document.getElementById("resortId").value,
            "resortName": document.getElementById("resortName").value,
            "image": document.getElementById("image").value,
            "webUserId": ddList.options[ddList.selectedIndex].value,
            "ticketPrice": document.getElementById("ticketPrice").value,
            "visitDate": document.getElementById("visitDate").value,
            "description": document.getElementById("description").value,
            "ticketNumber": document.getElementById("ticketNumber").value,
            "userEmail": "",
            "birthday": "",
            "errorMsg": ""
        };
        console.log(resortInputObj);
        // build the url for the ajax call. Remember to escape the user input object or else 
        // you'll get a security error from the server. JSON.stringify converts the javaScript
        // object into JSON format (the reverse operation of what gson does on the server side).
        var myData = escape(JSON.stringify(resortInputObj));
        var url = "webAPIs/updateResortAPI.jsp?jsonData=" + myData;
        ajax(url, insertReqGood, "recordError");
        function insertReqGood(jsonObj) {
            // Running this function does not mean insert success. It just means that the Web API
            // call (to insert the record) was successful.
            console.log("insertReqGood was called here is httpRequest.");
            console.log(jsonObj);
            // the server prints out a JSON string of an object that holds field level error 
            // messages. The error message object (conveniently) has its fiels named exactly 
            // the same as the input data was named. 
//                        var jsonObj = JSON.parse(httpRequest.responseText); // convert from JSON to JS Object.
//                        console.log("here is JSON object (holds error messages.");
//                        console.log(jsonObj);
            document.getElementById("resortNameError").innerHTML = jsonObj.resortName;
            document.getElementById("descriptionError").innerHTML = jsonObj.description;
            document.getElementById("ticketNumberError").innerHTML = jsonObj.ticketNumber;
            document.getElementById("imageError").innerHTML = jsonObj.image;
            document.getElementById("ticketPriceError").innerHTML = jsonObj.ticketPrice;
            document.getElementById("visitDateError").innerHTML = jsonObj.visitDate;
            document.getElementById("webUserIdError").innerHTML = jsonObj.webUserId;
            if (jsonObj.errorMsg.length === 0) { // success
                jsonObj.errorMsg = "Record successfully updated!!!";
            }
            document.getElementById("recordError").innerHTML = jsonObj.errorMsg;
        }
    };

    function dbDataToUI(obj) {
        console.log("OBJ");
        console.log(obj);

        var resortObj = obj.resort;
        var userList = obj.userInfo.webUserList;

        document.getElementById("resortId").value = resortObj.resortId;
        document.getElementById("resortName").value = resortObj.resortName;
        document.getElementById("image").value = resortObj.image;
        document.getElementById("ticketPrice").value = resortObj.ticketPrice;
        document.getElementById("visitDate").value = resortObj.visitDate;
        document.getElementById("description").value = resortObj.description;
        document.getElementById("ticketNumber").value = resortObj.ticketNumber;
        console.log("selected role id is " + resortObj.userRoleId);
        Utils.makePickList({
            id: "userPickList", // id of <select> tag in UI
            list: userList, // JS array that holds objects to populate the select list
            valueProp: "userEmail", // field name of objects in list that hold the values of the options
            keyProp: "webUserId" // field name of objects in list that hold the keys of the options
        });
    }
    ;


};

resorts.insertResort = function (id) {
    var content = `
        <div id="insertArea">

                <table>
                    <tr>
                        <td>Resort Name</td>
                        <td><input type="text"  id="resortName" /></td>
                        <td id="resortNameError" class="error"></td> 
                    </tr>
                    <tr>
                        <td>Image URL</td>
                        <td><input type="text" id="image" /></td>
                        <td id="imageError" class="error"></td>
                    </tr>
                    <tr>
                        <td>Web User ID</td>
                        <td>
                            <select id="userPickList">
                            <!-- JS code will make ajax call to get all the roles 
                            then populate this select tag's options with those roles -->
                            </select>
                        </td>
                        <td id="webUserIdError" class="error"></td> 
                    </tr>
                    <tr>
                        <td>Visit Date</td>
                        <td><input type="text" id="visitDate" /></td>
                        <td id="visitDateError" class="error"></td>
                    </tr>
                    <tr>
                        <td>Ticket Price</td>
                        <td><input type="text" id="ticketPrice" /></td>
                        <td id="ticketPriceError" class="error"></td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td><input type="text" id="description" /></td>
                        <td id="descriptionError" class="error"></td>
                    </tr>
                    <tr>
                        <td>Ticket Number</td>
                        <td><input type="text" id="ticketNumber" /></td>
                        <td id="ticketNumberError" class="error"></td>
                    </tr>
                    <tr>
                        <!-- see js/insertUser.js to see the insertUser function (make sure index.html references the js file) -->
                        <td><button id="saveButton">Save</button></td>
                        <td id="recordError" class="error"></td>
                        <td></td>
                    </tr>
                </table>
            </div>
    `;

    document.getElementById(id).innerHTML = content;

    ajax("webAPIs/listUsersAPI.jsp", setUserPickList, "webUserIdError");
//    ajax2({
//            url: "webAPIs/listUsersAPI.jsp",
//            successFn: setUserPickList,
//            errorId: "webUserIdError"
//    });

    function setUserPickList(jsonObj) {

        console.log("setUserPickList was called, see next line for object holding list of roles");
        console.log(jsonObj);

        if (jsonObj.dbError.length > 0) {
            document.getElementById("webUserIdError").innerHTML = jsonObj.dbError;
            return;
        }

        
        Utils.makePickList({
            id: "userPickList",
            list: jsonObj.webUserList,
            valueProp: "userEmail",
            keyProp: "webUserId"
        });

    } // setRolePickList

    var saveButton = document.getElementById("saveButton");
    saveButton.onclick = function () {
        console.log("insertSave was called");
        // create a user object from the values that the user has typed into the page.
        var ddList = document.getElementById("userPickList");
        var resortInputObj = {
            "resortId": "",
            "resortName": document.getElementById("resortName").value,
            "image": document.getElementById("image").value,
            "webUserId": ddList.options[ddList.selectedIndex].value,
            "ticketPrice": document.getElementById("ticketPrice").value,
            "visitDate": document.getElementById("visitDate").value,
            "description": document.getElementById("description").value,
            "ticketNumber": document.getElementById("ticketNumber").value,
            "userEmail": "",
            "birthday": "",
            "errorMsg": ""
        };
        console.log(resortInputObj);
        // build the url for the ajax call. Remember to escape the user input object or else 
        // you'll get a security error from the server. JSON.stringify converts the javaScript
        // object into JSON format (the reverse operation of what gson does on the server side).
        var myData = escape(JSON.stringify(resortInputObj));
        var url = "webAPIs/insertResortAPI.jsp?jsonData=" + myData;
        ajax(url, insertReqGood, "recordError");
        function insertReqGood(jsonObj) {
            // Running this function does not mean insert success. It just means that the Web API
            // call (to insert the record) was successful.
            console.log("insertReqGood was called here is httpRequest.");
            console.log(jsonObj);
            // the server prints out a JSON string of an object that holds field level error 
            // messages. The error message object (conveniently) has its fiels named exactly 
            // the same as the input data was named. 
//                        var jsonObj = JSON.parse(httpRequest.responseText); // convert from JSON to JS Object.
//                        console.log("here is JSON object (holds error messages.");
//                        console.log(jsonObj);
            document.getElementById("resortNameError").innerHTML = jsonObj.resortName;
            document.getElementById("descriptionError").innerHTML = jsonObj.description;
            document.getElementById("ticketNumberError").innerHTML = jsonObj.ticketNumber;
            document.getElementById("imageError").innerHTML = jsonObj.image;
            document.getElementById("ticketPriceError").innerHTML = jsonObj.ticketPrice;
            document.getElementById("visitDateError").innerHTML = jsonObj.visitDate;
            document.getElementById("webUserIdError").innerHTML = jsonObj.webUserId;
            if (jsonObj.errorMsg.length === 0) { // success
                jsonObj.errorMsg = "Record successfully inserted !!!";
            }
            document.getElementById("recordError").innerHTML = jsonObj.errorMsg;
        }
    };


};

