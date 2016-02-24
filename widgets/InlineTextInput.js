import React, { Component, PropTypes, DeviceEventEmitter, View, Text, TextInput } from 'react-native'

export default class InlineTextInput extends Component {
  componentDidMount() {
    this.layout = { x: 0, y: 0, width: 0, height: 0 }
    this.willShowKeyboard = false
    this.isShowingKeyboard = false
    DeviceEventEmitter.addListener('keyboardDidShow', this.handleKeyboardShow.bind(this))
    DeviceEventEmitter.addListener('keyboardDidHide', this.handleKeyboardHide.bind(this))
  }

  handleLayout(event) {
    this.layout = event.nativeEvent.layout
  }

  handleFocus(event) {
    const { onFocus } = this.props
    this.willShowKeyboard = true
    onFocus && onFocus()
  }

  handleKeyboardShow(frames) {
    const keyboardHeight = frames.endCoordinates.height
    const { height, y } = this.layout
    if (this.willShowKeyboard) {
      const { onKeyboardShow } = this.props
      onKeyboardShow && onKeyboardShow({ height, y, keyboardHeight })
      this.isShowingKeyboard = true
      this.willShowKeyboard = false
    }
  }

  handleKeyboardHide() {
    if (this.isShowingKeyboard) {
      const { onKeyboardHide } = this.props
      onKeyboardHide && onKeyboardHide()
      this.isShowingKeyboard = false
    }
  }

  focus() {
    this.refs.input.focus()
  }

  shouldDisplayMessage() {
    const { value, valid, message } = this.props
    return (value && value.length > 0 && !valid && message)
  }

  handleSubmitEditing() {
    const { nextInput, onNextInputFocus } = this.props
    onNextInputFocus && onNextInputFocus(nextInput)
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
    const { value, valid, message, messageStyle } = this.props
    if (this.shouldDisplayMessage()) {
      return(
        <Text style={[{
          color: 'red',
          marginLeft: 10,
          marginBottom: 10,
          fontSize: 12,
        }, messageStyle]}>
          { message }
        </Text>
      )
    }
  }

  render() {
    const { title, value, valid, message, style, titleStyle, inputStyle, messageStyle, nextInput } = this.props
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
          paddingBottom: (this.shouldDisplayMessage() ? 0 : 6)
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
            returnKeyType={ nextInput ? 'next' : 'done' }
            onSubmitEditing={this.handleSubmitEditing.bind(this)}
            { ...this.props }
            onFocus={this.handleFocus.bind(this)}
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

InlineTextInput.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  valid: PropTypes.bool,
  message: PropTypes.string,
  style: PropTypes.object,
  iconStyle: PropTypes.object,
  titleStyle: PropTypes.object,
  inputStyle: PropTypes.object,
  messageStyle: PropTypes.object,
  icon: PropTypes.element,
  validIcon: PropTypes.element,
  invalidIcon: PropTypes.element,
  nextInput: PropTypes.element,
  onNextInputFocus: PropTypes.func,
  onKeyboardShow: PropTypes.func,
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
  nextInput: null,
  onNextInputFocus: null,      
  onKeyboardShow: null,      
}
