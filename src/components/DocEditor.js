import React, {Component} from 'react'
import ObjectAttribute from './ObjectAttribute'
import jsondoc from '../docState/jsondoc'

class DocEditor extends Component {
  constructor() {
    super()
    this.jsondoc = jsondoc
    this.updateDocument = this.updateDocument.bind(this)
  }

  updateDocument(newDocument) {
    console.log(newDocument)
    this.setState({
      jsondoc: newDocument
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.id !== this.props.id;
  }

  /* http://arqex.com/991/json-editor-react-immutable-data */
  /* A JSON editor with React and Immutable data */
  render() {
    return (
      <div>
        <div className="App">
          <div className="App-header">
            <h2>JSON Document Editor & State Manager v0.1</h2>
            <h3>(Each segment of Document is scoped within its own Component)</h3>
          </div>
          <p className="App-intro">
            You can add, delete <code>Attribute</code> and edit its <code>Value</code>.
          </p>
        </div>
        <div className="jsonEditor">
          <pre> Copy a document here</pre>
          <pre>{ JSON.stringify( this.jsondoc, null, '  ')}</pre>
          <ObjectAttribute value={this.jsondoc} original={this.jsondoc} 
            onChange={this.updateDocument}/>
        </div>
      </div>
    )
  }
}

export default DocEditor