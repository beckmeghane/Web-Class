function blog(id) {

    // ` this is a "back tick". Use it to define multi-line strings in JavaScript.
    var content = `  
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
        
        <h2>Blog 2</h2>
        <p>
            For the routing homework, I found most of the coding to be relatively easy because the Javascript code was already written. It was tedious pasting and formatting all of my content into the content variable. I also ran into a styling issue after I had changed the id of the content to "view". The CSS file still had my styling guildings under #content, and I had to change it to #view.
        </p>
      
    `;
    document.getElementById(id).innerHTML = content;
}