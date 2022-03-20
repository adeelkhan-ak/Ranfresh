var x = setInterval(function () {
    if (localStorage.getItem("data_string") === null) {} else {

        var json = JSON.parse(localStorage.data_string);
        for (var index = 0; index < json.length; ++index) {

            var data = json[index];
            change(data);
        }
        localStorage.data_string = JSON.stringify(json)

    }



}, 1000);


function change(data) {

    data.value = data.value - 1;
    //document.getElementById("output").innerHTML = value;
    if (data.value < 0) {
        // clearInterval(x);
        //document.getElementById("output").innerHTML = "EXPIRED";
        var min = localStorage.min;
        data.value = parseInt(Math.floor(Math.random() * data.diff)) + parseInt(data.min);
        //document.getElementById("output").innerHTML = value;
         
            chrome.tabs.query({
                url: data.url
            }, function (tabs) {
                tabs.forEach((tab) => {
                    chrome.tabs.reload(tab.id)
                })
                // reload tab with one of the methods from linked answer
            })
    
    }

}