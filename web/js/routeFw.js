"use strict";

function routeFw(params) {

    var fw = {}; // creating and adorning this object to be passed back to the HTML page.

    // Providing a parameter object instead of a parameter list is good software design. 
    // It makes the call to the function be more self documenting and order of parameters 
    // does not matter. 

    // Here's how you can either accept a preference or set a default value in one line of code. 
    // For example, if the params object has a contentId property, you use that, otherwise,
    // you set it to "view".
    var contentId = params.contentId || "view";

    if (!params.routeArray || params.routeArray[0]) {
        alert("parameter object must specify array 'routeArray' with at least one element");
        return; 
    }

    // Declare a (private) array to store the routes.
    var routes = params.routeArray;

    // private function that will be called whenever a link is clicked (or href changed)
    function router() { // private function

        var path = location.hash; 
        console.log('path is ' + path);
        // prints something like /home

        // Use the url like an index (JS associative array notation) to find the desired
        // component (function) to run. The component will place content in the content
        // area. If a link is clicked for which a route was never set, give error message.
        if (!routes[path]) {
            document.getElementById(contentId).innerHTML = "<p>Error: unknown link '" + path +
                    "' never added to the routing table.</p>";
        } else {
            routes[path](contentId);
        }
    }

    fw.printRoutes = function () {
        console.log("routes will be printed on the next line ");

        // if you console.log an object (by itself), you'll be able to see all of it's 
        // contents (don't precede with character string and concatenate).
        console.log(routes);
    };

    // Whenever a link is clicked (or window.location.hash changes), 
    // invoke function router (defined below).
    window.addEventListener('hashchange', router);

    // without this line of code, initial rendering will have no content.
    // HTML coder must define a component (function) for "#/" to specify
    // which initial component function should run at page load time.
    location.hash = "#/";
    console.log("initial location.hash is "+location.hash);

    return fw;
}