import React from 'react';
import {
  View,
  Text,
  Platform,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { Utils } from './Utils';
import Controls from './Controls';
import Calendar from '../../../assets/svg/calendar.svg'

export default function HeaderControls(props) {
  const {
    styles,
    currentMonth,
    currentYear,
    onPressNext,
    onPressPrevious,
    onPressMonth,
    onPressYear,
    months,
    previousComponent,
    nextComponent,
    previousTitle,
    nextTitle,
    previousTitleStyle,
    nextTitleStyle,
    monthTitleStyle,
    yearTitleStyle,
    textStyle,
    restrictMonthNavigation,
    maxDate,
    minDate,
    headingLevel,
    monthYearHeaderWrapperStyle,
    headerWrapperStyle
  } = props;
  const MONTHS = months || Utils.MONTHS; // English Month Array
  const monthName = MONTHS[currentMonth];
  const year = currentYear;

  const disablePreviousMonth = restrictMonthNavigation && Utils.isSameMonthAndYear(minDate, currentMonth, currentYear);
  const disableNextMonth = restrictMonthNavigation && Utils.isSameMonthAndYear(maxDate, currentMonth, currentYear);

  const accessibilityProps = { accessibilityRole: 'header' };
  if (Platform.OS === 'web') {
    accessibilityProps['aria-level'] = headingLevel;
  }

  return (
    <View style={[styles.headerWrapper, headerWrapperStyle]}>
      
      <View style={[styles.monthYearHeaderWrapper,monthYearHeaderWrapperStyle,{marginHorizontal:5}]}>
        <View style={{marginRight:10}}>
          <Calendar />
        </View>
        
        <TouchableOpacity onPress={onPressMonth}>
          <Text style={[styles.monthHeaderMainText, textStyle, monthTitleStyle]} {...accessibilityProps}>
            { monthName }
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressYear}>
          <Text style={[styles.yearHeaderMainText, textStyle, yearTitleStyle]}>
            { year }
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection:'row'}}>
        <View style={{marginHorizontal:30}}>
<Controls
        disabled={disablePreviousMonth}
        label={previousTitle}
        component={previousComponent}
        onPressControl={onPressPrevious}
        textStyles={[styles.navButtonText, textStyle, previousTitleStyle]}
        styles={{marginHorizantal:5}}
      />
        </View>
      <View style={{marginHorizontal:10}}>
      <Controls
        disabled={disableNextMonth}
        label={nextTitle}
        component={nextComponent}
        onPressControl={onPressNext}
        textStyles={[styles.navButtonText, textStyle, nextTitleStyle]}
      />
      </View>
      
      </View>

    </View>
  );
}

HeaderControls.propTypes = {
  currentMonth: PropTypes.number,
  currentYear: PropTypes.number,
  onPressNext: PropTypes.func,
  onPressPrevious: PropTypes.func,
  onPressMonth: PropTypes.func,
  onPressYear: PropTypes.func,
};
