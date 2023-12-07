//function for texting people

function myFunction() {
    var x = document.getElementById("myText").value;
    document.getElementById("newText").innerHTML = x;
    document.getElementById('newContainer').style.display = "block";
    document.getElementById('myText').value = "";
}

/*function displayNewContainer() {
    document.getElementById('newContainer').style.display = "block";
}*/

function deleteMessage() {
    var blank = ""
    document.getElementById("newText").innerHTML = blank;
    document.getElementById("newContainer").style.display = "none";
}

//social navigation

function showHimessageDiv() {
    //nav

    document.getElementById("himessageActive").style.display = "block";
    document.getElementById("hicallActive").style.display = "none";
    document.getElementById("hicontactsActive").style.display = "none";
    
    //maincontent display changes to enable himessage

    document.getElementById("himessage").style.display = "block";
    document.getElementById("hicall").style.display = "none";
    document.getElementById("hicontacts").style.display = "none";
}

function showHicallDiv() {
    //nav

    document.getElementById("himessageActive").style.display = "none";
    document.getElementById("hicallActive").style.display = "block";
    document.getElementById("hicontactsActive").style.display = "none";
        
    //maincontent display changes to enable hicall

    document.getElementById("himessage").style.display = "none";
    document.getElementById("hicall").style.display = "block";
    document.getElementById("hicontacts").style.display = "none";
}

function showHicontactsDiv() {
    //nav

    document.getElementById("himessageActive").style.display = "none";
    document.getElementById("hicallActive").style.display = "none";
    document.getElementById("hicontactsActive").style.display = "block";
        
    //maincontent display changes to enable hicontacts

    document.getElementById("himessage").style.display = "none";
    document.getElementById("hicall").style.display = "none";
    document.getElementById("hicontacts").style.display = "block";
}

function showNav() {
    document.getElementById("navigation").style.display = "block";
    document.getElementById("showNav").style.display = "none";
    document.getElementById("hideNav").style.display = "block";
}

function hideNav() {
    document.getElementById("navigation").style.display = "none";
    document.getElementById("showNav").style.display = "block";
    document.getElementById("hideNav").style.display = "none";
}

//PHONE FUNCTIONS

function diallerPhone() {
    document.getElementById("phoning").style.display = "block";
    document.getElementById("hicall").style.display = "none";
    document.getElementById("headerBlock").style.display = "none";
    document.getElementById("footerBlock").style.display = "none";

    var phone = document.getElementById("diallerText").value;
    document.getElementById("phoneNumber").innerHTML = phone;
    document.getElementById("diallerImage").src = "https://cdn-icons-png.flaticon.com/512/3237/3237472.png"
}

function contact1() {
    document.getElementById("phoning").style.display = "block";
    document.getElementById("hicall").style.display = "none";
    document.getElementById("headerBlock").style.display = "none";
    document.getElementById("footerBlock").style.display = "none";

    var phone = document.getElementById("name1").innerHTML;
    document.getElementById("phoneNumber").innerHTML = phone;
    document.getElementById("diallerImage").src = "avatar2.jpg"
}

function contact2() {
    document.getElementById("phoning").style.display = "block";
    document.getElementById("hicall").style.display = "none";
    document.getElementById("headerBlock").style.display = "none";
    document.getElementById("footerBlock").style.display = "none";

    var phone = document.getElementById("name2").innerHTML;
    document.getElementById("phoneNumber").innerHTML = phone;
    document.getElementById("diallerImage").src = "avatar4.jpg"
}

function contact3() {
    document.getElementById("phoning").style.display = "block";
    document.getElementById("hicall").style.display = "none";
    document.getElementById("headerBlock").style.display = "none";
    document.getElementById("footerBlock").style.display = "none";

    var phone = document.getElementById("name3").innerHTML;
    document.getElementById("phoneNumber").innerHTML = phone;
    document.getElementById("diallerImage").src = "../pics/logos/thc.png";
}

