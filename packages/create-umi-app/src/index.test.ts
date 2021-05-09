import { join } from 'path';
import { rimraf } from '@umijs/utils';
import { existsSync } from 'fs';
import runGenerator from './index';

const fixtures = join(__dirname, 'fixtures');
const cwd = join(fixtures, 'generate');

test('generate app', async () => {
  await runGenerator({
    cwd,
    args: {
      _: [],
      $0: '',
    },
  });
  expect(existsSync(join(cwd, 'src', 'pages', 'index.tsx'))).toEqual(true);
  rimraf.sync(cwd);
});

test('generate example app', async () => {
  const exampleName = 'example';
  await runGenerator({
    cwd: fixtures,
    args: {
      _: [exampleName],
      example: 'normal',
      $0: '',
    },
  });
  const target = join(fixtures, exampleName, 'pages', 'index.tsx');
  expect(existsSync(target)).toEqual(true);
  rimraf.sync(join(fixtures, exampleName));
});
