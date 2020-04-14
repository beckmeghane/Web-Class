var users = {};

users.list = function (id) {

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
                <span>User List</span>
                <a href="#/insertUser"><img src="icons/insert_H18.png"></a>
            </h2>
        </div >
        
        <div id="listHere" class="clickSort"></div>
    `;

    document.getElementById(id).innerHTML = content;

    ajax("webAPIs/listUsersAPI.jsp", processData, "listHere");

    function processData(list) {
        list = list.webUserList;
        // print out JS object/array that was converted from JSON data by ajax function
        console.log(list);

        // build new list as we want the fields to appear in the HTML table
        // we can decide the order we want the fields to appear (first property defined is shown first)
        // we can combine, decide to exclude etc...
        var userList = [];

        // modify properties (image and price) of the array of objects so it will look 
        // better on the page.
        for (var i = 0; i < list.length; i++) {

            userList[i] = {};
            // Don't show the id (no meaningful data)
            userList[i].image = "<img  src='" + list[i].image + "'>";
            userList[i].userEmail = list[i].userEmail; // show this first
            // Don't show the password
            userList[i].birthday = list[i].birthday;
            userList[i].membershipFee = list[i].membershipFee;
            userList[i].role = list[i].userRoleId + " " + list[i].userRoleType;
            userList[i].userId = list[i].webUserId;

            userList[i].update = "<img src='icons/update.png' alt='update icon' onclick='users.updateUI(" +
                    userList[i].userId + ", `" + id + "` )' />";
        }

        console.log("USER LIST");
        console.log(userList);

        // Making a DOM object, nothing shows yet... 
        //MakeFilteredTable(userList,"listHere");
        MakeUpDownSortableTable(userList, "listHere", "userEmail", "icons/sortUpDown16.png");
    }
};

users.insertUser = function (id) {

    var content = `
        <div id="insertArea">

                <table>
                    <tr>
                        <td>Email Address</td>
                        <td><input type="text"  id="userEmail" /></td>
                        <td id="userEmailError" class="error"></td> 
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td><input type="password"  id="userPassword" /></td>
                        <td id="userPasswordError" class="error"></td>
                    </tr>
                    <tr>
                        <td>Retype Your Password</td>
                        <td><input type="password" id="userPassword2" /></td>
                        <td id="userPassword2Error" class="error"></td>
                    </tr>
                    <tr>
                        <td>Image URL</td>
                        <td><input type="text" id="image" /></td>
                        <td id="imageError" class="error"></td>
                    </tr>
                    <tr>
                        <td>Birthday</td>
                        <td><input type="text" id="birthday" /></td>
                        <td id="birthdayError" class="error"></td> 
                    </tr>
                    <tr>
                        <td>Membership Fee</td>
                        <td><input type="text" id="membershipFee" /></td>
                        <td id="membershipFeeError" class="error"></td>
                    </tr>
                    <tr>
                        <td>User Role</td>
                        <td>
                            <select id="rolePickList">
                            <!-- JS code will make ajax call to get all the roles 
                            then populate this select tag's options with those roles -->
                            </select>
                        </td>
                        <td id="userRoleIdError" class="error"></td>
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

    ajax("webAPIs/getRolesAPI.jsp", setRolePickList, "userRoleIdError");
//    ajax2({
//            url: "webAPIs/listUsersAPI.jsp",
//            successFn: setUserPickList,
//            errorId: "webUserIdError"
//    });

    function setRolePickList(jsonObj) {

        console.log("setRolePickList was called, see next line for object holding list of roles");
        console.log(jsonObj);

        if (jsonObj.dbError.length > 0) {
            document.getElementById("userRoleIdError").innerHTML = jsonObj.dbError;
            return;
        }

        /*  copy/pasting the first entry from the output of my get role API
         {
         "dbError": "",
         "roleList": [
         {
         "userRoleId": "1",
         "userRoleType": "Admin",
         "errorMsg": ""
         }, ...
         */

        Utils.makePickList({
            id: "rolePickList",
            list: jsonObj.roleList,
            valueProp: "userRoleType",
            keyProp: "userRoleId"
        });

    } // setRolePickList

    var saveButton = document.getElementById("saveButton");
    saveButton.onclick = function () {
        console.log("insertSave was called");
        // create a user object from the values that the user has typed into the page.
        var ddList = document.getElementById("rolePickList");
        var userInputObj = {
            "webUserId": "",
            "userEmail": document.getElementById("userEmail").value,
            "userPassword": document.getElementById("userPassword").value,
            "userPassword2": document.getElementById("userPassword2").value,
            "image": document.getElementById("image").value,
            "birthday": document.getElementById("birthday").value,
            "membershipFee": document.getElementById("membershipFee").value,
            "userRoleId": ddList.options[ddList.selectedIndex].value,
            "userRoleType": "",
            "errorMsg": ""
        };
        console.log(userInputObj);
        // build the url for the ajax call. Remember to escape the user input object or else 
        // you'll get a security error from the server. JSON.stringify converts the javaScript
        // object into JSON format (the reverse operation of what gson does on the server side).
        var myData = escape(JSON.stringify(userInputObj));
        var url = "webAPIs/insertUserSimpleAPI.jsp?jsonData=" + myData;
        ajax(url, insertReqGood, "recordError");
        function insertReqGood(jsonObj) {
            // Running this function does not mean insert success. It just means that the Web API
            // call (to insert the record) was successful.
            console.log("insertReqGood was called here is httpRequest.");
            console.log("This is the HTML data?? ");
            console.log(jsonObj);
            // the server prints out a JSON string of an object that holds field level error 
            // messages. The error message object (conveniently) has its fiels named exactly 
            // the same as the input data was named. 
//                        var jsonObj = JSON.parse(httpRequest); // convert from JSON to JS Object.
//                        console.log("here is JSON object (holds error messages.");
//                        console.log(jsonObj);
            document.getElementById("userEmailError").innerHTML = jsonObj.userEmail;
            document.getElementById("userPasswordError").innerHTML = jsonObj.userPassword;
            document.getElementById("userPassword2Error").innerHTML = jsonObj.userPassword2;
            document.getElementById("imageError").innerHTML = jsonObj.image;
            document.getElementById("birthdayError").innerHTML = jsonObj.birthday;
            document.getElementById("membershipFeeError").innerHTML = jsonObj.membershipFee;
            document.getElementById("userRoleIdError").innerHTML = jsonObj.userRoleId;
            if (jsonObj.errorMsg.length === 0) { // success
                jsonObj.errorMsg = "Record successfully inserted !!!";
            }
            document.getElementById("recordError").innerHTML = jsonObj.errorMsg;
        }
    };


};

