import React from 'react';
import { Input, InputProps } from 'antd';

interface CustomInputProps extends InputProps {
  variant?: string;
}

const SVFilledInput: React.FC<CustomInputProps> = ({ variant, ...rest }) => {
  // You can use the variant prop here to apply custom styling if needed
  const className = variant === 'filled' ? 'filled-input' : '';
  
  return <Input className={className} {...rest} />;
};

export default SVFilledInput;