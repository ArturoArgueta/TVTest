import styled from '@emotion/native';

export const PlayerContent = styled.SafeAreaView(({ theme }) =>({
    flex: 1,
    padding: 20,
    flexDirection: 'column',
    backgroundColor: theme.colors.background0
}));

export const ButtonWrapper = styled.View(({ theme }) => ({
    width: 150,
})); 

export const RowButtonsContainer = styled.View({
    width: '100%',
    justifyContent: 'space-between',
})

export const ButtonContainer = styled.TouchableOpacity(({theme}) => ({
    position: 'absolute',
    top: theme.sizes.xs,
    left: theme.sizes.xs,
    padding: theme.sizes.sm,
    zIndex: 2
}))