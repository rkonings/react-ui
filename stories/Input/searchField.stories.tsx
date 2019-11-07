import { storiesOf } from '@storybook/react';
import Fuse from 'fuse.js';
import React from 'react';
import Search from '../../src/Input/SearchField/SearchField';

storiesOf('Input/SearchField', module)
.add('default', () => {
    interface SimpleBook {
      title: string;
      author: {
          firstName: string;
          lastName: string;
      };
      tags: string[];
  }

  const books: SimpleBook[] = [{
    title: 'Old Man\'s War',
    author: {
      firstName: 'John',
      lastName: 'Scalzi'
    },
    tags: ['fiction']
  }, {
    title: 'The Lock Artist',
    author: {
      firstName: 'Steve',
      lastName: 'Hamilton'
    },
    tags: ['thriller']
  }];

  const BookSearchField = () => {
    const [result, setResult] = React.useState<string[]>([]);

    const options: Fuse.FuseOptions<SimpleBook> = {
        keys: ['author', 'tags', 'title'],
      };
    const fuse = new Fuse(books, options);

    const searchHandler = (value: string) => {
        const results = fuse.search(value);
        setResult(results.map((item) => item.title));

    };
    return (<Search result={result} onChange={searchHandler} />);
  };

  return (
    <BookSearchField />
  );
});
