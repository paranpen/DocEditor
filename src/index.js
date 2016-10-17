/*
 * Creating data-driven React applications using Freezer
 * http://arqex.com/991/json-editor-react-immutable-data
 * https://medium.com/@arqex/react-the-simple-way-cabdf1f42f12
 * A JSON editor with React and Freezer Immutable data 
 */

import React from 'react'
import ReactDOM from 'react-dom'
import DocEditor from './components/DocEditor'

ReactDOM.render(
  <div>
    <div className="App">
      <div className="App-header">
        <h2>JSON Document Editor & State Manager v0.1</h2>
        <h3>(Each element of Document is scoped to its own Component)</h3>
      </div>
      <p className="App-intro">
        You can add, delete <code>Attribute</code> and edit its <code>Value</code>.
      </p>
    </div>
    <DocEditor/>
  </div>
  , document.getElementById('root')
)