const { Editor } = toastui;
const { chart, codeSyntaxHighlight, colorSyntax, tableMergedCell, uml } = Editor.plugin;

const chartOptions = {
  minWidth: 100,
  maxWidth: 600,
  minHeight: 100,
  maxHeight: 300
};

const editor = new Editor({
  el: document.querySelector('#editor'),
  previewStyle: 'vertical',
  height: '500px',
  initialValue: allPluginsContent,
  plugins: [[chart, chartOptions], [codeSyntaxHighlight, { highlighter: Prism }], colorSyntax, tableMergedCell, uml]
});

const viewer = Editor.factory({
  el: document.querySelector('#viewer'),
  viewer: true,
  height: '500px',
  initialValue: allPluginsContent,
  plugins: [[chart, chartOptions], [codeSyntaxHighlight, { highlighter: Prism }], tableMergedCell, uml]
});