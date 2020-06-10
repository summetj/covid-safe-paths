import React, { useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import NotAvailable from './NotAvailable';
import { ExposurePage } from '../main/ExposurePage';
import ExposureNotificationContext, {
  ExposureNotificationState,
} from '../../ExposureNotificationContext';

const ExposureNotificationMain = (): JSX.Element => {
  const { enabled } = useContext<ExposureNotificationState>(
    ExposureNotificationContext,
  );
  return (
    <View style={styles.container}>
      {enabled ? <ExposurePage /> : <NotAvailable />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ExposureNotificationMain;
