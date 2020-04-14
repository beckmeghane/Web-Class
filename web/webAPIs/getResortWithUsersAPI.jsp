<%@page import="view.WebUserView"%>
<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.Resort.*" %> 
<%@page language="java" import="view.ResortView" %> 
<%@page language="java" import="com.google.gson.*" %>

<%

    // default constructor creates nice empty StringDataList with all fields "" (empty string, nothing null).
    ResortWithUsers resortWithUsers = new ResortWithUsers();

    String searchId = request.getParameter("id");
    if (searchId == null) {
        resortWithUsers.resort.errorMsg = "Cannot search for user - 'id' most be supplied";
    } else {

        DbConn dbc = new DbConn();
        resortWithUsers.resort.errorMsg = dbc.getErr(); // returns "" if connection is good, else db error msg.

        if (resortWithUsers.resort.errorMsg.length() == 0) { // if got good DB connection,

            System.out.println("*** Ready to call allUsersAPI");
            resortWithUsers.resort = DbMods.findById2(dbc, searchId); 
            
            resortWithUsers.userInfo = WebUserView.getAllUsers(dbc);
        }
        
        
        dbc.close(); // EVERY code path that opens a db connection, must also close it - no DB Conn leaks.
    }
    // This object (from the GSON library) can to convert between JSON <-> POJO (plain old java object) 
    Gson gson = new Gson();
    out.print(gson.toJson(resortWithUsers).trim());
%>