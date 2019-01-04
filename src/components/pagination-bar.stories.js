import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PaginationBar from './pagination-bar';

storiesOf('PaginationBar', module)
  .add('default', () => <PaginationBar pageCount={10} currentPage={2} onPageClick={action('onPageClick') } />)
  .add('on first page', () => <PaginationBar pageCount={10} currentPage={0} onPageClick={action('onPageClick') } />)
  .add('on last page', () => <PaginationBar pageCount={10} currentPage={9} onPageClick={action('onPageClick') } />)
  .add('without any pages', () => <PaginationBar pageCount={0} currentPage={0} onPageClick={action('onPageClick') } />);