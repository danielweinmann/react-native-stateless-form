import React, { Component, PropTypes, View } from 'react-native'

export default class StatelessForm extends Component {
  childrenWithProps() {
    const { focusableTypes } = this.props
    let nextInput = null
    let inputCount = 0
    return React.Children.map(this.props.children, (child) => child).reverse().map((child) => {
      // Checks for input ref to know it's an input widget
      if (focusableTypes.indexOf(child.type.name) > -1) {
        console.log('childrenWithProps', child)
        inputCount++
        const input = React.cloneElement(child, {
          ref: `input${inputCount}`,
          nextInput: nextInput,
          onNextInputFocus: this.handleNextInputFocus.bind(this),
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
    }
  }

  render() {
    return (
      <View style={[{
        flex: 1,
        alignSelf: 'stretch',
      }, this.props.style]}>
        {this.childrenWithProps()}
      </View>
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
