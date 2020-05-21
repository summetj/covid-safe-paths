import React from 'react';
import {
  Dimensions,
  ImageBackground,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import { Images } from '../../assets';
import { Button } from '../../components/Button';
import { Type, Typography } from '../../components/Typography';
import Colors from '../../constants/colors';
import fontFamily from '../../constants/fonts';
import { config } from '../../COVIDSafePathsConfig';
import { SetStoreData } from '../../helpers/General';
import languages from '../../locales/languages';
import { sharedStyles } from './styles';

const width = Dimensions.get('window').width;

const Onboarding = props => {
  let navDestination = 'Onboarding5'
  if (config.tracingStrategy !== 'gps') {
    navDestination = 'Main';
  }

  return (
    <View style={styles.mainContainer}>
      <StatusBar
        barStyle='dark-content'
        backgroundColor='transparent'
        translucent
      />
      <ImageBackground
        source={Images.LaunchScreen1BT}
        style={styles.backgroundImage}
      />
      <View style={styles.contentContainer}>
        <Typography style={styles.headerText} use={Type.Headline2}>
          {languages.t('label.launch_screen4_header_bluetooth')}
        </Typography>
        <Typography style={styles.subheaderText}>
          {languages.t('label.launch_screen4_subheader_bluetooth')}
        </Typography>
      </View>
      <View style={sharedStyles.footerContainer}>
        <Button
          label={languages.t('label.launch_set_up_phone')}
          onPress={() => {
            SetStoreData('ONBOARDING_DONE', true);
            props.navigation.replace(navDestination);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
    top: '-10%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.INTRO_WHITE_BG,
  },
  contentContainer: {
    width: width * 0.9,
    flex: 1,
    alignSelf: 'center',
    marginTop: '30%',
  },
  headerText: {
    color: Colors.VIOLET,
  },
  subheaderText: {
    marginTop: '6%',
    color: Colors.VIOLET,
    fontSize: 16,
    fontFamily: fontFamily.primaryRegular,
  },
});

export default Onboarding;
