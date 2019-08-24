/* 
 * Simple editor component that takes placeholder text as a prop 
 */
import ReactQuill, {Quill} from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css';

function xx() {
  console.log("Clicked Insert Template");
  // this.props.insertContent();
  const cursorPosition = this.quill.getSelection().index;
  this.quill.insertText(cursorPosition, "♥");
  this.quill.setSelection(cursorPosition + 3);
}
class Editor extends React.Component {
    static modules= {
      toolbar: {
        container: [
          [{ 'header': [1, 2, 3, 4, 5, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['blockquote', 'code-block'],
          ['clean']
        ]
      }
    }
    static formats = [
      'header', 'font', 'size',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'code-block', 'link', 'image', 
    ]
    constructor (props) {
      super(props)
      this.state = {
        editorHtml: '', 
        theme: 'snow'
      }
      this.handleChange = this.handleChange.bind(this)
    }
    handleChange (html) {
        this.setState({ editorHtml: html });
        this.props.onContentChange(html);
    }
    componentDidMount() {
      this.setState({
        editorHtml: this.props.value?this.props.value:"",
      });
    }
    componentWillReceiveProps(nextProps) {
      if (this.props.value != nextProps.value) {
        this.setState({editorHtml: nextProps.value?nextProps.value:""});
      }
    }
    render () {
      return (
        <div className={this.props.className}>
          <ReactQuill 
            onChange={this.handleChange}
            placeholder={this.props.placeholder}
            modules={Editor.modules}
            formats={Editor.formats}
            value={this.state.editorHtml}
            bounds={'.app'}
           >
           </ReactQuill>
        </div>
       )
    }
  }

  export default Editor; 