import { storiesOf } from '@storybook/react';
import faker from 'faker';
import Fuse from 'fuse.js';
import React from 'react';
import Search from '../../src/Input/SearchField/SearchField';
import data from './data.json';

storiesOf('Input/SearchField', module)
.add('football data', () => {

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
})
.add('faker data', () => {

  interface PersonData {
      name: string;
  }

  const persons: PersonData[] = [];

  for (let i = 0; i < 1000; i++) {
    persons.push({
      name: faker.name.firstName() +  ' ' + faker.name.lastName()
    });
  }
  const PersonSearchField = () => {
    const [result, setResult] = React.useState<string[]>([]);

    const options: Fuse.FuseOptions<PersonData> = {
        threshold: 0.1,
        keys: ['name'],
      };
    const fuse = new Fuse(persons, options);

    const searchHandler = (value: string, search: boolean = true) => {
        if (value.length > 2 && search) {
          const results = fuse.search(value);
          setResult(results.map((item) => item.name));
        } else {
          setResult([]);
        }

    };
    return (<Search result={result} onChange={searchHandler} />);
  };

  return (
    <div>
      <PersonSearchField />
    </div>
  );
});
