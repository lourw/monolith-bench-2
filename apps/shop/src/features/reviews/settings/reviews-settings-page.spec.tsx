import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ReviewsSettingsPage } from './reviews-settings-page';
import { ReviewsSettingsSummary } from './reviews-settings-summary';
import {
  REVIEWS_SETTINGS_FEATURE,
  REVIEWS_SETTINGS_ROUTE,
} from './reviews-settings.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[REVIEWS_SETTINGS_ROUTE]}>
      <ReviewsSettingsPage />
    </MemoryRouter>,
  );
}

describe('ReviewsSettingsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(REVIEWS_SETTINGS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      REVIEWS_SETTINGS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${REVIEWS_SETTINGS_FEATURE.testId}-row`),
    ).toHaveLength(REVIEWS_SETTINGS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${REVIEWS_SETTINGS_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${REVIEWS_SETTINGS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${REVIEWS_SETTINGS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${REVIEWS_SETTINGS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${REVIEWS_SETTINGS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${REVIEWS_SETTINGS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('ReviewsSettingsSummary', () => {
  it('renders the summary block', () => {
    render(<ReviewsSettingsSummary />);
    expect(
      screen.getByTestId(`${REVIEWS_SETTINGS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
