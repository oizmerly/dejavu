function LOG(msg) {
    console.log(msg);
}

const Settings = {
    hec: './dejavu.php' // proxy to Splunk HTTP event collector
};

/// Post event to Splunk HTTP Event Collector
function postEventToSplunk(eventData) {
    xhr = new XMLHttpRequest();
    xhr.open('POST', Settings.hec, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            LOG(xhr.responseText);
        } else if (xhr.status != 200) {
            LOG('post failed: (' + xhr.status + ') ' + xhr.responseText);
        }
    };
    xhr.send(JSON.stringify({event: eventData}));
}

/// Setup event listeners
function initEventListeners() {
    let mouseEventHandler = function (event) {
        const target = event.target;
        postEventToSplunk({
            type: event.type,
            info: {
                x: event.x || event.clientX,
                y: event.y || event.clientY,
                target: {id: target.id, name: target.name, class: target.className}
            }
        });
    };
    document.addEventListener('mousedown', mouseEventHandler);
    document.addEventListener('mouseup', mouseEventHandler);
}

document.addEventListener('DOMContentLoaded', function () {
    initEventListeners();
});
