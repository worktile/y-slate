import { toSlateDoc } from '../src';
import { toSlateTheme } from '../src/utils';
import { TestEditor, createTestEditor } from './test-editor';
import { Test, initialState, wait } from './utils';

const tests: Test[] = [
  {
    name: 'Set the value of theme to light',
    transform: TestEditor.makeSetTheme({
      themeColorMode: 'light'
    })
  }
];

const runThemeTest = async (ti: Test, tj: Test) => {
  const theme = {
    themeColorMode: 'default'
  };
  // Create two editors.
  const ei = createTestEditor(theme);
  const ej = createTestEditor(theme);
  await wait();

  TestEditor.applyTransform(
    ei,
    tj.transform
  );
  await wait();

  let updates = TestEditor.getCapturedYjsUpdates(ei);
  TestEditor.applyYjsUpdatesToYjs(ej, updates);
  await wait();

  // Verify initial states match.
  expect(ei.theme).toEqual(ej.theme);
  expect(toSlateDoc(ei.sharedDoc)).toEqual(toSlateDoc(ej.sharedDoc));
  expect(toSlateTheme(ei.sharedTheme!)).toEqual(toSlateTheme(ej.sharedTheme!));


  TestEditor.applyTransform(ei, TestEditor.makeInsertNodes(initialState, [0]));
  await wait();

  updates = TestEditor.getCapturedYjsUpdates(ei);
  TestEditor.applyYjsUpdatesToYjs(ej, updates);
  await wait();

  expect(ei.children).toEqual(ej.children);
  expect(toSlateDoc(ei.sharedDoc)).toEqual(toSlateDoc(ej.sharedDoc));
  expect(toSlateTheme(ei.sharedTheme!)).toEqual(toSlateTheme(ej.sharedTheme!));
};

describe('sync theme when set', () => {
  tests.forEach((test) => {
    describe(`Test:${test.name}`, () => {
      tests.forEach((concurrentTest) => {
        it(`Concurrent:${concurrentTest.name}`, async () => {
          await runThemeTest(test, concurrentTest);
        });
      });
    });
  });
});
