import React, { ComponentProps } from 'react';
import { Pressable, Text, ViewStyle, PressableStateCallbackType, StyleProp, ActivityIndicator, StyleSheet } from 'react-native';
import { accent } from '../../core/colors';
import Color from 'color';
import getFontFamily from '../../core/getFontFamily';

type PressProps = ComponentProps<typeof Pressable>;

type Props = {
  text: string;
  onPress: PressProps['onPress'];
  disabled?: PressProps['disabled'];
  loading?: boolean;
  color?: keyof typeof accent;
  height?: number;
};

type PressableStateCallback = {
  pressed: PressableStateCallbackType['pressed'];
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: getFontFamily(),
  },
});

const pressStyle = (disabled: Props['disabled'], loading: Props['loading'], backgroundColor: string, height?: number) => ({ pressed }: PressableStateCallback): StyleProp<ViewStyle> => ({
  width: '100%',
  height: height || 50,
  backgroundColor: loading || disabled ? '#DDD' : pressed ? Color(backgroundColor).darken(0.2).hex() : backgroundColor,
  alignItems: 'center',
  justifyContent: 'center',
  borderBottomWidth: 0.3,
});

const Button = ({ text, onPress, disabled, loading, color, height }: Props) => {
  const style = pressStyle(disabled, loading, accent[color || 'INFO'], height);

  const textColor = disabled ? '#999' : color === 'WHITE' ? accent.INFO : accent.WHITE;

  return (
    <Pressable
      style={style}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator
          color="#888"
          size={24}
        />
      ) : (
        <Text style={[styles.text, { color: textColor }]}>
          {text}
        </Text>
      )}

    </Pressable>
  );
};

export default Button;
