import React, { useState, FC } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

interface BasicMenuProps {
  selectFridge: (fridgeName: string) => void
}

const BasicMenu: FC<BasicMenuProps> = ({ selectFridge}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button color='inherit' onClick={handleClick}>
        My Fridges
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => selectFridge('olaf')}>olaf</MenuItem>
        <MenuItem onClick={() => selectFridge('carrot')}>carrot</MenuItem>
        <MenuItem onClick={() => selectFridge('friend')}>friend</MenuItem>
        <MenuItem onClick={() => alert('hello')}>hello</MenuItem>
      </Menu>
    </div>
  );
};

export default BasicMenu;
