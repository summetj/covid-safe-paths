import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  StyleSheet,
  Dimensions,
  ImageBackground,
  StatusBar,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import { SvgXml } from 'react-native-svg';

import { Icons, Images } from '../../assets';
import { Typography } from '../../components/Typography';
import { Theme } from '../../constants/themes';
import { useAssets } from '../../TracingStrategyAssets';
import { MayoButton } from './MayoButton';
import Colors from '../../constants/colors';
import fontFamily from '../../constants/fonts';

import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';

type ExposurePageProps = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
};

export const ExposurePage = ({
  navigation,
}: ExposurePageProps): JSX.Element => {
  const { t } = useTranslation();
  const { exposurePageSubheader } = useAssets();
  const buttonLabel = t('label.see_exposure_history');
  const size = Dimensions.get('window').height;

  const handleOnPress = () => {
    console.log('pressin');
    navigation.navigate('ExposureHistoryScreen');
  };

  return (
    <Theme use='charcoal'>
      <ImageBackground
        source={Images.BackgroundAtRisk}
        style={styles.backgroundImage}>
        <StatusBar
          barStyle='light-content'
          backgroundColor='transparent'
          translucent
        />
        <View style={styles.pulseContainer}>
          <SvgXml
            xml={Icons.StateAtRisk}
            width={size ? size : 80}
            height={size ? size : 80}
          />
        </View>

        <View style={styles.mainContainer}>
          <View style={styles.contentAbovePulse}>
            <Typography style={styles.mainTextAbove}>
              {t('label.home_at_risk_header')}
            </Typography>
            <Typography style={styles.subsubheaderText}>
              {t('label.home_at_risk_subsubtext')}
            </Typography>
          </View>
          <View style={styles.contentBelowPulse}>
            <Typography style={styles.subheaderText}>
              {exposurePageSubheader}
            </Typography>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={handleOnPress}
                style={styles.buttonContainer}>
                <Text style={styles.buttonLabel}>{buttonLabel}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <MayoButton />
      </ImageBackground>
    </Theme>
  );
};

const PULSE_GAP = 80;

export const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    flex: 1,
    justifyContent: 'flex-end',
  },
  mainContainer: {
    position: 'absolute',
    // resizeMode: 'contain',
    // aligns the center of the main container with center of pulse
    // so that two `flex: 1` views will be have a reasonable chance at natural
    // flex flow for above and below the pulse.
    top: '-10%',
    left: 0,
    right: 0,
    height: '100%',
    paddingHorizontal: '12%',
    paddingBottom: 12,
  },
  contentAbovePulse: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: PULSE_GAP / 2,
  },
  contentBelowPulse: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: PULSE_GAP,
  },
  buttonContainer: {
    borderColor: 'red',
    borderWidth: 2,
  },
  buttonLabel: {
    borderWidth: 1,
  },
  pulseContainer: {
    position: 'absolute',
    resizeMode: 'contain',
    height: '100%',
    top: '-13%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  mainTextAbove: {
    textAlign: 'center',
    lineHeight: 34,
    marginBottom: 24,
    color: Colors.WHITE,
    fontSize: 28,
    fontFamily: fontFamily.primaryMedium,
  },
  subheaderText: {
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 24.5,
    color: Colors.WHITE,
    fontSize: 18,
    fontFamily: fontFamily.primaryRegular,
  },
  subsubheaderText: {
    textAlign: 'center',
    lineHeight: 24.5,
    color: Colors.WHITE,
    fontSize: 16,
    fontFamily: fontFamily.primaryLight,
    marginBottom: 24,
  },
});
