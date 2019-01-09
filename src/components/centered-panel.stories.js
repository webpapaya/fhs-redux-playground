import React from 'react';
import { storiesOf } from '@storybook/react';
import CenteredPanel from './centered-panel';

storiesOf('CenteredPanel', module)
  .add('default', () => <CenteredPanel>I'm some content</CenteredPanel>)
  