import styled from '@emotion/native';
import { TouchableOpacity } from 'react-native';

interface FocusProps {
    isFocused: boolean;
}

export const ButtonContainer = styled(TouchableOpacity)<FocusProps>(({ theme, isFocused }) => ({
    padding: theme.sizes.sm,
    backgroundColor: isFocused ? theme.colors.foreground0 : theme.colors.background1,
    borderRadius: theme.sizes.sm,
    borderWidth: 2,
    borderColor: theme.colors.foreground0,
    transform: [{ scale: isFocused ? 1.1 : 1 }],
}));

export const ButtonText = styled.Text<FocusProps>(({ theme, isFocused }) => ({
    color: isFocused ? theme.colors.background0 : theme.colors.foreground0,
    fontSize: theme.sizes.md,
    textAlign: 'center',
})); 