import { storiesOf } from '@storybook/react';
import Fuse from 'fuse.js';
import React from 'react';
import Search from '../../src/Input/SearchField/SearchField';
import data from './data.json';

storiesOf('Input/SearchField', module)
.add('default', () => {

  interface Item {
      name: string;
      code: string | null;
  }

  const BookSearchField = () => {
    const [result, setResult] = React.useState<string[]>([]);

    const options: Fuse.FuseOptions<Item> = {
        maxPatternLength: 32,
        minMatchCharLength: 3,
        threshold: 0.2,
        keys: ['name', 'code'],
      };
    const fuse = new Fuse(data.clubs, options);

    const searchHandler = (value: string) => {
        const results = fuse.search(value);
        setResult(results.map((item) => item.name));

    };
    return (<Search result={result} onChange={searchHandler} />);
  };

  return (
    <BookSearchField />
  );
});
