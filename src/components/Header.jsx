import React from 'react';

function Header() {
  const headerText = "SortViz"; 
  return (
    <header>
      <h1 className="shining-blade-text" data-text={headerText}>
        {headerText}
      </h1>
    </header>
  );
}

export default Header;