import React, { Component, PropTypes } from 'react'
import { View, Text, TextInput } from 'react-native'

export default class InlineTextInput extends Component {
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
        style={[{
          marginLeft: 6,
        }, iconStyle]}
      >
        {renderedIcon}
      </View>
    )
  }

  renderMessage() {
    const { message, messageStyle, style } = this.props
    if (this.shouldDisplayMessage()) {
      return(
        <View style={{
          backgroundColor: (style && style.backgroundColor ? style.backgroundColor : 'white')
        }}>
          <Text style={[{
            color: 'red',
            marginLeft: 10,
            marginBottom: 10,
            fontSize: 12,
          }, messageStyle]}>
            { message }
          </Text>
        </View>
      )
    }
  }

  render() {
    const { title, value, style, titleStyle, inputStyle, nextInput, onBlur, multiline } = this.props
    return (
      <View
        onLayout={this.handleLayout.bind(this)}
        style={[{
          backgroundColor: 'white',
          borderTopWidth: 0.5,
          borderBottomWidth: (nextInput ? 0 : 0.5),
          borderColor: 'lightgray',
        }, style]}
      >
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: 6,
          paddingBottom: (this.shouldDisplayMessage() ? 0 : 6),
          backgroundColor: (style && style.backgroundColor ? style.backgroundColor : 'white'),
        }}>
          { this.renderIcon() }
          <Text
            style={[{
              flex: 0.5,
              fontSize: 14,
              fontWeight: 'bold',
              marginLeft: 6,
            }, titleStyle]}
          >
            {title}
          </Text>
          <TextInput
            clearButtonMode='while-editing'
            returnKeyType={ multiline ? 'default' : (nextInput ? 'next' : 'done') }
            onSubmitEditing={this.handleSubmitEditing.bind(this)}
            { ...this.props }
            onFocus={this.handleFocus.bind(this)}
            onBlur={onBlur}
            ref='input'
            value={value}
            style={[{
              flex: 1,
              height: 36,
              fontSize: 14,
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
  React.PropTypes.object,
  React.PropTypes.arrayOf(React.PropTypes.object),
])

InlineTextInput.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  valid: PropTypes.bool,
  message: PropTypes.string,
  style: stylePropType,
  iconStyle: stylePropType,
  titleStyle: stylePropType,
  inputStyle: stylePropType,
  messageStyle: stylePropType,
  icon: PropTypes.element,
  validIcon: PropTypes.element,
  invalidIcon: PropTypes.element,
}

InlineTextInput.defaultProps = {
  title: 'Use title prop',
  value: null,
  valid: false,
  message: null,
  style: {},
  iconStyle: {},
  titleStyle: {},
  inputStyle: {},
  messageStyle: {},
  icon: null,
  validIcon: null,
  invalidIcon: null,
}
