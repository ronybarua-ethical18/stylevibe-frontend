// antdCustomTheme.ts

import { ThemeConfig } from 'antd';

const customTheme: ThemeConfig = {
  token: {
    colorPrimary: '#1890ff',
    borderRadius: 4,
    // Add more global token overrides here
  },
  components: {
    Button: {
      colorPrimary: '#1890ff',
      algorithm: true, // Enable algorithm
    },
    // Input: {
    //   colorBgContainer: '#f5f5f5',
    //   hoverBorderColor: '#40a9ff',
    //   activeBorderColor: '#1890ff',
    // },
    Select: {
      colorBgContainer: '#f5f5f5',
      // Add more Select customizations
    },
    Table: {
      headerBg: '#fafafa',
      // Add more Table customizations
    },
    // Add more component-specific customizations
  },
};

// You can also define custom styles that are not part of Ant Design's theme system
const customStyles = {
  filledInput: {
    backgroundColor: '#f5f5f5',
    '&:hover, &:focus': {
      backgroundColor: '#fafafa',
    },
  },
  // Add more custom styles here
};

export { customTheme, customStyles };