import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { SupportListPage } from './support-list-page';
import { SupportListSummary } from './support-list-summary';
import {
  SUPPORT_LIST_FEATURE,
  SUPPORT_LIST_ROUTE,
} from './support-list.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[SUPPORT_LIST_ROUTE]}>
      <SupportListPage />
    </MemoryRouter>,
  );
}

describe('SupportListPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(screen.getByTestId(SUPPORT_LIST_FEATURE.testId)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      SUPPORT_LIST_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${SUPPORT_LIST_FEATURE.testId}-row`),
    ).toHaveLength(SUPPORT_LIST_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${SUPPORT_LIST_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${SUPPORT_LIST_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(screen.getByTestId(`${SUPPORT_LIST_FEATURE.testId}-clear`));
    expect(
      screen.queryByTestId(`${SUPPORT_LIST_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${SUPPORT_LIST_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${SUPPORT_LIST_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('SupportListSummary', () => {
  it('renders the summary block', () => {
    render(<SupportListSummary />);
    expect(
      screen.getByTestId(`${SUPPORT_LIST_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
