import React, {useRef, useCallback, useState} from 'react';
import {Button, SafeAreaView, StyleSheet, TextInput} from 'react-native';

const INITIAL_TEXT = 'Select THIS part of the text (Then press btn)';

const App = () => {
  const textInputRef = useRef(null);
  const [value, setValue] = useState(INITIAL_TEXT);

  const selection = useRef({
    start: 0,
    end: 0,
  });

  const onSelectionChange = useCallback(event => {
    selection.current = event.nativeEvent.selection;
  }, []);

  const setSelectionToEnd = useCallback(async () => {
    const emoji = '👍';
    setValue(prev => {
      const textWithEmojiReplaced =
        prev.substring(0, selection.current.start) +
        emoji +
        prev.substring(selection.current.end);
      return textWithEmojiReplaced;
    });
    const selectionAfterEmoji = selection.current.start + emoji.length;

    selection.current = {
      start: selectionAfterEmoji,
      end: selectionAfterEmoji,
    };

    // update selection after the text has been updated
    requestAnimationFrame(() => {
      textInputRef.current?.setSelection(
        selectionAfterEmoji,
        selectionAfterEmoji,
      );
    });
  }, []);

  return (
    <SafeAreaView style={styles.contentContainer}>
      <Button
        onPress={setSelectionToEnd}
        title={'Set selection to end\nof current selection'}
      />
      <TextInput
        ref={textInputRef}
        style={styles.input}
        onSelectionChange={onSelectionChange}
        value={value}
        onChangeText={setValue}
      />

      <Button
        title={'Reset'}
        onPress={() => {
          textInputRef.current?.clear();
          setValue(INITIAL_TEXT);
        }}
      />
    </SafeAreaView>
  );
};

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

export default App;
