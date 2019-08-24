
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css';
import './style.css';
/*
 * Custom toolbar component including showRaw button
 */
const CustomToolbar = ({onClickRaw}) => (
    <div id="toolbar">
      <select className="ql-header">
        <option value="1"></option>
        <option value="2"></option>
        <option value="3"></option>
        <option selected></option>
      </select>
      <button className="ql-bold"></button>
      <button className="ql-italic"></button>
      <button className="ql-underline"></button>
      <button className="ql-strike"></button>
      <button className="ql-list" value="ordered"></button>
      <button className="ql-list" value="bullet"></button>
      <button className="ql-link"></button>
      <button className="ql-image"></button>
      <button className="sm-code" onClick={onClickRaw}>(/)</button>
    </div>
  )

class Editor extends React.Component {
    constructor (props) {
      super(props)
      this.state = { editorHtml: '', rawHtml: ''}
      this.handleChange = this.handleChange.bind(this)
      this.handleChangeRaw = this.handleChangeRaw.bind(this)
      this.handleClickShowRaw = this.handleClickShowRaw.bind(this)
    }
    
    handleChange (html) {
        this.setState({ editorHtml: html });
        this.props.onContentChange(html);
    }
    handleChangeRaw (html) {
        this.setState({ rawHtml: html });
        this.props.onContentChange(html);
    }
    handleClickShowRaw () {
        const isEditingRaw = this.state.showRaw;
        this.setState({showRaw: !isEditingRaw})
        this.syncViews(isEditingRaw)
    }
    syncViews (fromRaw) {
        if (fromRaw) this.setState({editorHtml: this.state.rawHtml})
        else this.setState({rawHtml: this.state.editorHtml})
    }
    componentDidMount() {
      this.setState({editorHtml: this.props.value?this.props.value:""});
    }
    componentWillReceiveProps(nextProps) {
      if (this.props.value != nextProps.value) {
        this.setState({editorHtml: nextProps.value?nextProps.value:""});
      }
    }
    render () {
      return (
        // <div className={this.props.className}>
        //     <h1>This is Testing Edit</h1>
            <div className={ this.state.showRaw ? "showRaw" : ""}>
                <div className={"text-editor"}>
                    <CustomToolbar onClickRaw={this.handleClickShowRaw} />
                    <ReactQuill 
                        onChange={this.handleChange} 
                        placeholder={this.props.placeholder}
                        modules={Editor.modules}
                        formats={Editor.formats}
                        value={this.state.editorHtml}
                        theme={"snow"} // pass false to use minimal theme
                        className="ql-editor"
                    >
                        <div 
                            key="editor"                     
                            ref="editor"
                            className="quill-contents"                     
                        />
                    </ReactQuill>
                    <textarea
                        className={"raw-editor"}
                        onChange={(e) => this.handleChangeRaw(e.target.value)}
                        value={this.state.rawHtml}
                    />
                </div>
            </div>
        // </div>
       )
    }
  }
  /* 
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
Editor.modules = {
    toolbar: {
      container: "#toolbar",
      handlers: {
      }
    }
  }
  
  /* 
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  Editor.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'color',
  ]
  export default Editor; 