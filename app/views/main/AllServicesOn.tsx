import React from 'react';
import { Dimensions, ImageBackground, StatusBar, View } from 'react-native';
import Pulse from 'react-native-pulse';
import { SvgXml } from 'react-native-svg';

import { Icons, Images } from '../../assets';
import { Typography } from '../../components/Typography';
import Colors from '../../constants/colors';
import { Theme } from '../../constants/themes';
import { isGPS } from '../../COVIDSafePathsConfig';
import { useAssets } from '../../TracingStrategyAssets';
import { styles } from './style';

export const AllServicesOnScreen = (): JSX.Element => {
  const {
    allServicesOnScreenHeader,
    allServicesOnScreenSubheader,
  } = useAssets();
  const size = Dimensions.get('window').height;

  return (
    <Theme use='violet'>
      <ImageBackground
        source={Images.LaunchScreenBackground}
        style={styles.backgroundImage}>
        <StatusBar
          barStyle='light-content'
          backgroundColor='transparent'
          translucent
        />
        <View style={styles.pulseContainer}>
          {isGPS && (
            <Pulse
              image={{ exportImage: Images.Export }}
              color={Colors.PULSE_WHITE}
              numPulses={3}
              diameter={400}
              speed={20}
              duration={2000}
            />
          )}
          <SvgXml
            xml={Icons.StateNoContact}
            width={size ? size : 80}
            height={size ? size : 80}
          />
        </View>

        <View style={styles.mainContainer}>
          <View style={styles.contentAbovePulse} />
          <View style={styles.contentBelowPulse}>
            <Typography style={styles.mainTextBelow}>
              {allServicesOnScreenHeader}
            </Typography>
            <Typography style={styles.subheaderText}>
              {allServicesOnScreenSubheader}
            </Typography>
          </View>
        </View>
      </ImageBackground>
    </Theme>
  );
};
