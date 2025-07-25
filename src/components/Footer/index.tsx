import {SmileTwoTone} from '@ant-design/icons';
import {DefaultFooter} from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright="dev by liuxianmeng"
      links={[
        {
          key: 'Blog',
          title: <SmileTwoTone/>,
          href: 'https://blog.bigbigmeng.online/',
          blankTarget: true,
        },
        {
          key: 'Here Am I',
          title: 'I‘m Here',
          href: 'https://blog.bigbigmeng.online',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
