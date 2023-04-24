import styled from 'styled-components/native';

export const Container = styled.View`
  background: #fff;
  border-radius: 5px;
  flex-direction: row;
  margin: 5px;
  padding: 15px 15px;
`;

export const Image = styled.Image`
  height: 92px;
  width: 92px;
`;

export const Summary = styled.View`
  font-size: 16px;
  margin-left: 5px;
`;

export const Title = styled.Text`
  font-size: 16px;
`;

export const Price = styled.Text`
  font-size: 12px;
  color: #a0a0b3;
  margin-top: 8px;
`;

export const Total = styled.View`
  flex-direction: row;
  margin-top: 8px;
`;

export const Quantity = styled.Text`
  color: #e83f5b;
  font-size: 16px;
  font-weight: bold;
  margin-right: 10px;
  margin-top: 5px;
`;

export const Amount = styled.Text`
  font-weight: bold;
  margin-top: 5px;
  font-size: 16px;
  color: #e83f5b;
`;

export const ButtonGroup = styled.View`
  margin-left: auto;
`;

export const Button = styled.TouchableOpacity`
  background: rgba(232, 63, 91, 0.1);
  border-radius: 5px;
  padding: 12px;
  margin-bottom: 5px;
`;
