import React, {useRef, useCallback, useState} from 'react';
import {Button, SafeAreaView, StyleSheet, TextInput} from 'react-native';

const INITIAL_TEXT = 'Select THIS part of the text (Then press btn)';

class AppAsClass extends React.Component {
  constructor(props) {
    super(props);
    this.textInputRef = React.createRef();
    this.state = {
      value: INITIAL_TEXT,
    };
    this.selection = {
      start: 0,
      end: 0,
    };
  }

  onSelectionChange = event => {
    this.selection = event.nativeEvent.selection;
  };

  setSelectionToEnd = async () => {
    const emoji = '👍';

    const textWithEmojiReplaced =
      this.state.value.substring(0, this.selection.start) +
      emoji +
      this.state.value.substring(this.selection.end);

    const selectionAfterEmoji = this.selection.start + emoji.length;

    this.selection = {
      start: selectionAfterEmoji,
      end: selectionAfterEmoji,
    };

    this.setState(
      {
        value: textWithEmojiReplaced,
      },
      () => {
        // update selection after the text has been updated
        this.textInputRef.current?.setSelection(
          selectionAfterEmoji,
          selectionAfterEmoji,
        );
      },
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.contentContainer}>
        <Button
          onPress={this.setSelectionToEnd}
          title={'Set selection to end\nof current selection'}
        />
        <TextInput
          ref={this.textInputRef}
          style={styles.input}
          onSelectionChange={this.onSelectionChange}
          value={this.state.value}
          onChangeText={this.setValue}
        />

        <Button
          title={'Reset'}
          onPress={() => {
            this.setState({value: INITIAL_TEXT});
          }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
  },
  input: {
    borderBottomWidth: 1,
    backgroundColor: 'lightgray',
    width: 300,
    height: 40,
    marginTop: 10,
  },
});

export default AppAsClass;