/*function callNoise() {
    var audio = new Audio('callsound.mp3')
    audio.play()
    audio.loop = true;
}*/

function hangUp() {
    document.getElementById("phoning").style.display = "none";
    document.getElementById("hicall").style.display = "block";
    document.getElementById("headerBlock").style.display = "block";
    document.getElementById("footerBlock").style.display = "block";

    document.getElementById("diallerText").value = "";
    phone = "";
    //audio.stop();
    //audio.currentTime = 0;
}

//CONTACTS FUNCTIONS

function contactInfo1() {
    document.getElementById('hicontacts').style.display = "none";
    document.getElementById("headerBlock").style.display = "none";
    document.getElementById("contactInfo").style.display = "block";
    document.getElementById("footerBlock").style.display = "none";

    //filling the empty text fields

    var phone = "+44 123456789";
    var name = "Me";
    document.getElementById("phoneField").innerHTML = phone;
    document.getElementById("contactName").innerHTML = name;
    document.getElementById("contactImage").src = "avatar1.jpg"
}

function contactInfo2() {
    document.getElementById('hicontacts').style.display = "none";
    document.getElementById("headerBlock").style.display = "none";
    document.getElementById("contactInfo").style.display = "block";
    document.getElementById("footerBlock").style.display = "none";

    //filling the empty text fields

    var phone = "+44 3494472042";
    var name = document.getElementById("name1").innerHTML;
    document.getElementById("phoneField").innerHTML = phone;
    document.getElementById("contactName").innerHTML = name;
    document.getElementById("contactImage").src = "avatar2.jpg";
}

function contactInfo3() {
    document.getElementById('hicontacts').style.display = "none";
    document.getElementById("headerBlock").style.display = "none";
    document.getElementById("contactInfo").style.display = "block";
    document.getElementById("footerBlock").style.display = "none";

    //filling the empty text fields

    var phone = "+44 4839392047";
    var name = document.getElementById("name2").innerHTML;
    document.getElementById("phoneField").innerHTML = phone;
    document.getElementById("contactName").innerHTML = name;
    document.getElementById("contactImage").src = "avatar4.jpg"
}

function contactInfo4() {
    document.getElementById('hicontacts').style.display = "none";
    document.getElementById("headerBlock").style.display = "none";
    document.getElementById("contactInfo").style.display = "block";
    document.getElementById("footerBlock").style.display = "none";

    //filling the empty text fields

    var phone = "+44 3403849066";
    var name = "Bro";
    document.getElementById("phoneField").innerHTML = phone;
    document.getElementById("contactName").innerHTML = name;
    document.getElementById("contactImage").src = "avatar3.jpg";
}

function contactInfo5() {
    document.getElementById('hicontacts').style.display = "none";
    document.getElementById("headerBlock").style.display = "none";
    document.getElementById("contactInfo").style.display = "block";
    document.getElementById("footerBlock").style.display = "none";

    //filling the empty text fields

    var phone = "+44 3904395760";
    var name = "Boss";
    document.getElementById("phoneField").innerHTML = phone;
    document.getElementById("contactName").innerHTML = name;
    document.getElementById("contactImage").src = "avatar5.jpg"
}

function contactInfo6() {
    document.getElementById('hicontacts').style.display = "none";
    document.getElementById("headerBlock").style.display = "none";
    document.getElementById("contactInfo").style.display = "block";
    document.getElementById("footerBlock").style.display = "none";

    //filling the empty text fields

    var phone = "+44 800400900";
    var name = document.getElementById("name3").innerHTML;
    document.getElementById("phoneField").innerHTML = phone;
    document.getElementById("contactName").innerHTML = name;
    document.getElementById("contactImage").src = "../pics/logos/thc.png"
}

//going back to contacts page

function backToContacts() {
    document.getElementById('hicontacts').style.display = "block";
    document.getElementById("headerBlock").style.display = "block";
    document.getElementById("contactInfo").style.display = "none";
    document.getElementById("footerBlock").style.display = "block";

    //emptying the values

    var phone = "";
    var name = "";
}