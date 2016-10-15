/**
 * Component to add attributes to a Hash or Array.
 * @param  {FreezerNode} root The parent to add the attribute.
 * @param  {string} attrkey Optional. If provided, the attribute added will have that key (arrays).
 *                           Otherwise an input will be shown to let the user define the key.
 */
import React from 'react'
import createAttribute from './createAttribute'

var AttributeCreator = React.createClass({
	getInitialState: function(){
		return {
			creating: false,
			attrkey: this.props.attrkey,
			type: 'string'
		}
	},

	render: function(){
		if( !this.state.creating )
			return <a href="#" onClick={this.handleCreate}>+ Add {this.props.type}</a>

		var attrName
		if( typeof this.props.attrkey !== 'undefined' )
			attrName =  <span className="attrName">{this.props.attrkey}:</span>
		else {
			attrName = [
				<input type="text" ref={(ref) => this.keyInput = ref} value={this.state.value} onChange={this.changeKey}/>,
				<span>:</span>
			]
		}

		return (<div className="hashAttribute">
				{ attrName }
				<select value={this.state.type} onChange={ this.changeType } ref="typeSelector">
					<option value="string">String</option>
					<option value="array">List</option>
					<option value="object">Map</option>
				</select>
				<button onClick={ this.createAttributeFunc }>OK</button>,
				<a href="#" className="cancelAttr" onClick={ this.handleCancel }>Cancel</a>
		</div>)
	},

	componentDidUpdate: function( prevProps, prevState){
		if( !prevState.creating && this.state.creating ){
			if( this.refs.keyInput !== null )
				this.keyInput.focus()
		}
	},

	componentWillReceiveProps: function( newProps ){
		this.setState({attrkey: newProps.attrkey})
	},

	handleCreate: function( e ){
		e.preventDefault()
		this.setState({creating: true})
	},

	handleCancel: function( e ){
		e.preventDefault()
		this.setState({creating: false})
	},

	changeType: function( e ){
		this.setState({type: e.target.value})
	},

	changeKey: function( e ){
		this.setState({attrkey: e.target.value})
	},

	createAttributeFunc: function(){

		this.setState({creating: false})

		var parent = this.props.parent
		var value = createAttribute.typeDefaultValues[ this.state.type ]

		if( parent.constructor === Array )
			parent.push( value )
		else
			parent.set(this.state.attrkey, value )
	}
})

export default AttributeCreator