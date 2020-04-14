function blog(id) {

    // ` this is a "back tick". Use it to define multi-line strings in JavaScript.
    var content = `  
        <div class="blogPost">
            <h2>Blog 1</h2>
            <p>
                I have not had any formal teaching on databases before. I interned at Lockheed Martin over the summer where I helped develop a web application. I wrote one basic query to grab all of the rows that contained a certain user id when that user was searched. I did not write any queries that updated or inserted rows, and my mentor basically wrote the code for me.
            </p>
    
            <p>
                I found it easy to add tables, columns (including the foreign key), and data because it was pretty straightforward, and the query to add a foreign key was given to us. I found it difficult to write the SELECT queries since examples weren't given. I really had to understand SQL terms.
            </p>
        
            <p>
                Click <a href="HW2.docx">here</a> to view my Database Setup screenshots.
            </p>
        </div>
    
        <div class="blogPost">
            <h2>Blog 2</h2>
            <p>
                For the routing homework, I found most of the coding to be relatively easy because the Javascript code was already written. It was tedious pasting and formatting all of my content into the content variable. I also ran into a styling issue after I had changed the id of the content to "view". The CSS file still had my styling guildings under #content, and I had to change it to #view.
            </p>
        </div>
    
        <div class="blogPost">
            <h2>Blog 3</h2>
            <p>
                I worked on this homework for a long time. I found it easy to hard-code 5 of my database entries, incorporate a filterable table and sortable table with my JSON data, and add extra routing pages to my web page. I had difficulty trying to combine the two functionality of the two table types. At first, I couldn't get the "filter by" and input box to show up even though it was in the code. Then, I wasn't able to filter the table after it had been click-sorted. I was finally able to get this to work, but it took a long time.
            </p>
    
            <p>
                Click <a href="json/allWebUsers.json">here</a> for the JSON file that shows web user data that I hardcoded.
            </p>
    
            <p>
                Click <a href="json/allResorts.json">here</a> for the JSON file that shows resort data that I hardcoded.
            </p>
        </div>
    
        <div class="blogPost">
            <h2>Blog 4: JS Slideshow</h2>
            <p>
                It was easy to incorporate the two slideshows next to each other with captions since I had already done this in lab. I did find it difficult to invoke the public method because of the way the html content is injected to the view. I finally was able to get it to work with providing the "change caption" button with an onclick event in the JS code rather than in the html tag.
            </p>
        </div>
    
        <div class="blogPost">
            <h2><a href="tutorial/proposal.pdf">Blog 4: Tutorial Proposal</a></h2>
            <p>
                It was very easy to explain my proposed component's functionality and type up the pdf. It was also easy to copy and paste proof of concept code from W3Schools, but it was very time-consuming and tedious to make sure the html text shows correctly in the HTML file with the lt and nbsp tags.'
            </p>
        </div>
    
        <div class="blogPost">
            <h2>Blog 5: Web API</h2>
            <p>
                I did not write any of my own server side database code. I used the sample code provided in the DbUtils java source code packages. I found editing the sample code for the jsp files, the DbConn java file, the StringData java file, and the view java file fairly easy but tedious. I had to make sure I included and imported the write packages, which was a little tricky to figure out. It was also easy to change my tables to pull data from the database rather than the JSON files.
            </p>
    
            <p>
                Click <a href="HW5.docx">here</a> to see my document about java DB access errors.
            </p>
    
            <p>
                Click <a href="webAPIs/listUsersAPI.jsp">here</a> for the Web API that lists the users from my DB.
            </p>
    
            <p>
                Click <a href="webAPIs/listResortsAPI.jsp">here</a> for the Web API that lists the resorts from my DB.
            </p>
    
            <p>
                My previous JSON files for the table data are now linked in Blog 3.
            </p>
        </div>
    
        <div class="blogPost">
            <h2>Blog 6: Log On</h2>
            <p>
                For this homework assignment, I found it easy to use the API sample code to incorporate email and password input. I did have difficulty getting the correct user JSON to show up if the user was not the first web user. I fixed this by changing my LEFT JOIN SQL statement back to the sample code (manual join). It was easy writing the API code that set and got session data. I kept getting non-successful function calls with the regular ajax sample code, so I had to write a new ajax function. Routing was relatively easy, too.
            </p>
    
            <p>
                Click <a href="webAPIs/listUsersAPI.jsp">here</a> for the Web API that lists the users from my DB.
            </p>
    
            <p>
                Click <a href="webAPIs/logonAPI.jsp">here</a> for my Log On Web API.
            </p>
    
            <p>
                Click <a href="webAPIs/getProfileAPI.jsp">here</a> for my Get Profile Web API.
            </p>
    
            <p>
                Click <a href="webAPIs/logoffAPI.jsp">here</a> for my Log Off Web API.
            </p>
        </div>
    
        <div class="blogPost">
            <h2>Blog 7: Insert</h2>
            <p>
                It was easy to use the sample code to insert a user, because I only had to refactor it into my routing. It was also relatively easy to refactor the sample insert user code to insert "other" by changing all the variables to Resort StringData fields. It was a little confusing and tedious to make the drop down list of foreign keys, but I eventually got it. It was easy to display error messages. I had one tricky problem with my Ajax call. It was not returning the same type of value as the sample code expected, but I eventually figured out what tye of object it was returning. 
            </p>
    
            <p>
                Click <a href="HW7.docx">here</a> to view my Database design and data screenshots.
            </p>
    
        </div>
    
        <div class="blogPost">
            <h2>Blog 7: Tutorial</h2>
            <p>
                It was very tedious to manually create each HTML DOM element that I knew I needed to show and give them their respective properties. Originally, I had some trouble with my onClick functions, because I expected the logic to work like HTML pages with scripts. I did some minor debugging and resolved it. Much of my logic used the same logic of a slideshow. Updating the picture and changing the picture were easy for me, because I did the slideshow homework assignment. My component incorporated an insert API, which I had trouble implementing in the beginning. The last big that I had to overcome was the public method call from the HTML page. I realized that I had to call the public method inside the ajax success function because of the asychonicity. 
            </p>
    
            <p>
                Click <a href="tutorial/download/demo.html">here</a> to view my tutorial demo.
            </p>
             
            <p>
                Click <a href="tutorial/index.html">here</a> to view my tutorial introduction.
            </p>
    
        </div>
    
        <div class="blogPost">
            <h2>Blog 8: Update</h2>
            <p>
                For this homework assignment, I could just use the APIs that I wrote for the corresponding lab. It was also easy to take the sample update user UI code and make minor modifications to fully integrate user update. I did find it tedious and a little confusing to populate the chosen resort's data into the update UI, because I had to make the new getResortWithUsersAPI and java class. I realized that I did not need to do that after the fact, because I had already populated that drop-down menu of foreign keys for my insert lab.
            </p>
    
            <p>
                Click <a href="HW7.docx">here</a> to view my Database design and data screenshots.
            </p>
    
        </div>
    `;
    document.getElementById(id).innerHTML = content;
}