import React, {Component} from 'react'
import ObjectAttribute from './ObjectAttribute'
import jsondoc from '../states/jsondoc'
import update from 'react-addons-update'

class DocEditor extends Component {
  constructor() {
    super()
    this.store = jsondoc
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>JSON Document Editor v0.1</h2>
        </div>
        <p className="App-intro">
          You can add, delete <code>Attribute</code> and edit its value.
        </p>
        <div className="jsonEditor">    
          <pre>{ JSON.stringify( this.store, null, '  ')}</pre>
          <ObjectAttribute value={this.store} original={this.store}/>
        </div>
      </div>
    )
  }
}

export default DocEditor