

    window.onload = function (ev) {
        var value
        var min
        var max
        var diff
        var url
        var data = []
        document.getElementById("btn-submit").onclick = function (ev) {
            ev.preventDefault();
            min = document.getElementById("min").value;
            max = document.getElementById("max").value;
            console.log(min);
            console.log(max);
            diff = max - min;
            value = parseInt(Math.floor(Math.random() * diff)) + parseInt(min);
            chrome.tabs.query({
                active: true,
                lastFocusedWindow: true
            }, function (tabs) {
                // and use that tab to fill in out title and url
                var tab = tabs[0];
                if(tab.url!==undefined)
                url = tab.url;
                // console.log(tab.url);
                 
                // url_display(url);
            });
            // alert(url)
            if(url!==undefined){
            var obj = {
                min: min,
                max: max,
                diff: diff,
                value: value,
                url: url,
                update: update,
            };
            if (!obj.update()) {
                if (localStorage.getItem("data_string") !== null) {
                    if (typeof localStorage.data_string !== 'undefined') {
                    data = JSON.parse(localStorage.data_string);}
                }
                data.push(obj);
                localStorage.data_string = JSON.stringify(data)
            }
            document.getElementById("output").innerHTML = value;
            // document.getElementById("output").innerHTML = "active";
        }
        }
        document.getElementById("btn-stop").onclick = function (ev) {
            ev.preventDefault();
            chrome.tabs.query({
                active: true,
                lastFocusedWindow: true
            }, function (tabs) {
                // and use that tab to fill in out title and url
                var tab = tabs[0];
                // console.log(tab.url);
                // alert(tab.url);
                if (localStorage.getItem("data_string") !== null) {
                var data = JSON.parse(localStorage.data_string);
                data = data.filter(n => n.url !== tab.url);
                localStorage.data_string = JSON.stringify(data)}
                console.log("assasa");
                // url_display(tab.url);
            });
            document.getElementById("output").innerHTML = "stopped";
        }
    
    var x = setInterval(function () {

        if (localStorage.getItem("data_string") !== null){
        chrome.tabs.query({
            active: true,
            lastFocusedWindow: true
        }, function (tabs) {
            // and use that tab to fill in out title and url
            var tab = tabs[0];
            if (tab){
            if(tab.url!==undefined)
                url = tab.url;
            }
        });
            // console.log(tab.url);
            // alert(tab.url);
            if(url!==undefined){
            var json = JSON.parse(localStorage.data_string);
            for (var index = 0; index < json.length; ++index) {
                var data = json[index];
                if (data.url == url) {
                    document.getElementById("output").innerHTML = data.value;
                    // document.getElementById("output").innerHTML = "active";
                    break;
                }
            }
        }}
    }, 1);

    function url_display(url) {

        document.getElementById("url").innerHTML = url;
    }

    function update() {
        if (localStorage.getItem("data_string") !== null){
        var json = JSON.parse(localStorage.data_string);
        for (var index = 0; index < json.length; ++index) {

            var animal = json[index];

            if (animal.url == this.url) {
                animal.min = this.min;
                animal.max = this.max;
                animal.diff = this.diff;
                animal.url = this.url;
                animal.value = this.value;
                localStorage.data_string = JSON.stringify(json)
                return true;
            }
        }
        return false;
    }
}
    }
