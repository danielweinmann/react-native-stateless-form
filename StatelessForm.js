import React from 'react';
import {
	Platform,
	Component,
	PropTypes,
	ScrollView,
	View,
	StyleSheet,
} from 'react-native';

let styles;

export default class StatelessForm extends Component {
	componentDidMount() {
		this.willFocusInput = false;
	}

	childrenWithProps() {
		let nextInput = null;
		let inputCount = 0;
		return React.Children
			.map(this.props.children, (child) => child).reverse().map((child) => {
				if (typeof child.props.value !== 'undefined') {
					inputCount++;

					const input = React.cloneElement(child, {
						nextInput,
						ref: `input${inputCount}`,
						onNextInputFocus: this.handleNextInputFocus,
						postFocus: this.handleFocus,
						postBlur: this.handleBlur,
					});
					nextInput = input;
					return input;
				}
				return child;
			})
			.reverse();
	}

	handleNextInputFocus = (nextInput, currentInput) => {
		if (nextInput) {
			const input = this.refs[nextInput.ref];
			this.willFocusInput = true;
			input.focus();
		} else {
			currentInput.blur();
		}
	};

	handleBlur = () => {
		if (!this.willFocusInput) {
			this.refs.scrollView.scrollTo({ y: 0 });
		}
		this.willFocusInput = false;
	};

	handleFocus = (scrollTo) => {
		this.willFocusInput = false;
		this.refs.scrollView.scrollTo({ y: scrollTo });
	};

	render() {
		return (
			<ScrollView
				keyboardShouldPersistTaps={ false }
				{ ...this.props }
				ref="scrollView"
				style={ [styles.container, this.props.style] }
			>
				{ this.childrenWithProps() }
				{ Platform.OS === 'android' && <View style={ styles.androidSpacer } /> }
			</ScrollView>
		);
	}
}

StatelessForm.propTypes = {
	children: PropTypes.node,
	style: PropTypes.oneOfType([
		React.PropTypes.number,
		React.PropTypes.object,
		React.PropTypes.arrayOf(React.PropTypes.object),
	]),
};

StatelessForm.defaultProps = {
	style: {},
};

styles = StyleSheet.create({ // eslint-disable-line
	container: {
		flex: 1,
		alignSelf: 'stretch',
	},
	androidSpacer: {
		height: 500,
	},
});
