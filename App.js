import React, {useRef, useCallback, useState} from 'react';
import {
  Button,
  View,
  Modal,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Keyboard,
} from 'react-native';

const INITIAL_TEXT = 'Select THIS part of the text (Then press btn)';

function fibonacci(n) {
  if (n <= 2) {
    return 1;
  } else {
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
}

const makeJSBusy = () => {
  const n = 30;
  fibonacci(n);
};

const App = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const textInputRef = useRef(null);
  const [value, setValue] = useState(INITIAL_TEXT);

  const selection = useRef({
    start: 0,
    end: 0,
  });

  const onSelectionChange = useCallback(event => {
    console.log('onSelectionChange', event.nativeEvent.selection);
    selection.current = event.nativeEvent.selection;
  }, []);

  const addEmojiToText = useCallback(async () => {
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
      console.log('setSelection', selectionAfterEmoji);
      textInputRef.current?.setSelection(
        selectionAfterEmoji,
        selectionAfterEmoji,
      );
    });
  }, []);

  return (
    <SafeAreaView style={styles.contentContainer}>
      <Modal visible={isModalVisible}>
        <Button
          title="Add emoji"
          onPress={() => {
            addEmojiToText();
            setIsModalVisible(false);
            setTimeout(() => {
              textInputRef.current?.focus();
            }, 500);
          }}
        />
        <Button title="Close" onPress={() => setIsModalVisible(false)} />
      </Modal>

      <View style={styles.btnContainer}>
        <Button
          onPress={() => {
            // Keyboard.dismiss();
            setIsModalVisible(true);
          }}
          title={'Open emoji modal'}
        />
      </View>
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
  btnContainer: {
    marginBottom: 40,
  },
  input: {
    borderBottomWidth: 1,
    backgroundColor: 'lightgray',
    width: 300,
    height: 40,
    marginTop: 10,
    textAlign: 'left',
  },
});

export default App;
