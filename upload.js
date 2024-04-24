function uploadFiles() {
    const files = document.getElementById('fileInput').files;
    const formData = new FormData();
    formData.append('files', files); // 'files[]' 대신 'files'를 사용하여 스프링 부트에서 인식하도록

    fetch('http://localhost:8080/upload', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch((error) => {
        console.error('Error:', error);
    });
}
