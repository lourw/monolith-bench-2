import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ProfileSummaryPage } from './profile-summary-page';
import { ProfileSummarySummary } from './profile-summary-summary';
import {
  PROFILE_SUMMARY_FEATURE,
  PROFILE_SUMMARY_ROUTE,
} from './profile-summary.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[PROFILE_SUMMARY_ROUTE]}>
      <ProfileSummaryPage />
    </MemoryRouter>,
  );
}

describe('ProfileSummaryPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(PROFILE_SUMMARY_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      PROFILE_SUMMARY_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${PROFILE_SUMMARY_FEATURE.testId}-row`),
    ).toHaveLength(PROFILE_SUMMARY_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${PROFILE_SUMMARY_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${PROFILE_SUMMARY_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${PROFILE_SUMMARY_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${PROFILE_SUMMARY_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${PROFILE_SUMMARY_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${PROFILE_SUMMARY_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('ProfileSummarySummary', () => {
  it('renders the summary block', () => {
    render(<ProfileSummarySummary />);
    expect(
      screen.getByTestId(`${PROFILE_SUMMARY_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
