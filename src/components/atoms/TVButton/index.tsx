import React from 'react';
import { useTVFocus } from '../../../hooks/useTVFocus';
import { ButtonContainer, ButtonText } from './styles';

interface TVButtonProps {
    onPress: () => void;
    title: string;
}

const TVButton: React.FC<TVButtonProps> = ({ onPress, title }) => {
    const { isFocused, focusProps } = useTVFocus();

    return (
        <ButtonContainer 
            isFocused={isFocused} 
            onPress={onPress}
            {...focusProps}
        >
            <ButtonText isFocused={isFocused}>{title}</ButtonText>
        </ButtonContainer>
    );
};

export default TVButton; 