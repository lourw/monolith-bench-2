import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ProfileInsightsPage } from './profile-insights-page';
import { ProfileInsightsSummary } from './profile-insights-summary';
import {
  PROFILE_INSIGHTS_FEATURE,
  PROFILE_INSIGHTS_ROUTE,
} from './profile-insights.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[PROFILE_INSIGHTS_ROUTE]}>
      <ProfileInsightsPage />
    </MemoryRouter>,
  );
}

describe('ProfileInsightsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(PROFILE_INSIGHTS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      PROFILE_INSIGHTS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${PROFILE_INSIGHTS_FEATURE.testId}-row`),
    ).toHaveLength(PROFILE_INSIGHTS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${PROFILE_INSIGHTS_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${PROFILE_INSIGHTS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${PROFILE_INSIGHTS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${PROFILE_INSIGHTS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${PROFILE_INSIGHTS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${PROFILE_INSIGHTS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('ProfileInsightsSummary', () => {
  it('renders the summary block', () => {
    render(<ProfileInsightsSummary />);
    expect(
      screen.getByTestId(`${PROFILE_INSIGHTS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
