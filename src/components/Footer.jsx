import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <p>&copy; {currentYear} Madhav  Jha. All rights reserved by John von Neumann/Tony Hoare :).</p>
    </footer>
  );
}

export default Footer;