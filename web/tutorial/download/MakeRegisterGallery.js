function MakeRegisterGallery(params) {//params are lisr and id

    var list = params.list;
    var newList = [];
    var picNum = 0;

    for (var i = 0; i < list.length; i++) {
        if (list[i].image !== "") {
            newList.push(list[i]);
        }
    }

    list = newList;
    console.log(list);

    var ele = document.getElementById(params.id);
    ele.style.width = "35%";
    ele.style.marginRight = "40px";
    var container = document.createElement("div");
    container.className = "container";
    ele.appendChild(container);

    //var chosen = document.createElement("div");
    //container.appendChild(chosen);
    var big = document.createElement("div");
    big.className = "mySlides";
    container.appendChild(big);

    var num = document.createElement("div");
    num.innerHTML = "1 / " + list.length;//not right
    num.className = "numbertext";
    big.appendChild(num);

    var image = document.createElement("img");
    image.src = list[picNum].image;
    image.style.width = "100%";
    big.appendChild(image);

    var prevButton = document.createElement("a");
    prevButton.className = "prev";
    prevButton.innerHTML = "&#10094";
    container.appendChild(prevButton);

    var nextButton = document.createElement("a");
    nextButton.className = "next";
    nextButton.innerHTML = "&#10095";
    container.appendChild(nextButton);

    var row = document.createElement("div");
    row.className = "row";
    container.appendChild(row);


    var captionContainer = document.createElement("div");
    captionContainer.className = "caption-container";
    container.appendChild(captionContainer);

    var caption = document.createElement("p");
    caption.innerHTML = list[picNum].resortName;
    captionContainer.appendChild(caption);

    for (var i = 0; i < list.length; i++) {
        var column = document.createElement("div");
        column.className = "column";
        row.appendChild(column);

        var miniImage = document.createElement("img");
        miniImage.src = list[i].image;
        miniImage.thing = i;
        miniImage.className = "demo cursor";
        miniImage.style.height = "53px";
        column.appendChild(miniImage);

        miniImage.onclick = function () {
            picNum = this.thing;
            image.src = this.src;
            num.innerHTML = "" + (picNum + 1) + " / " + list.length;
            caption.innerHTML = list[picNum].resortName;
            //EVERY WHERE YOU UPDATE PIC, REMOVE " ACTIVE" FROM ALL MINI IMAGES AND ADD IT TO PICNUM ONE

        };

    }

    var message = document.createElement("p");
    container.appendChild(message);

    var modal = document.createElement("div");
    modal.className = "modal";
    ele.appendChild(modal);

    var modalContent = document.createElement("div");
    modalContent.className = "modal-content";
    modal.appendChild(modalContent);

    var span = document.createElement("span");
    span.className = "close";
    span.innerHTML = "&times;";
    modalContent.appendChild(span);

    var form = document.createElement("form");
    modalContent.appendChild(form);

    var container1 = document.createElement("div");
    container1.className = "container1";
    form.appendChild(container1);

    var head = document.createElement("h1");
    head.innerHTML = "Purchase Ticket";
    container1.appendChild(head);

    var des = document.createElement("p");
    des.innerHTML = "Please fill in this form to purchase a resort ticket to " + list[picNum].resortName;
    container1.appendChild(des);
    container1.appendChild(document.createElement("hr"));


    var label3 = document.createElement("label");
    label3.for = "date";
    container1.appendChild(label3);

    var input3 = document.createElement("input");
    input3.type = "text";
    input3.placeholder = "Enter Visit Date";
    input3.name = "date";
    container1.appendChild(input3);


    var label4 = document.createElement("label");
    label4.for = "price";
    container1.appendChild(label4);

    var input4 = document.createElement("input");
    input4.type = "text";
    input4.placeholder = "Enter Ticket Price";
    input4.name = "date";
    //required
    container1.appendChild(input4);


    var label5 = document.createElement("label");
    label5.for = "descrip";
    container1.appendChild(label5);

    var input5 = document.createElement("input");
    input5.type = "text";
    input5.placeholder = "Enter Description";
    input5.name = "descrip";
    //required
    container1.appendChild(input5);


    var label6 = document.createElement("label");
    label6.for = "ticketNum";
    container1.appendChild(label6);

    var input6 = document.createElement("input");
    input6.type = "text";
    input6.placeholder = "Enter Ticket Number";
    input6.name = "ticketNum";
    //required
    container1.appendChild(input6);


    var label7 = document.createElement("label");
    label7.for = "user";
    container1.appendChild(label7);

    var input7 = document.createElement("input");
    input7.type = "text";
    input7.placeholder = "Enter Web User ID";
    input7.name = "user";
    //required
    container1.appendChild(input7);


    var submit = document.createElement("button");
    submit.className = "registerbtn";
    submit.type = "button";
    submit.innerHTML = "Buy";
    container1.appendChild(submit);


    image.onclick = function () {
        modal.style.display = "block";
        des.innerHTML = "Please fill in this form to purchase a resort ticket to " + list[picNum].resortName;
    };

// When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    };

// When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    prevButton.onclick = prevPic;
    nextButton.onclick = nextPic;

    function prevPic() {
        //console.log(image);
        picNum--;

        if (picNum < 0) {
            picNum = list.length - 1;
        }
        image.src = list[picNum].image;
        caption.innerHTML = list[picNum].resortName;
        num.innerHTML = "" + (picNum + 1) + " / " + list.length;
    }

    function nextPic() {
        picNum++;

        if (picNum === list.length) {
            picNum = 0;
        }
        image.src = list[picNum].image;
        caption.innerHTML = list[picNum].resortName;
        num.innerHTML = "" + (picNum + 1) + " / " + list.length;
    }

    submit.onclick = function () {
        console.log("insertSave was called");
        // create a user object from the values that the user has typed into the page.

        var resortInputObj = {
            "resortId": "",
            "resortName": list[picNum].resortName,
            "image": list[picNum].image,
            "webUserId": input7.value,
            "ticketPrice": input4.value,
            "visitDate": input3.value,
            "description": input5.value,
            "ticketNumber": input6.value,
            "userEmail": "",
            "birthday": "",
            "errorMsg": ""
        };
        console.log(resortInputObj);
        // build the url for the ajax call. Remember to escape the user input object or else 
        // you'll get a security error from the server. JSON.stringify converts the javaScript
        // object into JSON format (the reverse operation of what gson does on the server side).
        var myData = escape(JSON.stringify(resortInputObj));
        var url = "../../webAPIs/insertResortAPI.jsp?jsonData=" + myData;
        ajax(url, insertReqGood, "recordError");
        function insertReqGood(jsonObj) {
            // Running this function does not mean insert success. It just means that the Web API
            // call (to insert the record) was successful.
            console.log("insertReqGood was called here is httpRequest.");
            console.log(jsonObj);
            // the server prints out a JSON string of an object that holds field level error 
            // messages. The error message object (conveniently) has its fiels named exactly 
            // the same as the input data was named. 

            input5.placeholder = jsonObj.description;
            input6.placeholder = jsonObj.ticketNumber;
            input4.placeholder = jsonObj.ticketPrice;
            input3.placeholder = jsonObj.visitDate;
            input7.placeholder = jsonObj.webUserId;
            if (jsonObj.errorMsg.length === 0) { // success
                jsonObj.errorMsg = "Record successfully inserted !!!";
            }
            message.innerHTML = jsonObj.errorMsg;
        }
    };

    ele.setPicNum = function (number) {
        if ((number >= 0) && (number < list.length)) {
            picNum = number;

            image.src = list[picNum].image;
            caption.innerHTML = list[picNum].resortName;
            num.innerHTML = "" + (picNum + 1) + " / " + list.length;
        }
    };

    return ele;


}