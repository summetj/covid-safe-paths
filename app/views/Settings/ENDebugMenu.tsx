import React, { useEffect, useContext } from 'react';
import {
  View,
  ViewStyle,
  TouchableOpacity,
  StyleSheet,
  Alert,
  BackHandler,
  ScrollView,
} from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';

import { NavigationBarWrapper } from '../../components/NavigationBarWrapper';
import { Typography } from '../../components/Typography';
import {
  detectExposuresNow,
  simulateExposure,
  simulatePositiveDiagnosis,
  toggleExposureNotifications,
  resetExposureDetectionError,
  resetUserENState,
  getAndPostDiagnosisKeys,
  simulateExposureDetectionError,
  getExposureConfiguration,
} from '../../exposureNotificationsNativeModule';
import ExposureNotificationContext from '../../ExposureNotificationContext';

import { Colors, Spacing } from '../../styles';

// eslint-disable-next-line
declare const global: any;

type ENDebugMenuProps = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
};

export const EN_DEBUG_MENU_SCREEN_NAME = 'ENDebugMenu';
export const EN_LOCAL_DIAGNOSIS_KEYS_SCREEN_NAME = 'ENLocalDiagnosisKeyScreen';

const ENDebugMenu = ({ navigation }: ENDebugMenuProps): JSX.Element => {
  const { resetExposures } = useContext(ExposureNotificationContext);
  useEffect(() => {
    const handleBackPress = () => {
      navigation.goBack();
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [navigation]);

  const backToSettings = () => {
    navigation.goBack();
  };

  const showErrorAlert = (errorString: string) => {
    Alert.alert('Error', errorString, [{ text: 'OK' }], {
      cancelable: false,
    });
  };

  const showSuccessAlert = (messageString: string) => {
    Alert.alert(
      'Success',
      messageString,
      [
        {
          text: 'OK',
        },
      ],
      { cancelable: false },
    );
  };

  const handleOnPressSimulationButton = (
    callSimulatedEvent: (
      cb: (errorString: string | null, successString: string | null) => void,
    ) => void,
  ) => {
    return () => {
      const cb = (errorString: string | null, successString: string | null) => {
        if (errorString) {
          showErrorAlert(errorString);
        } else if (successString) {
          showSuccessAlert(successString);
        } else {
          showSuccessAlert('success');
        }
      };
      callSimulatedEvent(cb);
    };
  };

  const handleOnPressResetExposures = () => {
    resetExposures();
  };

  const handleOnPressToggleExposureNotifications = () => {
    handleOnPressSimulationButton(toggleExposureNotifications)();
    global.ExposureNotificationsOn = !global.ExposureNotificationsOn;
  };

  interface DebugMenuListItemProps {
    label: string;
    onPress: () => void;
    style?: ViewStyle;
  }

  const DebugMenuListItem = ({
    label,
    onPress,
    style,
  }: DebugMenuListItemProps) => {
    return (
      <TouchableOpacity style={[styles.listItem, style]} onPress={onPress}>
        <Typography use={'body1'}>{label}</Typography>
      </TouchableOpacity>
    );
  };

  return (
    <NavigationBarWrapper
      includeBottomNav
      title={'EN Debug Menu'}
      onBackPress={backToSettings}>
      <ScrollView>
        <View style={styles.section}>
          <DebugMenuListItem
            label='Reset Exposures'
            style={styles.lastListItem}
            onPress={handleOnPressResetExposures}
          />
        </View>
        <View style={styles.section}>
          <DebugMenuListItem
            label='Detect Exposures Now'
            onPress={handleOnPressSimulationButton(detectExposuresNow)}
          />
          <DebugMenuListItem
            label='Get Exposure Configuration'
            onPress={handleOnPressSimulationButton(getExposureConfiguration)}
          />
          <DebugMenuListItem
            label='Simulate Exposure Detection Error'
            onPress={handleOnPressSimulationButton(
              simulateExposureDetectionError,
            )}
          />
          <DebugMenuListItem
            label='Simulate Exposure'
            onPress={handleOnPressSimulationButton(simulateExposure)}
          />
          <DebugMenuListItem
            label='Simulate Positive Diagnosis'
            onPress={handleOnPressSimulationButton(simulatePositiveDiagnosis)}
          />
          <DebugMenuListItem
            label='Toggle Exposure Notifications'
            onPress={handleOnPressToggleExposureNotifications}
          />
          <DebugMenuListItem
            label='Reset Exposure Detection Error'
            onPress={handleOnPressSimulationButton(resetExposureDetectionError)}
          />
          <DebugMenuListItem
            label='Reset User EN State'
            style={styles.lastListItem}
            onPress={handleOnPressSimulationButton(resetUserENState)}
          />
        </View>
        <View style={styles.section}>
          <DebugMenuListItem
            label='Show Local Diagnosis Keys'
            onPress={() => {
              navigation.navigate(EN_LOCAL_DIAGNOSIS_KEYS_SCREEN_NAME);
            }}
          />
          <DebugMenuListItem
            label='Get and Post Diagnosis Keys'
            style={styles.lastListItem}
            onPress={handleOnPressSimulationButton(getAndPostDiagnosisKeys)}
          />
        </View>
      </ScrollView>
    </NavigationBarWrapper>
  );
};

const styles = StyleSheet.create({
  section: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.small,
    marginBottom: Spacing.medium,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.tertiaryViolet,
  },
  listItem: {
    flex: 1,
    paddingVertical: Spacing.medium,
    borderBottomWidth: 1,
    borderColor: Colors.tertiaryViolet,
  },
  lastListItem: {
    borderBottomWidth: 0,
  },
});

export default ENDebugMenu;
