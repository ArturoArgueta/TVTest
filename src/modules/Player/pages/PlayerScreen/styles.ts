import styled from '@emotion/native';

export const PlayerContent = styled.ScrollView(({ theme }) =>({
    flex: 1,
    padding: 20,
    flexDirection: 'column',
    gap: theme.sizes.md
}));

export const ButtonWrapper = styled.View(({ theme }) => ({
    width: 150,
})); 

export const RowButtonsContainer = styled.View({
    width: '100%',
    justifyContent: 'space-between',
})