import React, { Component, PropTypes, ScrollView } from 'react-native'

export default class StatelessForm extends Component {
  childrenWithProps() {
    const { focusableTypes } = this.props
    let nextInput = null
    let inputCount = 0
    return React.Children.map(this.props.children, (child) => child).reverse().map((child) => {
      if (focusableTypes.indexOf(child.type.name) > -1) {
        inputCount++
        const input = React.cloneElement(child, {
          ref: `input${inputCount}`,
          nextInput: nextInput,
          onNextInputFocus: this.handleNextInputFocus.bind(this),
          onKeyboardShow: this.handleKeyboardShow.bind(this),
          onKeyboardHide: this.handleKeyboardHide.bind(this),
        })
        nextInput = input
        return input
      } else {
        return child
      }
    }).reverse()
  }

  handleNextInputFocus(nextInput) {
    if (nextInput) {
      const input = this.refs[nextInput.ref]
      input.focus()
    } else {
      this.handleKeyboardHide()
    }
  }

  handleKeyboardHide() {
    this.refs.scrollView.scrollTo({y: 0})
  }

  handleKeyboardShow({ height, y, keyboardHeight }) {
    this.refs.scrollView.scrollTo({y: y})
  }

  render() {
    return (
      <ScrollView
        { ...this.props }
        ref='scrollView'
        style={[{
          flex: 1,
          alignSelf: 'stretch',
        }, this.props.style]}
      >
        {this.childrenWithProps()}
      </ScrollView>
    )
  }  
}

StatelessForm.propTypes = {
  focusableTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  style: PropTypes.object,
}

StatelessForm.defaultProps = {
  focusableTypes: ['InlineTextInput'],
  style: {},
}
