<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="view.WebUserView" %> 
<%@page language="java" import="com.google.gson.*" %>

<%

    // default constructor creates nice empty StringDataList with all fields "" (empty string, nothing null).
    //StringData data = new StringData();
    StringDataList list = new StringDataList();

    String searchId1 = request.getParameter("email");
    String searchId2 = request.getParameter("password");
    if ((StringData)session.getAttribute("webUser") == null) {
        list.dbError = "User does not exist or wrong password";
    } else {
        if (list.dbError.length() == 0) { // if got good DB connection,
            list.add((StringData)session.getAttribute("webUser"));
        }
    }
    // This object (from the GSON library) can to convert between JSON <-> POJO (plain old java object) 
    Gson gson = new Gson();
    out.print(gson.toJson(list).trim());
%>