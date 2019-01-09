import { configure, addDecorator } from '@storybook/react';
import StoryRouter from 'storybook-react-router';

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}


addDecorator(StoryRouter());
configure(loadStories, module);
