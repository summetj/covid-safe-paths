import React, { useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import NotAvailable from './NotAvailable';
import ExposureNotificationContext, {
  ExposureNotificationState,
} from '../../ExposureNotificationContext';

const ExposureNotificationMain = (): JSX.Element => {
  const { enabled } = useContext<ExposureNotificationState>(
    ExposureNotificationContext,
  );
  return (
    <View style={styles.container}>
      {enabled ? (
        <View>
          <Text>Enabled</Text>
        </View>
      ) : (
        <NotAvailable />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ExposureNotificationMain;
