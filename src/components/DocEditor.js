import React, {Component} from 'react'
import ObjectAttribute from './ObjectAttribute'
import jsondoc from '../docStates/jsondoc'

var freezer = new Freezer({jsondoc: jsondoc});

class DocEditor extends Component {
  constructor() {
    super()
    this.jsondoc = freezer.get()
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

  render() {
    return (
      <div className="jsonEditor">
        <pre> Copy a document here</pre>
        <pre>{ JSON.stringify( this.jsondoc, null, ' ')}</pre>
        <ObjectAttribute value={this.jsondoc} original={this.jsondoc} 
          onChange={this.updateDocument}/>
      </div>
    )
  }
}

export default DocEditor