<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.Resort.*" %>
<%@page language="java" import="com.google.gson.*" %>

<%

    // This is the object we get from the GSON library.
    // This object knows how to convert betweeb these two formats: 
    //    POJO (plain old java object) 
    //    JSON (JavaScript Object notation)
    Gson gson = new Gson();

    DbConn dbc = new DbConn();
    StringData errorMsgs = new StringData();

    String jsonInsertData = request.getParameter("jsonData");

    if (jsonInsertData == null) {
        errorMsgs.errorMsg = "Cannot insert -- missing 'jsonData' URL parameter";
        System.out.println(errorMsgs.errorMsg);
    } else { // URL parameter data was received
        System.out.println("insertData received and is " + jsonInsertData);
        errorMsgs.errorMsg = dbc.getErr();
        if (errorMsgs.errorMsg.length() == 0) { // means db connection is ok
            System.out.println("DB connection OK to proceed");

            // Must use gson to convert JSON (that the user provided as part of the url, the insertData. 
            // Convert from JSON (JS object notation) to POJO (plain old java object).
            StringData insertData = gson.fromJson(jsonInsertData, StringData.class);

            errorMsgs = DbMods.insert(insertData, dbc);

        }else{// db connection OK
            errorMsgs.errorMsg = "Database Unavailable, please try later.\n" + errorMsgs.errorMsg;
        }
    } // URL parameter data was received.

    out.print(gson.toJson(errorMsgs).trim());
    dbc.close();
%>