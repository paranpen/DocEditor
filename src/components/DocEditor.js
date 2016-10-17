import React, {Component} from 'react'
import ObjectAttribute from './ObjectAttribute'

/* Container Component
 * state: the root of document
 * TEST if it re-renders the whole document
 
class DocEditor extends Component {
  constructor(props) {
    super(props)
    this.state = this.props.store.get()
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
      console.log(this.state)
      console.log(updated.toJS())
      // me.forceUpdate()
			me.setState({ state: updated })
		})
	}
}
*/

/**
 * The main component. It will refresh the props when the store changes.
 *
 * @param  {FreezerNode} store  Freezer node that contains a json property with the data
 * @param  {FreezerNode} original Freezer node to compare with the current data
 */
var DocEditor = React.createClass({
	getInitialState: function(){
		return {
			storeHistory: [ this.props.store.get() ],
			currentStore: 0
		};
	},
	render: function(){
		var store = this.props.store.get(),
			disabledUndo = !this.state.currentStore,
			disabledRedo = this.state.currentStore == this.state.storeHistory.length - 1
		;

		return (
			<div className="docEditor">
				<div className="storeHistory">
					<button disabled={ disabledUndo } onClick={ this.undo }>Undo</button>
					<button disabled={ disabledRedo } onClick={ this.redo }>Redo</button>
				</div>
				<pre>{ JSON.stringify( store.jsondoc, null, '  ')}</pre>
				<ObjectAttribute value={ store.jsondoc } original={ this.props.original.jsondoc }/>
			</div>
		);
	},

	componentDidMount: function(){
		var me = this;

		// We are going to update the props every time the store changes
		this.props.store.on('update', function( updated ){

			var storeHistory, nextIndex;
			// Check if this state has not been set by the history
			if( updated != me.state.storeHistory[ me.state.currentStore ] ){

				nextIndex = me.state.currentStore + 1;
				storeHistory = me.state.storeHistory.slice( 0, nextIndex );
				storeHistory.push( updated );
				me.setState({
					storeHistory: storeHistory,
					currentStore: nextIndex
				});
			}
			else {
				// The change has been already triggered by the state
			}
		});
	},
	undo: function(){
		var nextIndex = this.state.currentStore - 1;
		this.props.store.set( this.state.storeHistory[ nextIndex ] );
		this.setState({ currentStore: nextIndex });
	},
	redo: function(){
		var nextIndex = this.state.currentStore + 1;
		this.props.store.set( this.state.storeHistory[ nextIndex ] );
		this.setState({ currentStore: nextIndex });
	}
});

export default DocEditor