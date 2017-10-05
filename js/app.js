import React from 'react';
import ReactDOM from 'react-dom';

import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

const mountNode = document.getElementById('root');

ReactDOM.render(<Layout>
  <Sider
    breakpoint="lg"
    collapsedWidth="0"
    onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
  >
    <div className="logo" />
  </Sider>
</Layout>, mountNode);