users.updateUI = function (webUserId, targetId) {

    // This is needed to "reset" the application's perception of the "current" link. 
    // Otherwise, when the user tries to click on "user list" after doing a user list -> update
    // operation, there will be no response (because link would not change). 
    // Setting window.location.hash is like auto-clicking for the user (in code). 
    // But also in index.html, you have to add a routing rule for this link and associate 
    // it will a null function (a do nothing function) - to avoid a routing error.

    window.location.hash = "#/userUpdate";

    var content = `
        <div id="insertArea">

                <table>
                    <tr>
                        <td>Web User Id</td>
                        <td><input type="text"  id="webUserId" disabled /></td>
                        <td id="webUserIdError" class="error"></td> 
                    </tr>
                    <tr>
                        <td>Email Address</td>
                        <td><input type="text"  id="userEmail" /></td>
                        <td id="userEmailError" class="error"></td> 
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td><input type="password"  id="userPassword" /></td>
                        <td id="userPasswordError" class="error"></td>
                    </tr>
                    <tr>
                        <td>Retype Your Password</td>
                        <td><input type="password" id="userPassword2" /></td>
                        <td id="userPassword2Error" class="error"></td>
                    </tr>
                    <tr>
                        <td>Birthday</td>
                        <td><input type="text" id="birthday" /></td>
                        <td id="birthdayError" class="error"></td> 
                    </tr>
                    <tr>
                        <td>Membership Fee</td>
                        <td><input type="text" id="membershipFee" /></td>
                        <td id="membershipFeeError" class="error"></td>
                    </tr>
                    <tr>
                        <td>User Role</td>
                        <td>
                            <select id="rolePickList">
                            <!-- JS code will make ajax call to get all the roles 
                            then populate this select tag's options with those roles -->
                            </select>
                        </td>
                        <td id="userRoleIdError" class="error"></td>
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

    document.getElementById(targetId).innerHTML = content;

    ajax("webAPIs/getUserWithRolesAPI.jsp?id=" + webUserId, proceed, "ajaxError");

    function proceed(obj) { // obj is what got JSON.parsed from Web API's output
        dbDataToUI(obj);
    }


    var saveButton = document.getElementById("saveButton");
    saveButton.onclick = function () {
        console.log("updateSave was called");
        // create a user object from the values that the user has typed into the page.
        var ddList = document.getElementById("rolePickList");
        var userInputObj = {
            "webUserId": document.getElementById("webUserId").value,
            "userEmail": document.getElementById("userEmail").value,
            "userPassword": document.getElementById("userPassword").value,
            "userPassword2": document.getElementById("userPassword2").value,
            "birthday": document.getElementById("birthday").value,
            "membershipFee": document.getElementById("membershipFee").value,
            "userRoleId": ddList.options[ddList.selectedIndex].value,
            "userRoleType": "",
            "errorMsg": ""
        };
        console.log(userInputObj);
        // build the url for the ajax call. Remember to escape the user input object or else 
        // you'll get a security error from the server. JSON.stringify converts the javaScript
        // object into JSON format (the reverse operation of what gson does on the server side).
        var myData = escape(JSON.stringify(userInputObj));
        var url = "webAPIs/updateUserAPI.jsp?jsonData=" + myData;
        ajax(url, insertReqGood, "recordError");
        function insertReqGood(jsonObj) {
            // Running this function does not mean insert success. It just means that the Web API
            // call (to insert the record) was successful.
            console.log("updateReqGood was called here is httpRequest.");
            console.log("This is the HTML data?? ");
            console.log(jsonObj);
            // the server prints out a JSON string of an object that holds field level error 
            // messages. The error message object (conveniently) has its fiels named exactly 
            // the same as the input data was named. 
//                        var jsonObj = JSON.parse(httpRequest); // convert from JSON to JS Object.
//                        console.log("here is JSON object (holds error messages.");
//                        console.log(jsonObj);
            document.getElementById("userEmailError").innerHTML = jsonObj.userEmail;
            document.getElementById("userPasswordError").innerHTML = jsonObj.userPassword;
            document.getElementById("userPassword2Error").innerHTML = jsonObj.userPassword2;
            document.getElementById("birthdayError").innerHTML = jsonObj.birthday;
            document.getElementById("membershipFeeError").innerHTML = jsonObj.membershipFee;
            document.getElementById("userRoleIdError").innerHTML = jsonObj.userRoleId;
            if (jsonObj.errorMsg.length === 0) { // success
                jsonObj.errorMsg = "Record successfully updated!!!";
            }
            document.getElementById("recordError").innerHTML = jsonObj.errorMsg;
        }
    };

    function dbDataToUI(obj) {
        console.log("OBJ");
        console.log(obj);

        var webUserObj = obj.webUser;
        var roleList = obj.roleInfo.roleList;

        document.getElementById("webUserId").value = webUserObj.webUserId;
        document.getElementById("userEmail").value = webUserObj.userEmail;
        document.getElementById("userPassword").value = webUserObj.userPassword;
        document.getElementById("userPassword2").value = webUserObj.userPassword;
        document.getElementById("birthday").value = webUserObj.birthday;
        document.getElementById("membershipFee").value = webUserObj.membershipFee;
        console.log("selected role id is " + webUserObj.userRoleId);
        Utils.makePickList({
            id: "rolePickList", // id of <select> tag in UI
            list: roleList, // JS array that holds objects to populate the select list
            valueProp: "userRoleType", // field name of objects in list that hold the values of the options
            keyProp: "userRoleId" // field name of objects in list that hold the keys of the options
        });
    };

};