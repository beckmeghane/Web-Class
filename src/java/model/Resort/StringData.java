package model.Resort;

import dbUtils.FormatUtils;
import java.sql.ResultSet;


/* The purpose of this class is just to "bundle together" all the 
 * character data that the user might type in when they want to 
 * add a new Customer or edit an existing customer.  This String
 * data is "pre-validated" data, meaning they might have typed 
 * in a character string where a number was expected.
 * 
 * There are no getter or setter methods since we are not trying to
 * protect this data in any way.  We want to let the JSP page have
 * free access to put data in or take it out. */
public class StringData { 

    public String webUserId = "";
    public String resortId = "";
    public String resortName = "";
    public String image = "";
    public String ticketPrice = "";
    public String visitDate = "";
    public String description = "";   // Foreign Key
    public String ticketNumber = "";
    public String userEmail = "";
    public String birthday = "";
    // getting it from joined user_role table.

    public String errorMsg = "";

    // default constructor leaves all data members with empty string (Nothing null).
    public StringData() {
    }

    // overloaded constructor sets all data members by extracting from resultSet.
    public StringData(ResultSet results) {
        try {
            // plainInteger returns integer converted to string with no commas.
            this.webUserId = FormatUtils.plainInteger(results.getObject("web_user_id"));
            this.resortId = FormatUtils.plainInteger(results.getObject("resort_id"));
            this.resortName = FormatUtils.formatString(results.getObject("resort_name"));
            this.image = FormatUtils.formatString(results.getObject("image"));
            this.ticketPrice = FormatUtils.formatDollar(results.getObject("ticket_price"));
            this.visitDate = FormatUtils.formatDate(results.getObject("visit_date"));
            this.description = FormatUtils.formatString(results.getObject("description"));
            this.ticketNumber = FormatUtils.plainInteger(results.getObject("ticket_number"));
            this.userEmail = FormatUtils.formatString(results.getObject("user_email"));
            this.birthday = FormatUtils.formatDate(results.getObject("birthday"));
        } catch (Exception e) {
            this.errorMsg = "Database entry could not be formatted correctly. Exception thrown in model.webUser.StringData (the constructor that takes a ResultSet): " + e.getMessage();
        }
    }

    public int getCharacterCount() {
        String s = this.webUserId + this.resortId + this.resortName + this.image + this.ticketPrice
                + this.visitDate + this.description + this.ticketNumber + this.userEmail + this.birthday;
        return s.length();
    }

    public String toString() {
        return "Web User Id:" + this.webUserId
                + ", Resort ID: " + this.resortId
                + ", Resort Name: " + this.resortName
                + ", Image: " + this.image
                + ", Ticket Price: " + this.ticketPrice
                + ", Visit Date: " + this.visitDate
                + ", Description : " + this.description
                + ", Ticket Number : " + this.ticketNumber
                + ", User Email : " + this.userEmail
                + ", Birthday : " + this.birthday;
    }
}
