import React from 'react';
import { storiesOf } from '@storybook/react';
import { Tabs, Tab } from './tabs';

storiesOf('Tabs', module)
	.add('default', () => (
        <Tabs>
            <Tab title="Tab 1">Tab 1</Tab>
            <Tab title="Tab 2">Tab 2</Tab>
        </Tabs>
    ));
