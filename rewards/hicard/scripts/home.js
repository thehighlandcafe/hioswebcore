function currentExpandDown() {
    document.getElementById("currentBoxesToExpand").style.display = "block";
    document.getElementById("currentExpandDown").style.display = "none";
    document.getElementById("currentExpandUp").style.display = "block";
}

function currentExpandUp() {
    document.getElementById("currentBoxesToExpand").style.display = "none";
    document.getElementById("currentExpandDown").style.display = "block";
    document.getElementById("currentExpandUp").style.display = "none";
}