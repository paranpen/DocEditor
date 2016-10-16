/**
 * Component for editing a string.
 * @param  {string} value The value of the string.
 * @param  {Mixed} original The value of the component it the original json.
 * @param {FreezerNode} parent The parent node to let the string component update its value.
 */
import React, { Component } from 'react'

// var StringAttribute = React.createClass({
class StringAttribute extends Component {
	constructor() {
		super()
		this.state = {
			editing: false,
			value: '',
			modified: false
		}
		this.setEditMode   = this.setEditMode.bind(this)
		this.updateValue   = this.updateValue.bind(this)
		this.setValue      = this.setValue.bind(this)
		this.handleKeyDown = this.handleKeyDown.bind(this)
	}

	updateValue(e) {
		this.setState({value: e.target.value, modified: e.target.value != this.props.value });
	}

  handleChange(e) {
  	let value = e.target.value
  	this.props.onChange(value)
	}

	render() {
		var className = 'stringAttr'
		if( this.state.modified )
			className = 'modified'

		if( !this.state.editing )
			return <span onClick={ this.setEditMode } className={ className }>{ this.props.value }</span>

		return <input value={ this.props.value } onChange={ this.updateValue } onBlur={ this.setValue } ref="input" onKeyDown={this.handleKeyDown} />
	}

	componentDidUpdate( prevProps, prevState ) {
		if( this.state.editing && ! prevState.editing ){
			var node = this.refs.input.getDOMNode()
			node.focus()
			node.value = node.value
		}
	}

	componentDidMount() {
		if( this.state.editing ){
			var node = this.refs.input.getDOMNode()
			node.focus()
			node.value = node.value
		}
	}

	setEditMode() {
		this.setState({editing: true})
	}

	setValue() {
		if( this.state.modified )
			this.props.parent.set( this.props.attrkey, this.state.value );

		this.setState({editing: false})
	}


	handleKeyDown(e) {
		if( e.which == 13 )
			this.setValue()
	}

	toggleEditing() {
		this.setState({ editing: !this.state.editing })
	}
}

export default StringAttribute