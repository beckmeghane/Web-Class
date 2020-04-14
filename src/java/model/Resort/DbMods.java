package model.Resort;

import dbUtils.*;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class DbMods {

    public static StringDataList findById(DbConn dbc, String id) {

        StringDataList sdl = new StringDataList();
        try {
            String sql = "SELECT resort_id, resort_name, resorts.image, user_email, birthday, resorts.web_user_id, ticket_price, "
                    + "visit_date, ticket_number, description "
                    + "FROM resorts, web_user WHERE resorts.web_user_id = web_user.web_user_id "
                    + "AND resort_id = ?";

            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);

            // Encode the id (that the user typed in) into the select statement, into the first 
            // (and only) ? 
            stmt.setString(1, id);

            ResultSet results = stmt.executeQuery();
            if (results.next()) { // id is unique, one or zero records expected in result set
                sdl.add(results);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            StringData sd = new StringData();
            sd.errorMsg = "Exception thrown in ResortView.getUserById(): " + e.getMessage();
            sdl.add(sd);
        }
        return sdl;

    } // getUserById
    
    public static StringData findById2(DbConn dbc, String id) {

        StringData sd = new StringData();
        try {
            String sql = "SELECT resort_id, resort_name, resorts.image, user_email, birthday, resorts.web_user_id, ticket_price, "
                    + "visit_date, ticket_number, description "
                    + "FROM resorts, web_user WHERE resorts.web_user_id = web_user.web_user_id "
                    + "AND resort_id = ?";

            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);

            // Encode the id (that the user typed in) into the select statement, into the first 
            // (and only) ? 
            stmt.setString(1, id);

            ResultSet results = stmt.executeQuery();
            if (results.next()) { // id is unique, one or zero records expected in result set
                sd = new StringData(results);
            } else {
                sd.errorMsg = "The database has no Resort Record with id " + id;
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            sd.errorMsg = "Exception thrown in model.Resort.DbMods.findById2(): " + e.getMessage();
        }
        return sd;

    } // findById

    private static StringData validate(StringData insertData) {

        StringData errorMsgs = new StringData();

        errorMsgs.resortName = ValidationUtils.stringValidationMsg(insertData.resortName, 45, true);

        errorMsgs.image = ValidationUtils.stringValidationMsg(insertData.image, 300, false);
        errorMsgs.description = ValidationUtils.stringValidationMsg(insertData.description, 300, true);

        errorMsgs.birthday = ValidationUtils.dateValidationMsg(insertData.birthday, false);
        errorMsgs.visitDate = ValidationUtils.dateValidationMsg(insertData.visitDate, false);
        errorMsgs.ticketPrice = ValidationUtils.decimalValidationMsg(insertData.ticketPrice, false);
        errorMsgs.webUserId = ValidationUtils.integerValidationMsg(insertData.webUserId, true);
        errorMsgs.ticketNumber = ValidationUtils.integerValidationMsg(insertData.ticketNumber, false);

        return errorMsgs;
    } // validate 

    public static StringData insert(StringData insertData, DbConn dbc) {

        StringData errorMsgs = new StringData();
        errorMsgs = validate(insertData);
        if (errorMsgs.getCharacterCount() > 0) {  // at least one field has an error, don't go any further.
                errorMsgs.errorMsg = "Please try again";

            } else { // all fields passed validation

                /*
                  String sql = "SELECT web_user_id, user_email, user_password, membership_fee, birthday, "+
                    "web_user.user_role_id, user_role_type "+
                    "FROM web_user, user_role where web_user.user_role_id = user_role.user_role_id " + 
                    "ORDER BY web_user_id ";
                 */
                // Start preparing SQL statement
                String sql = "INSERT INTO resorts (resort_name, description, image, web_user_id, ticket_price, visit_date, ticket_number) "
                        + "values (?,?,?, ?,?,?,?)";

                // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
                // Only difference is that Sally's class takes care of encoding null 
                // when necessary. And it also System.out.prints exception error messages.
                PrepStatement pStatement = new PrepStatement(dbc, sql);

                // Encode string values into the prepared statement (wrapper class).
                pStatement.setString(1, insertData.resortName); // string type is simple
                pStatement.setString(2, insertData.description);
                pStatement.setString(3, insertData.image);
                pStatement.setInt(4, ValidationUtils.integerConversion(insertData.webUserId));
                pStatement.setBigDecimal(5, ValidationUtils.decimalConversion(insertData.ticketPrice));
                pStatement.setDate(6, ValidationUtils.dateConversion(insertData.visitDate));
                pStatement.setInt(7, ValidationUtils.integerConversion(insertData.ticketNumber));

                // here the SQL statement is actually executed
                int numRows = pStatement.executeUpdate();

                // This will return empty string if all went well, else all error messages.
                errorMsgs.errorMsg = pStatement.getErrorMsg();
                if (errorMsgs.errorMsg.length() == 0) {
                    if (numRows == 1) {
                        errorMsgs.errorMsg = ""; // This means SUCCESS. Let the user interface decide how to tell this to the user.
                    } else {
                        // probably never get here unless you forgot your WHERE clause and did a bulk sql update.
                        errorMsgs.errorMsg = numRows + " records were inserted when exactly 1 was expected.";
                    }
                } else if (errorMsgs.errorMsg.contains("foreign key")) {
                    errorMsgs.errorMsg = "Invalid Web User Id";
                } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                    errorMsgs.errorMsg = "That ticket number is already taken";
                }


        } // customerId is not null and not empty string.
        return errorMsgs;
    } // insert
    
    public static StringData update(StringData inputData, DbConn dbc) {

        StringData errorMsgs = new StringData();
        errorMsgs = validate(inputData);
        if (errorMsgs.getCharacterCount() > 0) {  // at least one field has an error, don't go any further.
            errorMsgs.errorMsg = "Please try again";
            return errorMsgs;

        } else { // all fields passed validation

            /*
                String sql = "SELECT web_user_id, user_email, user_password, membership_fee, birthday, "+
                    "web_user.user_role_id, user_role_type "+
                    "FROM web_user, user_role where web_user.user_role_id = user_role.user_role_id " + 
                    "ORDER BY web_user_id ";
             */
            String sql = "UPDATE resorts SET resort_name=?, description=?, image=?, web_user_id=?, ticket_price=?, visit_date=?, "
                    + "ticket_number=? WHERE resort_id = ?";

            // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
            // Only difference is that Sally's class takes care of encoding null 
            // when necessary. And it also System.out.prints exception error messages.
            PrepStatement pStatement = new PrepStatement(dbc, sql);

            // Encode string values into the prepared statement (wrapper class).
            pStatement.setString(1, inputData.resortName); // string type is simple
            pStatement.setString(2, inputData.description);
            pStatement.setString(3, inputData.image);
            pStatement.setInt(4, ValidationUtils.integerConversion(inputData.webUserId));
            pStatement.setBigDecimal(5, ValidationUtils.decimalConversion(inputData.ticketPrice));
            pStatement.setDate(6, ValidationUtils.dateConversion(inputData.visitDate));
            pStatement.setInt(7, ValidationUtils.integerConversion(inputData.ticketNumber));
            pStatement.setInt(8, ValidationUtils.integerConversion(inputData.resortId));

            // here the SQL statement is actually executed
            int numRows = pStatement.executeUpdate();

            // This will return empty string if all went well, else all error messages.
            errorMsgs.errorMsg = pStatement.getErrorMsg();
            if (errorMsgs.errorMsg.length() == 0) {
                if (numRows == 1) {
                    errorMsgs.errorMsg = ""; // This means SUCCESS. Let the user interface decide how to tell this to the user.
                } else {
                    // probably never get here unless you forgot your WHERE clause and did a bulk sql update.
                    errorMsgs.errorMsg = numRows + " records were updated (expected to update one record).";
                }
            } else if (errorMsgs.errorMsg.contains("foreign key")) {
                errorMsgs.errorMsg = "Invalid Web User Id";
            } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                errorMsgs.errorMsg = "That ticket number is already taken";
            }

        } // customerId is not null and not empty string.
        return errorMsgs;
    } // update

} // class
