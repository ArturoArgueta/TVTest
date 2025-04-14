
import styled from '@emotion/native';

export const Container = styled.View({
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 12,
    overflow: 'hidden',
    padding: 12,
    alignItems: 'center',
    position: 'absolute',
    zIndex:2,
    width:'100%',
    height:'100%',
    alignSelf:'center'
  });
export const Thumbnail = styled.Image(({theme}) => ({
    width: theme.scale(400),
    aspectRatio: 16/9,
    borderRadius: 6,
    marginRight: 12,
  }));
export const Content = styled.View({
    position:'absolute',
    display: 'flex',
    flexDirection: 'column',
    bottom: '25%',
    right:'5%'
  });
export const EpisodeInfo = styled.Text(({theme}) => ({
    position:'absolute',
    color: theme.colors.foreground0,
    fontSize: theme.sizes.sm,
    bottom: theme.sizes.xs,
    left: theme.sizes.xxs,
    fontWeight:'400'
  }));
export const Title = styled.Text({
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 2,
    marginBottom: 8,
  });
export const ButtonRow = styled.View(({theme}) => ({
    flexDirection: 'row',
    width:'100%',
    columnGap: 10,
    paddingTop: theme.sizes.xs
  }));
export const CreditsButton = styled.TouchableOpacity(({theme}) => ({
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: theme.sizes.xs,
    width:'40%'
  }));
export const CreditsButtonText = styled.Text({
    fontSize: 13,
    color: '#000',
  });
export const PlayButton = styled.TouchableOpacity(({theme}) => ({
    backgroundColor: '#ffffffcc',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: theme.sizes.xs,
    width:'40%'
  }));
export const PlayButtonText = styled.Text({
    fontSize: 13,
    color: '#000',
    fontWeight: 'bold',
  });
export const CardContainer = styled.View({
    flexDirection:'column' 
})