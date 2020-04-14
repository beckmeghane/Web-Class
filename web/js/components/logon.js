var logon = {}; 

logon.UI = function(id){
    // ` this is a "back tick". Use it to define multi-line strings in JavaScript.
    var content = `  
        <div class='logon'> 
            <br/>
            Email Address <input type="text" id="logonEmailAddress"/> &nbsp;
            Password <input type="password" id="logonPassword"/> &nbsp;
            <input type="button" value="Submit!" onclick="logon.logon('logonEmailAddress','logonPassword','msgArea')"/> <br/> <br/>
            <div id="msgArea">
            </div>
        </div>
    `;
    document.getElementById(id).innerHTML = content;
    
    
};


logon.logon = function (logonEmailAddress, logonPassword, msgArea) {
    
    var emailUserInput = escape(document.getElementById(logonEmailAddress).value);
    var pwUserInput = escape(document.getElementById(logonPassword).value);
    
    ajax2("webAPIs/logonAPI.jsp?email=" + emailUserInput + "&password=" + pwUserInput,
    processLogon, msgArea);

    function processLogon(httpRequest) {
        console.log("Log on processing");
        var target = document.getElementById("msgArea");
        
        var obj = JSON.parse(httpRequest.responseText);
        console.log(obj);
        obj = obj.webUserList[0];
        console.log(obj);
        
        if (obj === null) {
            target.innerHTML = "<h4>That email/password combination does not exist. Please try again.</h4>";
        } else {
            target.innerHTML = "<h4>Welcome Web User " + obj.webUserId + "</h4>";
            target.innerHTML += "Birthday: " + obj.birthday;
            target.innerHTML += "<br/><br/>Membership Fee: " + obj.membershipFee;
            target.innerHTML += "<br/><br/>User Role Id: " + obj.userRoleId;
            target.innerHTML += "<br/><br/>Role Type: " + obj.userRoleType;
            target.innerHTML += "<br/><img  src='"+ obj.image + "'>";
        }
    }
};

logon.loggedOffMsg = function (httpRequest) {
    ajax2("webAPIs/logoffAPI.jsp", processLogoff, content);
    var page1 = document.getElementById(httpRequest);
    var content = `  
        <div > 
          
        </div>
    `;
    page1.innerHTML = content;
    
    function processLogoff(httpRequest) {
        page1.innerHTML = "<h4>Logged out.</h4>";
       
    }
};

logon.getProfileMsg = function (httpRequest) {
    ajax2("webAPIs/getProfileAPI.jsp", processGetProfile, content);
    var page1 = document.getElementById(httpRequest);
    var content = `  
        <div > 
          
        </div>
    `;
    page1.innerHTML = content;
    function processGetProfile(httpRequest) {
        //var target = document.getElementById(httpRequest);
        var obj1 = JSON.parse(httpRequest.responseText);
        console.log(obj1);
        //if (obj.webUserList !== null){
            obj = obj1.webUserList[0];
        //}
        console.log(obj);
        
        if (obj1.webUserList === null) {
            page1.innerHTML = "<h4>Not logged in.</h4>";

        } else{
            page1.innerHTML = "<h4>User Profile</h4>";
            page1.innerHTML += "<br/>Birthday: " + obj.birthday;
            page1.innerHTML += "<br/><br/>Membership Fee: " + obj.membershipFee;
            page1.innerHTML += "<br/><br/>User Role Id: " + obj.userRoleId;
            page1.innerHTML += "<br/><br/>Role Type: " + obj.userRoleType;
            page1.innerHTML += "<br/><img  src='"+ obj.image + "'>";
        }
    }
};
