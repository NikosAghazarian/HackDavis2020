window.onresize = mobileStyleToggle;

function mobileStyleToggle() {
    let parentElem = document.getElementsByTagName('html')[0];
    if (/Android|webOS|iPhone|iPad|BlackBerry|Windows Phone|Opera Mini|IEMobile|Mobile/i.test(navigator.userAgent)) {
        if (!parentElem.classList.value.includes('mobileStyles')) {
            parentElem.classList.add('mobileStyles');
        }
    }
    else {
        if (parentElem.classList.value.includes('mobileStyles')) {
            parentElem.classList.remove('mobileStyles');
        }
    }
}

function sendXMLRequest(path, body, method = 'POST') {
    /* 
    *  Handles and returns an XHR promise with a given path of the app
    */
    let url = `http://127.0.0.1:9683/${path}`;

    return new Promise(function (resolve, reject) {
        let request = new XMLHttpRequest();
        request.open(method, url, true);
        request.onload = () => {
            let status = request.status;
            if (status >= 200 && status < 300) {
                resolve([request.response, request.getResponseHeader('fileId')]);
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
    mainDiv.innerHTML = returnedData[0];
    processFormReturn(returnedData);
}

function processFormReturn(returnedData) {
    console.log(returnedData.toString());
    createTable(returnedData[1]);
}