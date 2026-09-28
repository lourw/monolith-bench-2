import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ProfileOverviewPage } from './profile-overview-page';
import { ProfileOverviewSummary } from './profile-overview-summary';
import {
  PROFILE_OVERVIEW_FEATURE,
  PROFILE_OVERVIEW_ROUTE,
} from './profile-overview.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[PROFILE_OVERVIEW_ROUTE]}>
      <ProfileOverviewPage />
    </MemoryRouter>,
  );
}

describe('ProfileOverviewPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(PROFILE_OVERVIEW_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      PROFILE_OVERVIEW_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${PROFILE_OVERVIEW_FEATURE.testId}-row`),
    ).toHaveLength(PROFILE_OVERVIEW_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${PROFILE_OVERVIEW_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${PROFILE_OVERVIEW_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${PROFILE_OVERVIEW_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${PROFILE_OVERVIEW_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${PROFILE_OVERVIEW_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${PROFILE_OVERVIEW_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('ProfileOverviewSummary', () => {
  it('renders the summary block', () => {
    render(<ProfileOverviewSummary />);
    expect(
      screen.getByTestId(`${PROFILE_OVERVIEW_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
