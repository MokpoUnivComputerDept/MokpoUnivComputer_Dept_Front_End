const editor = new toastui.Editor({
    el: document.querySelector('#editor'),
    plugins: [toastui.Editor.plugin.codeSyntaxHighlight],
    initialEditType: 'markdown',
    previewStyle: 'vertical',
    height: '700px',

    hooks: {
        addImageBlobHook(blob, callback) {
            uploadImageToS3(blob)
                .then(url => {;
                    callback(url)
                })
                .catch(error => {
                    console.error('Error uploading image to S3:', error);
                });
        }
    }
});


async function uploadImageToS3(blob) {
    
}

// const Url = '13.124.61.141:8080/notice/create'
// const Url = 'http://13.124.61.141:8080/noticeCreate/create';
const s3Url = '';

document.querySelector('#save').addEventListener('click', async() => {
    try {
        const content = editor.getMarkdown();

        const response = await fetch(Url, {
            method: 'POST',
            body: JSON.stringify({content}),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            console.log('성공')
        } else{
            console.error('저장 오류', response.status);
        }
    } catch(error) {
        console.error('오류발생', error);
    }
});


document.getElementById('multipartInputBtn').addEventListener('click', async () => {
    const multipartInput_fileInput = document.getElementById('multipartInput');
    const file = multipartInput_fileInput.files[0];
    const fileName = file.name;
    const fileSize = file.size;

    // 파일크기 얼마로....
    if (fileSize > 3 * 1024 * 1024 * 1024) {
        alert('The file you are trying to upload is too large. (under 3GB)');
        return;
    }

    try {
        // 업로드 시작 요청
        let start = new Date();
        let res = await axios.post(`${s3Url}/initiate-upload`, { fileName: fileName });
        const uploadId = res.data.uploadId;
        const newFilename = res.data.fileName;

        sessionStorage.setItem('uploadId', uploadId);
        sessionStorage.setItem('fileName', newFilename);

        const chunkSize = 10 * 1024 * 1024;
        const chunkCount = Math.floor(fileSize / chunkSize) + 1;

        let multiUploadArray = [];

        for (let uploadCount = 1; uploadCount < chunkCount + 1; uploadCount++) {
            let start = (uploadCount - 1) * chunkSize;
            let end = uploadCount * chunkSize;
            let fileBlob = uploadCount < chunkCount ? file.slice(start, end) : file.slice(start);

            let getSignedUrlRes = await axios.post(`${s3Url}/upload-signed-url`, {
                fileName: newFilename,
                partNumber: uploadCount,
                uploadId: uploadId
            });

            let preSignedUrl = getSignedUrlRes.data.preSignedUrl;

            let uploadChunck = await fetch(preSignedUrl, {
                method: 'PUT',
                body: fileBlob
            });

            let EtagHeader = uploadChunck.headers.get('ETag').replaceAll('\"', '');
            let uploadPartDetails = {
                awsETag: EtagHeader,
                partNumber: uploadCount
            };

            multiUploadArray.push(uploadPartDetails);
        }

        const completeUpload = await axios.post(`${s3Url}/complete-upload`, {
            fileName: newFilename,
            parts: multiUploadArray,
            uploadId: uploadId,
            userImageName: userImageName
        });
        let end = new Date();
        console.log("파일 업로드 하는데 걸린 시간 : " + (end - start) + "ms")
        console.log(completeUpload.data, ' 업로드 완료 응답값');
    } catch (err) {
        console.log(err, err.stack);
    }
});

// document.getElementById('abortUploadBtn').addEventListener('click', () => {
//     const uploadId = sessionStorage.getItem('uploadId');
//     const fileName = sessionStorage.getItem('fileName');
//     axios
//         .post(`${s3Url}/abort-upload`, { fileName: fileName, uploadId: uploadId })
//         .then((r) => console.log(r.data))
//         .catch((err) => console.error(err));
//     clearInterval();
// });