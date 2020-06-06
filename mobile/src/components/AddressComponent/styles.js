import styled from 'styled-components/native'

export const ProductImage = styled.Image`

height: 72;
resizeMode: 'contain';
marginRight: 10;

`;
export const InfoContainer = styled.View`

flexDirection: 'column';
alignSelf: 'stretch';
justifyContent: 'flex-end';
borderColor: '#ccc';
borderBottomWidth: 1;
paddingBottom: 10;
width: '100%';

`;
export const ProductName = styled.Text`

fontSize: 16;
fontWeight: 'normal';
color: '#999';

`;
export const LocalName = styled.Text`

fontSize: 10;
fontWeight: 'normal';
color: '#999';
marginRight: 15;

`;
export const DataRate = styled.View`

flexDirection: 'row',
justifyContent: 'flex-start',

`;
export const Container = styled.View`

fontSize: 14;
color: '#aaa';
paddingVertical: 10;
`;