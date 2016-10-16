import React, {Component} from 'react'
import Freezer from 'freezer-js'
import ObjectAttribute from './ObjectAttribute'
import jsondoc from '../docStates/jsondoc'

var freezer = new Freezer({jsondoc: jsondoc})

class DocEditor extends Component {
  constructor() {
    super()
    this.state = freezer.get()
  }

  render() {
    return (
      <div className="jsonEditor">
        <pre> Copy a document here</pre>
        <pre>{ JSON.stringify( this.state, null, ' ')}</pre>
        <ObjectAttribute value={this.state} original={this.state} />
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