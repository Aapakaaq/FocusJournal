import { render } from '@testing-library/react';
import RecentEntriesComponent from '../components/RecentEntries/RecentEntriesComponent';
import { RecentEntriesContext } from '../contexts/RecentEntriesContext';
import { FixedSizedQueue } from '../types/FixedSizeQueue';
import { Int } from '../types/Int';

describe('RecentEntriesComponent', () => {

  let recentEntries: FixedSizedQueue<string>;

  beforeEach(() =>{
    recentEntries = new FixedSizedQueue<string>(2 as Int)
  });

  it('renders entries without trimming', () => {

    // Arrange
    function getRecentEntries() {return ['foo', 'bar']}

    // Act
    const { container } = render(
      <RecentEntriesContext.Provider value={{recentEntries, getRecentEntries}}>
        <RecentEntriesComponent  />
      </RecentEntriesContext.Provider>
    );

    const entries = container.querySelectorAll('.recent-entry');

    // Assert - adding space due to querySelectorAll
    expect(entries).toHaveLength(2);
    expect(entries[0].textContent).toBe(' foo');
    expect(entries[1].textContent).toBe(' bar');
  });

  it('renders entries with trimming based on window width', () => {

    // Arrange
    const originalInnerWidth = window.innerWidth;
    window.innerWidth = 320;

    const randomEntry = generateRandomString(26);
    function getRecentEntries() {return [randomEntry]}

    // Act
    const { container } = render(
          <RecentEntriesContext.Provider value={{recentEntries, getRecentEntries}}>
              <RecentEntriesComponent  />
          </RecentEntriesContext.Provider>
    );

    const entries = container.querySelectorAll('.recent-entry');

    // Assert
    expect(entries).toHaveLength(1);
    expect(entries[0].textContent).toContain('...');
    expect(entries[0].textContent?.length === 28)

    // Resetting window.innerWidth to its original value
    window.innerWidth = originalInnerWidth;
  });
});

function generateRandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }
  return result;
}
