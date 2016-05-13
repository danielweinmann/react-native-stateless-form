import React from 'react';
import { Platform, Component, PropTypes, ScrollView, View } from 'react-native'

export default class StatelessForm extends Component {
  componentDidMount() {
    this.willFocusInput = false
  }

  childrenWithProps() {
    let nextInput = null
    let inputCount = 0
    return React.Children.map(this.props.children, (child) => child).reverse().map((child) => {
      if (child.type.propTypes && child.type.propTypes.value && child.type.propTypes.valid) {
        inputCount++

        const input = React.cloneElement(child, {
          ref: `input${inputCount}`,
          nextInput: nextInput,
          onNextInputFocus: this.handleNextInputFocus.bind(this),
          onFocus: this.handleFocus.bind(this),
          onBlur: this.handleBlur.bind(this),
        })
        nextInput = input
        return input
      } else {
        return child
      }
    }).reverse()
  }

  handleNextInputFocus(nextInput, currentInput) {
    if (nextInput) {
      const input = this.refs[nextInput.ref]
      this.willFocusInput = true
      input.focus()
    } else {
      currentInput.blur()
    }
  }

  handleBlur() {
    if (!this.willFocusInput) {
      this.refs.scrollView.scrollTo({y: 0})
    }
    this.willFocusInput = false
  }

  handleFocus(scrollTo) {
    this.willFocusInput = false
    this.refs.scrollView.scrollTo({y: scrollTo})
  }

  render() {
    return (
      <ScrollView
        keyboardShouldPersistTaps={false}
        { ...this.props }
        ref='scrollView'
        style={[{
          flex: 1,
          alignSelf: 'stretch',
        }, this.props.style]}
      >
        {this.childrenWithProps()}
        { Platform.OS == 'android' && <View style={{ height: 500 }}/> }
      </ScrollView>
    )
  }  
}

StatelessForm.propTypes = {
  style: PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.arrayOf(React.PropTypes.object),
  ]),
}

StatelessForm.defaultProps = {
  style: {},
}
