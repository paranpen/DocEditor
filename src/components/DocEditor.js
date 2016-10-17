import React, {Component} from 'react'
import ObjectAttribute from './ObjectAttribute'
import jsonDocument from '../docModels/jsonDocument'
import Freezer from 'freezer-js'

/* get the JSON document and make it immutable by Freezer */
var freezer = new Freezer({jsondoc: jsonDocument})

/* Container Component
 * state: the root of document
 * TEST if it re-renders the whole document
 */
class DocEditor extends Component {
  constructor() {
    super()
    this.state = freezer.get()
  }

  render() {
    return (
      <div className="jsonEditor">
        <pre> Copy a document here</pre>
        <pre>{ JSON.stringify( this.state.jsondoc, null, ' ')}</pre>
        <ObjectAttribute value={this.state.jsondoc} original={this.state.jsondoc} />
      </div>
    )
  }

  componentDidMount(){
		var me = this

    // Let's create a listener to update the store on change
		var listener = this.state.getListener()

		// We are going to update the props every time the store changes
		listener.on('update', function( updated ){
			me.setState({ state: updated })
		})
	}
}

export default DocEditor