const Editor = toastui.Editor;

const editor = new toastui.Editor({
    el: document.querySelector('#editor'),
    previewStyle: 'vertical',
    height: '500px',
    initialValue: '안녕? 이건 내가 만든 텍스트 에디터야'
});

editor.getMarkdown();