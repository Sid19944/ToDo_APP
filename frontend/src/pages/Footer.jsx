import React from "react";
import CopyrightIcon from '@mui/icons-material/Copyright';

function Footer() {
  return (
    <div className="w-full bg-gray-900 flex items-center flex-col py-2 gap-1 text-lg mt-4">
      <span><CopyrightIcon/>2026 Daily Plain, All rights reserved</span>
      <span>Privacy Policy</span>
      <span>Terms Of Service</span>
      <span>Contact Us : sidsarkar2112@gmail.com , 6399551071</span>
    </div>
  );
}

export default Footer;
