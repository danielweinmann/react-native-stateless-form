# react-native-stateless-form

## Inspiration

This package is inspired by [FaridSafi/react-native-gifted-form](https://github.com/FaridSafi/react-native-gifted-form), and my intention is to merge with it in the future.

The reason for creating a new package is that I want the form components to be presentational only, and not to store state at all. This way we can easily integrate with [Redux Form](erikras.github.io/redux-form/), any other form management tool, or even implement our own form management.

## StatelessForm

A wrapper that will manage auto-focusing and auto-scrolling for its children widgets

| Property | Type | Default | Description |
|---------------|----------|--------------|----------------------------------------------------------------|
| focusableTypes | Array of string | ['InlineTextInput'] | A list of focusable widget types |
| style | object | {} | Style for the form wrapper |

## Widgets

### TextInput

| Property | Type | Default | Description |
|---------------|----------|--------------|----------------------------------------------------------------|
| title | string | 'Use title prop' | Title for the text input |
| value | string | 'Use value prop' | Value for the text input |
| valid | boolean | false | Whether the value is valid or not |
| message | string | null | Validation message to be shown |
| style | object | {} | Style changes to the main View |
| iconStyle | object | {} | Style changes to the icon View |
| titleStyle | object | {} | Style changes to the title Text |
| inputStyle | object | {} | Style changes to the TextInput |
| messageStyle | object | {} | Style changes to the validation message Text |
| icon | element | null | Any react component to be used as icon |
| validIcon | element | null | Any react component to be used as icon when valid. Requires `icon` prop |
| invalidIcon | element | null | Any react component to be used as icon when invalid. Requires `icon` prop |
| nextInput | element | null | Any react component that responds to focus() to be focused when finished editing |
| onNextInputFocus | function | automatic | Function to focus on nextInput. Automatically passed by StatelessForm. But feel free to override. |
| onKeyboardShow | function | automatic | Function to scroll to top of input on keyboard show. Automatically passed by StatelessForm. But feel free to override. |

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
