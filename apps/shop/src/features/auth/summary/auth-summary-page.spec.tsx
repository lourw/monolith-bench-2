import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AuthSummaryPage } from './auth-summary-page';
import { AuthSummarySummary } from './auth-summary-summary';
import {
  AUTH_SUMMARY_FEATURE,
  AUTH_SUMMARY_ROUTE,
} from './auth-summary.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[AUTH_SUMMARY_ROUTE]}>
      <AuthSummaryPage />
    </MemoryRouter>,
  );
}

describe('AuthSummaryPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(screen.getByTestId(AUTH_SUMMARY_FEATURE.testId)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      AUTH_SUMMARY_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${AUTH_SUMMARY_FEATURE.testId}-row`),
    ).toHaveLength(AUTH_SUMMARY_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${AUTH_SUMMARY_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${AUTH_SUMMARY_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(screen.getByTestId(`${AUTH_SUMMARY_FEATURE.testId}-clear`));
    expect(
      screen.queryByTestId(`${AUTH_SUMMARY_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${AUTH_SUMMARY_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${AUTH_SUMMARY_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('AuthSummarySummary', () => {
  it('renders the summary block', () => {
    render(<AuthSummarySummary />);
    expect(
      screen.getByTestId(`${AUTH_SUMMARY_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
