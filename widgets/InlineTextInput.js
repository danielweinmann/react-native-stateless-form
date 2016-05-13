import React from 'react';
import {
	Component,
	PropTypes,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';

let styles;
export default class InlineTextInput extends Component {
	componentDidMount() {
		this.scrollTo = 0;
	}

	handleLayout = (event) => {
		this.scrollTo = event.nativeEvent.layout.y;
	};

	handleFocus = (e) => {
		const { onFocus, postFocus } = this.props;
		if (onFocus) onFocus(e);
		postFocus(this.scrollTo);
	};

	handleBlur = (e) => {
		const { onBlur, postBlur } = this.props;
		if (onBlur) onBlur(e);
		postBlur();
	};

	focus = () => {
		this.refs.input.focus();
	};

	blur = () => {
		this.refs.input.blur();
	};

	shouldDisplayMessage() {
		const { touched, valid, message } = this.props;
		return (touched && !valid && !!message);
	}

	handleSubmitEditing = () => {
		const { nextInput, onNextInputFocus } = this.props;
		onNextInputFocus(nextInput, this);
	};

	renderIcon() {
		const { icon, validIcon, invalidIcon, valid, value, iconStyle } = this.props;
		if (!icon) return null;

		let renderedIcon = null;
		if (value && value.length > 0) {
			if (valid) {
				renderedIcon = validIcon || icon;
			} else {
				renderedIcon = invalidIcon || icon;
			}
		} else {
			renderedIcon = icon;
		}
		return (
			<View style={ [styles.icon, iconStyle] } >
				{ renderedIcon }
			</View>
		);
	}

	renderMessage() {
		const { message, messageStyle } = this.props;
		if (!this.shouldDisplayMessage()) return null;
		return (
			<Text style={ [styles.message, messageStyle] }>
				{ message }
			</Text>
		);
	}

	render() {
		const {
			title,
			value,
			style,
			titleStyle,
			inputStyle,
			nextInput,
			multiline,
		} = this.props;

		let returnKeyType;
		if (multiline) {
			returnKeyType = 'default';
		} else if (nextInput) {
			returnKeyType = 'next';
		} else {
			returnKeyType = 'done';
		}
		return (
			<TouchableOpacity onPress={ this.focus }>
				<View
					onLayout={ this.handleLayout }
					style={ [{
						borderBottomWidth: (nextInput ? 0 : StyleSheet.hairlineWidth),
					}, styles.container, style] }
				>
					<View
						style={ [
							styles.inputContainer,
							{ paddingBottom: (this.shouldDisplayMessage() ? 0 : 6) },
						] }
					>
						{ this.renderIcon() }
						<Text
							style={ [styles.title, titleStyle] }
						>
							{ title }
						</Text>
						<TextInput
							clearButtonMode="while-editing"
							returnKeyType={ returnKeyType }
							onSubmitEditing={ this.handleSubmitEditing }
							{ ...this.props }
							onFocus={ this.handleFocus }
							onBlur={ this.handleBlur }
							ref="input"
							value={ value }
							style={ [styles.input, inputStyle] }
						/>
					</View>
					{ this.renderMessage() }
				</View>
			</TouchableOpacity>
		);
	}
}

const stylePropType = PropTypes.oneOfType([
	React.PropTypes.object,
	React.PropTypes.arrayOf(React.PropTypes.object),
]);

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
	onBlur: PropTypes.func,
	postBlur: PropTypes.func,
	onFocus: PropTypes.func,
	postFocus: PropTypes.func,
	touched: PropTypes.bool,
	nextInput: PropTypes.node,
	onNextInputFocus: PropTypes.func,
	multiline: PropTypes.bool,
};

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
};

styles = StyleSheet.create({ // eslint-disable-line
	container: {
		backgroundColor: 'white',
		borderTopWidth: StyleSheet.hairlineWidth,
		borderColor: 'lightgray',
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingTop: 6,
	},
	icon: { marginLeft: 6 },
	title: {
		flex: 0.5,
		fontSize: 14,
		fontWeight: 'bold',
		marginLeft: 6,
	},
	message: {
		color: 'red',
		marginLeft: 10,
		marginBottom: 10,
		fontSize: 12,
	},
	input: {
		flex: 1,
		height: 36,
		fontSize: 14,
		backgroundColor: 'white',
	},
});
