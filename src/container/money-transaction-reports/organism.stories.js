import React from 'react';
import { storiesOf } from '@storybook/react';
import Organism from './organism'

storiesOf('MoneyTransactionReports', module)
  .add('positive', () => (
    <Organism 
      totalBalance={ Math.random() * 100 } 
      debitAmount={ Math.random() * 100 }
      creditAmount={ Math.random() * 100 }
    />
  ))
  .add('negative', () => (
    <Organism 
      totalBalance={ Math.random() * -100 } 
      debitAmount={ Math.random() * 100 }
      creditAmount={ Math.random() * 100 }
    />
  ));