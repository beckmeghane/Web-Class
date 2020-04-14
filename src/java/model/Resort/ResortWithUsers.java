/*
This class will be good for web user update - provides a single web user plus the list of user Roles (for pick list).
 */
package model.Resort;

public class ResortWithUsers {
    
    public StringData resort = new StringData();
    public model.webUser.StringDataList userInfo = new model.webUser.StringDataList();
    
}