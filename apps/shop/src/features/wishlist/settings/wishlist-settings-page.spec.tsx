import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { WishlistSettingsPage } from './wishlist-settings-page';
import { WishlistSettingsSummary } from './wishlist-settings-summary';
import {
  WISHLIST_SETTINGS_FEATURE,
  WISHLIST_SETTINGS_ROUTE,
} from './wishlist-settings.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[WISHLIST_SETTINGS_ROUTE]}>
      <WishlistSettingsPage />
    </MemoryRouter>,
  );
}

describe('WishlistSettingsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(WISHLIST_SETTINGS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      WISHLIST_SETTINGS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${WISHLIST_SETTINGS_FEATURE.testId}-row`),
    ).toHaveLength(WISHLIST_SETTINGS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${WISHLIST_SETTINGS_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${WISHLIST_SETTINGS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${WISHLIST_SETTINGS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${WISHLIST_SETTINGS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${WISHLIST_SETTINGS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${WISHLIST_SETTINGS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('WishlistSettingsSummary', () => {
  it('renders the summary block', () => {
    render(<WishlistSettingsSummary />);
    expect(
      screen.getByTestId(`${WISHLIST_SETTINGS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
