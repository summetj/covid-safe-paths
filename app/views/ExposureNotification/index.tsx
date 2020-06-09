import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import NotAvailable from './NotAvailable';

const ExposureNotificationMain = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text>ENMain</Text>
      <NotAvailable />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ExposureNotificationMain;
