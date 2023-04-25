import styled from 'styled-components/native';

export const Container = styled.View`
  background: #fff;
  padding: 16px 16px;
  border-radius: 5px;
  margin: 8px;
  flex: 1;
`;

export const Image = styled.Image`
  height: 122px;
  width: 122px;
  align-self: center;
`;

export const Title = styled.Text`
  font-size: 14px;
  margin-top: 10px;
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  margin-top: auto;
`;

export const Price = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: #e83f5b;
`;

export const Button = styled.TouchableOpacity``;
