import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import SliderMonitor from 'redux-slider-monitor';

export default createDevTools(
  <DockMonitor
    defaultIsVisible={false}
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-q"
    changeMonitorKey="ctrl-m"
    defaultPosition="right">
    <LogMonitor theme="nicinabox" />
    <SliderMonitor keyboardEnabled={true} />
  </DockMonitor>
);
