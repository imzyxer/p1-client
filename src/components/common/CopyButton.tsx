import React, { FC, useState } from 'react';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
// import { SxProps, Theme } from '@mui/material/styles';

type TProps = {
  copyText: string;
} & IconButtonProps;

function fallbackCopyTextToClipboard(text: string) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';
  textArea.style.width = '2em';
  textArea.style.height = '2em';
  textArea.style.padding = '0';
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';
  textArea.style.background = 'transparent';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  let result;
  try {
    const successful = document.execCommand('copy');
    if (successful) {
      result = Promise.resolve();
    } else {
      result = Promise.reject();
    }
  } catch (err) {
    result = Promise.reject(err);
  }

  document.body.removeChild(textArea);
  return result;
}

function copyTextToClipboard(text: string) {
  if ('clipboard' in navigator) {
    return navigator.clipboard.writeText(text);
  }

  return fallbackCopyTextToClipboard(text);
}

const CopyButton: FC<TProps> = ({ copyText, ...props }) => {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopyClick = () => {
    copyTextToClipboard(copyText).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    });
  };
  return (
    <IconButton color={isCopied ? 'primary' : 'default'} aria-label="copy" onClick={handleCopyClick} {...props}>
      <ContentCopyIcon fontSize="inherit" />
    </IconButton>
  );
};

export default CopyButton;
