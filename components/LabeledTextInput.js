import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

export default class LabeledTextInput extends Component {
  componentDidMount() {
    this.scrollTo = 0
  }

  handleLayout(event) {
    this.scrollTo = event.nativeEvent.layout.y
  }

  handleFocus() {
    const { onFocus } = this.props
    onFocus && onFocus(this.scrollTo)
  }

  focus() {
    this.refs.input.focus()
  }

  blur() {
    this.refs.input.blur()
  }

  shouldDisplayMessage() {
    const { value, valid, message } = this.props
    return (value && value.length > 0 && !valid && message)
  }

  handleSubmitEditing() {
    const { nextInput, onNextInputFocus } = this.props
    onNextInputFocus && onNextInputFocus(nextInput, this)
  }

  renderIcon() {
    const { icon, validIcon, invalidIcon, valid, value, iconStyle } = this.props
    if (!icon)
      return
    let renderedIcon = null
    if (value && value.length > 0) {
      renderedIcon = (valid ? (validIcon ? validIcon : icon) : (invalidIcon ? invalidIcon : icon))
    } else {
      renderedIcon = icon
    }
    return (
      <View
        style={iconStyle}
      >
        {renderedIcon}
      </View>
    )
  }

  renderMessage() {
    const { message, messageStyle } = this.props
    const style = StyleSheet.flatten(this.props.style)
    if (this.shouldDisplayMessage()) {
      return(
        <View style={{
          backgroundColor: (style && style.backgroundColor ? style.backgroundColor : 'white')
        }}>
          <Text style={[{
            color: 'red',
            margin: 10,
            fontSize: 12,
          }, messageStyle]}>
            { message }
          </Text>
        </View>
      )
    }
  }

  render() {
    const { label, value, labelStyle, inputStyle, nextInput, onBlur, multiline } = this.props
    const style = StyleSheet.flatten(this.props.style)
    return (
      <View
        onLayout={this.handleLayout.bind(this)}
        style={[{
          backgroundColor: (style && style.backgroundColor ? style.backgroundColor : 'white'),
          borderTopWidth: StyleSheet.hairlineWidth,
          borderBottomWidth: (nextInput ? 0 : StyleSheet.hairlineWidth),
          borderColor: 'lightgray',
          paddingTop: 10,
          paddingBottom: (this.shouldDisplayMessage() ? 0 : 10),
          paddingHorizontal: 10,
        }, style]}
      >
        <Text
          style={[{
            fontSize: 12,
            fontWeight: 'bold',
            marginBottom: 4,
          }, labelStyle]}
        >
          {label}
        </Text>
        <View style={[{ flex: 1, flexDirection: 'row', alignItems: 'center'}]}>
          { this.renderIcon() }
          <TextInput
            clearButtonMode='while-editing'
            underlineColorAndroid='transparent'
            returnKeyType={ multiline ? 'default' : (nextInput ? 'next' : 'done') }
            onSubmitEditing={this.handleSubmitEditing.bind(this)}
            { ...this.props }
            onFocus={this.handleFocus.bind(this)}
            onBlur={onBlur}
            ref='input'
            value={value}
            style={[{
              flex: 1,
              height: 24,
              paddingHorizontal: 10,
              fontSize: 12,
              lineHeight: 24,
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: 'lightgray',
              backgroundColor: 'white',
            }, inputStyle]}
            />
        </View>
        { this.renderMessage() }
      </View>
    )
  }
}

const stylePropType = PropTypes.oneOfType([
  PropTypes.object,
  PropTypes.arrayOf(PropTypes.object),
])

LabeledTextInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  valid: PropTypes.bool,
  message: PropTypes.string,
  style: stylePropType,
  iconStyle: stylePropType,
  labelStyle: stylePropType,
  inputStyle: stylePropType,
  messageStyle: stylePropType,
  icon: PropTypes.element,
  validIcon: PropTypes.element,
  invalidIcon: PropTypes.element,
}

LabeledTextInput.defaultProps = {
  label: 'Use label prop',
  value: null,
  valid: false,
  message: null,
  style: {},
  iconStyle: {},
  labelStyle: {},
  inputStyle: {},
  messageStyle: {},
  icon: null,
  validIcon: null,
  invalidIcon: null,
}
