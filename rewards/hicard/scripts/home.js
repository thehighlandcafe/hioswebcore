function expandDown(hidingButton, showingButton, showingSection) {
    document.getElementById(hidingButton).style.display = "none";
    document.getElementById(showingButton).style.display = "block";
    document.getElementById(showingSection).style.display = "block";
}

function expandUp(hidingButton, showingButton, hidingSection) {
    document.getElementById(hidingButton).style.display = "none";
    document.getElementById(showingButton).style.display = "block";
    document.getElementById(hidingSection).style.display = "none";
}

function changeClassMiddle(div) {
    document.getElementById(div).className = "translucentAboutBox joinMiddle";
}

function changeClassJoinBottom(div) {
    document.getElementById(div).className = "translucentAboutBox joinBottom";
}

function changeClassJoinTop(div) {
    document.getElementById(div).className = "translucentAboutBox joinTop";
}

function changeClassFull(div) {
    document.getElementById(div).className = "translucentAboutBox full";
}