const editor = new toastui.Editor({
    el: document.querySelector('#editor'),
    plugins: [toastui.Editor.plugin.codeSyntaxHighlight],
    initialEditType: 'wysiwyg',
    previewStyle: 'vertical',
    height: '700px',
});

const Url = 'http://13.124.61.141:8080/upload'

document.querySelector('#save').addEventListener('click', async() => {
    const multipartInput_fileInput = document.getElementById('upload1');
    const file = multipartInput_fileInput.files;
    const firstFile = file[0];
    const fileName = file.name;
    const fileSize = file.size;

    if (fileSize > 3 * 1024 * 1024 * 1024) {
        alert('The file you are trying to upload is too large. (under 3GB)');
        return;
    }

    try {
        // 업로드 시작 요청
        let start = new Date();
        let res = await axios.post(`${Url}/actual-upload`, { fileName: fileName });
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
            let fileBlob = uploadCount < chunkCount ? firstFile.slice(start, end) : firstFile.slice(start);

            let getSignedUrlRes = await axios.post(`${Url}/upload-signed-url`, {
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

        const completeUpload = await axios.post(`${Url}/complete-upload`, {
            fileName: newFilename,
            parts: multiUploadArray,
            uploadId: uploadId,
            userImageName: userImageName
        });

        const firstImageUrl = completeUpload.data.url;  // 첫번째 사진 url
        sessionStorage.setItem('firstImageUrl',firstImageUrl);
        let end = new Date();
        console.log("파일 업로드 하는데 걸린 시간 : " + (end - start) + "ms")
        console.log(completeUpload.data, ' 업로드 완료 응답값');
    } catch (err) {
        console.log(err, err.stack);
    }

    try {
        const content = editor.getMarkdown();
        const firstImageUrl = sessionStorage.getItem('firstImageUrl')
        const title = document.getElementById('title').value;

        const response = await fetch(Url,{
            method: 'POST',
            body: JSON.stringify({content, firstImageUrl,title}),
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


const fileTarget = document.querySelector('.form__input--file_wrap input');
fileTarget.addEventListener('change', function () {
    const files = this.files;
    const fileArr = [];
    for (let i = 0; i < files.length; i++) {
        fileArr.push(files[i].name);
    }

    const fileList = fileArr.join(", "); 
    this.nextElementSibling.nextElementSibling.textContent = fileList;
});