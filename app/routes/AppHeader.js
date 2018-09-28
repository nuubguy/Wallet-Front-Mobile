import React from 'react';
import {
  Header, Left, Icon, Title, Right,
} from 'native-base';

const AppHeader = props => (
  <Header style={{backgroundColor: '#0fb9b1'}}>
    <Left>
      <Icon
        id="imageHeader"
        name="menu"
        style={{ fontSize: 24 }}
        onPress={() => props.data.navigation.openDrawer()}
      />
    </Left>
    <Right>
      <Title style={{color: '#fff'}} id="titleHeader">{props.title}</Title>
            />
    </Right>
  </Header>
);
export default AppHeader;
