import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ProfileHistoryPage } from './profile-history-page';
import { ProfileHistorySummary } from './profile-history-summary';
import {
  PROFILE_HISTORY_FEATURE,
  PROFILE_HISTORY_ROUTE,
} from './profile-history.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[PROFILE_HISTORY_ROUTE]}>
      <ProfileHistoryPage />
    </MemoryRouter>,
  );
}

describe('ProfileHistoryPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(PROFILE_HISTORY_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      PROFILE_HISTORY_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${PROFILE_HISTORY_FEATURE.testId}-row`),
    ).toHaveLength(PROFILE_HISTORY_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${PROFILE_HISTORY_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${PROFILE_HISTORY_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${PROFILE_HISTORY_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${PROFILE_HISTORY_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${PROFILE_HISTORY_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${PROFILE_HISTORY_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('ProfileHistorySummary', () => {
  it('renders the summary block', () => {
    render(<ProfileHistorySummary />);
    expect(
      screen.getByTestId(`${PROFILE_HISTORY_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
