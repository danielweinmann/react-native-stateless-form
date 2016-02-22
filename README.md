# react-native-stateless-form

## Inspiration

This package is inspired by [FaridSafi/react-native-gifted-form](https://github.com/FaridSafi/react-native-gifted-form), and my intention is to merge with it in the future.

The reason for creating a new package is that I want the form components to be presentational only, and not to store state at all. This way we can easily integrate with [Redux Form](erikras.github.io/redux-form/), any other form management tool, or even implement our own form management.

## Installation

```npm install react-native-stateless-form --save```

## Example

```js
import React, { Component } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { StatelessForm, InlineTextInput } from 'react-native-stateless-form'

export default class Form extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      name: null,
      email: null,
      password: null,
    }
  }

  render() {
    const { name, email, password } = this.state
    const nameValid = (name && name.length > 0 ? true : false)
    const emailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
    const passwordValid = (password && password.length >= 8 ? true : false)
    return (
      <StatelessForm style={{
        flex: 1,
        marginTop: 20,
        backgroundColor: 'lightgray',
      }}>
        <InlineTextInput
          title='Name'
          placeholder='Tell us your name'
          style={{ borderColor: 'gray' }}
          titleStyle={{ color: 'dimgray' }}
          inputStyle={{ color: 'slategray' }}
          messageStyle={{ color: 'red' }}
          icon={ <Icon name={'account-circle'} size={18} color={'steelblue'} /> }
          validIcon={ <Icon name='check' size={18} color='green' /> }
          invalidIcon={ <Icon name='clear' size={18} color='red' /> }
          value={name}
          valid={nameValid}
          message={name && !nameValid ? 'Please fill your name' : null}
          onChangeText={(text) => { this.setState({name: text}) }}
        />
        <InlineTextInput
          title='Email'
          placeholder='type@your.email'
          autoCorrect={false}
          autoCapitalize='none'
          keyboardType='email-address'
          style={{ borderColor: 'gray' }}
          titleStyle={{ color: 'dimgray' }}
          inputStyle={{ color: 'slategray' }}
          messageStyle={{ color: 'red' }}
          icon={ <Icon name={'mail-outline'} size={18} color={'steelblue'} /> }
          validIcon={ <Icon name='check' size={18} color='green' /> }
          invalidIcon={ <Icon name='clear' size={18} color='red' /> }
          value={email}
          valid={emailValid}
          message={email && !emailValid ? 'Please enter a valid email address' : null}
          onChangeText={(text) => { this.setState({email: text}) }}
        />
        <InlineTextInput
          title='Password'
          placeholder='Create a password'
          autoCorrect={false}
          autoCapitalize='none'
          secureTextEntry={true}
          style={{ borderColor: 'gray' }}
          titleStyle={{ color: 'dimgray' }}
          inputStyle={{ color: 'slategray' }}
          messageStyle={{ color: 'red' }}
          icon={ <Icon name={'vpn-key'} size={18} color={'steelblue'} /> }
          validIcon={ <Icon name='check' size={18} color='green' /> }
          invalidIcon={ <Icon name='clear' size={18} color='red' /> }
          value={password}
          valid={passwordValid}
          message={password && !passwordValid ? 'Password too short' : null}
          onChangeText={(text) => { this.setState({password: text}) }}
        />
      </StatelessForm>
    )
  }
}

import { AppRegistry } from 'react-native'
AppRegistry.registerComponent('Form', () => Form)
```

## StatelessForm

A wrapper that will manage auto-focusing and auto-scrolling for its children widgets

| Property | Type | Default | Description |
|---------------|----------|--------------|----------------------------------------------------------------|
| focusableTypes | Array of string | ['InlineTextInput'] | A list of focusable widget types |
| style | object | {} | Style for the form wrapper |

\+ Any other [ScrollView](https://facebook.github.io/react-native/docs/scrollview.html#content) prop you wish to pass.

## Widgets

### TextInput

| Property | Type | Default | Description |
|---------------|----------|--------------|----------------------------------------------------------------|
| title | string | 'Use title prop' | Title for the text input |
| value | string | 'Use value prop' | Value for the text input |
| valid | boolean | false | Whether the value is valid or not |
| message | string | null | Validation message to be shown |
| style | object | {} | Style changes to the main ScrollView |
| iconStyle | object | {} | Style changes to the icon View |
| titleStyle | object | {} | Style changes to the title Text |
| inputStyle | object | {} | Style changes to the TextInput |
| messageStyle | object | {} | Style changes to the validation message Text |
| icon | element | null | Any react component to be used as icon |
| validIcon | element | null | Any react component to be used as icon when valid. Requires `icon` prop |
| invalidIcon | element | null | Any react component to be used as icon when invalid. Requires `icon` prop |
| nextInput | element | automatic | Any react component that responds to focus() to be focused when finished editing. Automatically passed by StatelessForm. |
| onNextInputFocus | function | automatic | Function to focus on nextInput. Automatically passed by StatelessForm. |
| onKeyboardShow | function | automatic | Function to scroll to top of input on keyboard show. Automatically passed by StatelessForm. |

\+ Any other [TextInput](https://facebook.github.io/react-native/docs/textinput.html#content) prop you wish to pass.

### Other widgets

My intention is to implement most of [FaridSafi/react-native-gifted-form](https://github.com/FaridSafi/react-native-gifted-form)'s widgets. But I'll do each one only when I need it in a real project, so it might take some time.

PR's are very much welcome!

## Creating new widgets

Any react component can be rendered inside Stateless Form as a widget. But there is a special case below:

### Focusable input widgets

If you want your widget to receive focus when previous widget finished editing, you must implement the following pattern:

- Your widget must have a component created with ES6 `class` statement.
- Your widget should implement the `focus()` method.
- You must pass the component's class name to your form's `focusableTypes` prop.

### Scrollable input widgets

If you want your widget to receive scroll when showing keyboard, you must implement the following pattern:

- Your widget should implement keyboard show management and call `this.props.onKeyboardShow({ height, y, keyboardHeight })` method on keyboard show. `height` must be your widget's height, `y` must be your widget y position and `keyboardHeight` must be the currently open keyboard height.
- Check [InlineTextInput](https://github.com/danielweinmann/react-native-stateless-form/blob/master/widgets/InlineTextInput.js) for references on how to implement it.

## Contributing

Please create issues and send pull requests!

## License

[MIT](LICENSE)
