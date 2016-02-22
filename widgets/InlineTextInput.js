import React, { Component, PropTypes, View, Text, TextInput } from 'react-native'

export default class InlineTextInput extends Component {
  focus() {
    this.refs.input.focus()
  }

  handleSubmitEditing() {
    const { nextInput } = this.props
    this.props.onNextInputFocus && this.props.onNextInputFocus(nextInput)
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
          marginHorizontal: 4,
        }, iconStyle]}
      >
        {renderedIcon}
      </View>
    )
  }

  render() {
    const { title, value, valid, message, style, titleStyle, inputStyle, messageStyle, nextInput } = this.props
    return (
      <View style={[{
        backgroundColor: 'white',
        borderTopWidth: 0.5,
        borderBottomWidth: (nextInput ? 0 : 0.5),
        borderColor: 'lightgray',
      }, style]}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: 6,
          paddingBottom: ((!valid && message) ? 0 : 6)
        }}>
          { this.renderIcon() }
          <Text
            style={[{
              fontWeight: 'bold',
              width: 98,
            }, titleStyle]}
          >
            {title}
          </Text>
          <TextInput
            clearButtonMode='while-editing'
            returnKeyType={ nextInput ? 'next' : 'done' }
            onSubmitEditing={this.handleSubmitEditing.bind(this)}
            { ...this.props }
            ref='input'
            value={value}
            style={[{
              flex: 1,
              height: 24,
              fontSize: 14,
            }, inputStyle]}
          />
        </View>
        { !valid && message && <Text style={[{
            color: 'red',
            marginLeft: 8,
            marginBottom: 6,
            fontSize: 10,
          }, messageStyle]}>
            { message }
          </Text>
        }
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
}

InlineTextInput.defaultProps = {
  title: 'Use title prop',
  value: 'Use value prop',
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
}
