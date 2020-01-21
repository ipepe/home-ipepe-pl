var meter_url = 'https://svr7.supla.org/direct/645/VhJ3zMYYTDzM/read';
var update = function(){
    var req = new XMLHttpRequest();
    req.open('GET', 'https://skipcors.ipepe.pl/req?key=dev&url='+btoa(meter_url), true);
    req.onreadystatechange = function (aEvt) {
        console.log(req.readyState === 4, req.status === 200);
        if (req.readyState === 4 && req.status === 200){
            var supla_response = JSON.parse(JSON.parse(req.responseText)['response']['body'])
            supla_response.phases.forEach(function(phase, index){
                var gauge = document.getElementById('gauge' + (index+1))
                gauge.querySelector('.gauge-center').dataset.value = phase.powerActive.toFixed(2)
                gauge.querySelector('.needle').style.transform = 'rotate(' + Math.min(phase.powerActive, 180) + 'deg)'
            })
        }
    };
    req.send(null);
};
setInterval(update, 5000);
update();
