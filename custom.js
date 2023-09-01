var base_url = "https://exceed.orbundsis.com/api"
var clientId = "exceed"
var secretKey = "e0b6d2f0-f73a-4af2-bd3a-5b88872a3c5e"

function getSessionId() {
    $.ajax({
        url: `${base_url}/public/session-id`,
        crossDomain: true,
        headers: {
            "clientId": clientId,
            "secretKey": secretKey,
            "Content-Type": "application/json",
        },
        success: function (result) {
            console.log("sessionId::", result.sessionId)
            localStorage.setItem("sessionId", result.sessionId);
        }
    });
}

function getCartCount() {
    let cartCount = 0
    let cartStudents = sessionStorage.getItem("cartStudents");
    if (cartStudents) {
        cartStudents = JSON.parse(cartStudents);
        if (cartStudents.length > 0) {
            var res = {};
            cartStudents.forEach(function (v) {
                const classId = v.classIds[0].toString()
                res[classId] ? res[classId]++ : res[classId] = 1;
            })
            cartCount = Object.keys(res).length
        }
    }
    $("#lblCartCount").text(cartCount)
    return cartCount
}

function removeAllAndRedirect() {
    localStorage.clear();
    sessionStorage.clear();
    window.location = "./registration-detail.php";
}