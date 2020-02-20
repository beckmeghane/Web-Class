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
    `;
    document.getElementById(id).innerHTML = content;
}