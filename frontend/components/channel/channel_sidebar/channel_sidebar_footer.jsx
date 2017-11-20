import React from 'react';

const ChannelSidebarFooter = () => (
  <div className="sidebar-footer">
    <div className="sidebar-footer-text">
      Hanhee Song
      <br />
      song.hanhee@gmail.com
    </div>
    <div className="sidebar-footer-icons">
      <a href="https://hanhee-song.com" target="_blank"><i className="fa fa-home" aria-hidden="true"></i></a>
      <a href="https://github.com/hanhee-song/slic" target="_blank"><i className="fa fa-github" aria-hidden="true"></i></a>
      <a href="https://www.linkedin.com/in/hanhee-song" target="_blank"><i className="fa fa-linkedin" aria-hidden="true"></i></a>
      <a href="mailto:song.hanhee@gmail.com" className="fa fa-envelope-o"></a>
    </div>
  </div>
);

export default ChannelSidebarFooter;
