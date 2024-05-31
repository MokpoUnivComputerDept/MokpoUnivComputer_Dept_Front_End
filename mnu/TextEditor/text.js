const Editor = toastui.Editor;

const editor = new toastui.Editor({
    el: document.querySelector('#editor'),
    previewStyle: 'vertical',
    height: '500px',
});

document.querySelector('#contents').insertAdjacentHTML('afterbegin', editor.getHtml());
console.log(editor.getHtml());

editor.getMarkdown();



// =======================================================

// const Editor = toastui.Editor;

// const editor = new toastui.Editor({
//     el: document.querySelector('#editor'),
//     previewStyle: 'vertical',
//     height: '500px',
// });

// editor.getMarkdown();
