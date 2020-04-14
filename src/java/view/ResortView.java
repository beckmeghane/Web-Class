package view;

// classes imported from java.sql.*
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import model.Resort.*;

// classes in my project
import dbUtils.*;

public class ResortView {

    public static StringDataList getAllResorts(DbConn dbc) {

        //PreparedStatement stmt = null;
        //ResultSet results = null;
        StringDataList sdl = new StringDataList();
        try {
            String sql = "SELECT resort_id, resort_name, resorts.image, user_email, birthday, resorts.web_user_id, ticket_price, "+
                    "visit_date, ticket_number, description "+
                    "FROM resorts LEFT JOIN web_user ON resorts.web_user_id = web_user.web_user_id " + 
                    "ORDER BY resort_id ";  // you always want to order by something, not just random order.
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            ResultSet results = stmt.executeQuery();
            while (results.next()) {
                sdl.add(results);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            StringData sd = new StringData();
            sd.errorMsg = "SQL query problem. Trouble adding rows to list. Exception thrown in ResortView.getAllResorts(): " + e.getMessage();
            sdl.add(sd);
        }
        return sdl;
    }
}