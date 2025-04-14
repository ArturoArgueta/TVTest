import React, { forwardRef } from 'react';
import { ButtonRow, CardContainer, Container, Content, CreditsButton, CreditsButtonText, EpisodeInfo, PlayButton, PlayButtonText, Thumbnail } from './styles';
interface Props {
  title: string;
  episodeInfo: string;
  imageUrl: string;
  timeRemaining: number;
  onPress: () => void;
}
const UpNextPreview = forwardRef<any, Props>((props, ref) => {
  const {episodeInfo, imageUrl, timeRemaining, onPress} = props;
  return (
    <Container ref={ref}>
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
});
export default UpNextPreview;
