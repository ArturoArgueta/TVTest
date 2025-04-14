import React from 'react';
import { Text, Image, TouchableOpacity } from 'react-native';
import { ButtonRow, CardContainer, Container, Content, CreditsButton, CreditsButtonText, EpisodeInfo, PlayButton, PlayButtonText, Thumbnail, Title } from './styles';
interface Props {
  title: string;
  episodeInfo: string;
  imageUrl: string;
  timeRemaining: number;
  onPress: () => void;
}
const UpNextPreview: React.FC<Props> = ({episodeInfo, imageUrl, timeRemaining, onPress }) => {
  return (
    <Container>
        <Content>
            <CardContainer>
                <Thumbnail source={{ uri: imageUrl }} resizeMode="cover" />
                <EpisodeInfo>{episodeInfo}</EpisodeInfo>
            </CardContainer>
            <ButtonRow>
            <CreditsButton
                focusable={true}
                accessible={true}
                onPress={() => {
                console.log('Watch Credits Pressed');
                }}
            >
                <CreditsButtonText>Watch Credits</CreditsButtonText>
            </CreditsButton>
            <PlayButton
                focusable={true}
                accessible={true}
                onPress={onPress}
            >
                <PlayButtonText>Playing in {timeRemaining} Sec</PlayButtonText>
            </PlayButton>
            </ButtonRow>
      </Content>
    </Container>
  );
};
export default UpNextPreview;
