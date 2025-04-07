import styled from "@emotion/native";
import { SafeAreaView } from "react-native";

export const MainWrapper = styled(SafeAreaView)(({theme}) => ({
    backgroundColor: theme.colors.background0,
    flex: 1
}))