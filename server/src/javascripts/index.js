function tester() {
    console.log('test successful');
}

function sendXMLRequest(path, body) {
    /* 
    *  Handles and returns an XHR promise with a given path of the app
    */
    let url = `http://127.0.0.1:9683/${path}`;

    return new Promise(function (resolve, reject) {
        let request = new XMLHttpRequest();
/*         request.responseType = 'document'; */
        request.open('POST', url, true);
        request.onload = () => {
            let status = request.status;
            if (status >= 200 && status < 300) {
                resolve(request.response);
            } else {
                reject(request.statusText);
            }
        };
        request.onerror = () => {
            console.log(request.statusText);
        };
        request.send(body);
    });
}

async function submitForm() {
    const form = document.getElementById('imgUploadForm');
    const body = new FormData(form);
    try {
        var returnedData = await sendXMLRequest('upload/post', body);
    } catch (error) {
        document.getElementById('errorDisplay').innerText = `Error: ${error}\n XML promise rejected, check for invalid input.`;
        throw new Error('XML Promise rejected, check for invalid input.');
    }

    let mainDiv = document.getElementById('main');
    mainDiv.innerHTML = returnedData;
}

if (window.outerWidth <= 850) {
    document.getElementById('contentContainer').classList.add('mobileStyles')
}