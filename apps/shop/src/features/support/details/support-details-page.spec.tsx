import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { SupportDetailsPage } from './support-details-page';
import { SupportDetailsSummary } from './support-details-summary';
import {
  SUPPORT_DETAILS_FEATURE,
  SUPPORT_DETAILS_ROUTE,
} from './support-details.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[SUPPORT_DETAILS_ROUTE]}>
      <SupportDetailsPage />
    </MemoryRouter>,
  );
}

describe('SupportDetailsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(SUPPORT_DETAILS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      SUPPORT_DETAILS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${SUPPORT_DETAILS_FEATURE.testId}-row`),
    ).toHaveLength(SUPPORT_DETAILS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${SUPPORT_DETAILS_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${SUPPORT_DETAILS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${SUPPORT_DETAILS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${SUPPORT_DETAILS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${SUPPORT_DETAILS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${SUPPORT_DETAILS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('SupportDetailsSummary', () => {
  it('renders the summary block', () => {
    render(<SupportDetailsSummary />);
    expect(
      screen.getByTestId(`${SUPPORT_DETAILS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
