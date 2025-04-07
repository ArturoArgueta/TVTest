import styled from '@emotion/native';

export const PlayerContent = styled.View(({ theme }) =>({
    flex: 1,
    padding: 20,
    flexDirection: 'column',
    gap: theme.sizes.md
}));

export const ButtonWrapper = styled.View(({ theme }) => ({
    width: 150,
})); 