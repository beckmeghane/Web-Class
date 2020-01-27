function home(id) {

    // ` this is a "back tick". Use it to define multi-line strings in JavaScript.
    var content = `
        <h2>My Home Page Content</h2>

        <p>
            Skiing is popular all across the globe, and there are ski resorts everywhere! This web page will provide information about some of the most popular resorts to all the skiers and boarders out there. You can also buy lift tickets to your favorite resorts here.
        </p>

        <p>
            Click <a href="https://www.skimag.com/ski-resort-life">here</a> to see SKI Magazine's comprehensive guide to ski resort life in the United States. You can browse through Eastern, Western, and even editor's choice resorts!
        </p>

        <p style="text-align:center;">
            <img src="pics/skier.jpg" class="stopFloat" style="width:50%; border-radius:10px;">
        </p>
    `;
    document.getElementById(id).innerHTML = content;
}