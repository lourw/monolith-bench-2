import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AnalyticsEditorPage } from './analytics-editor-page';
import { AnalyticsEditorSummary } from './analytics-editor-summary';
import {
  ANALYTICS_EDITOR_FEATURE,
  ANALYTICS_EDITOR_ROUTE,
} from './analytics-editor.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[ANALYTICS_EDITOR_ROUTE]}>
      <AnalyticsEditorPage />
    </MemoryRouter>,
  );
}

describe('AnalyticsEditorPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(ANALYTICS_EDITOR_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      ANALYTICS_EDITOR_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${ANALYTICS_EDITOR_FEATURE.testId}-row`),
    ).toHaveLength(ANALYTICS_EDITOR_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${ANALYTICS_EDITOR_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${ANALYTICS_EDITOR_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${ANALYTICS_EDITOR_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${ANALYTICS_EDITOR_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${ANALYTICS_EDITOR_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${ANALYTICS_EDITOR_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('AnalyticsEditorSummary', () => {
  it('renders the summary block', () => {
    render(<AnalyticsEditorSummary />);
    expect(
      screen.getByTestId(`${ANALYTICS_EDITOR_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
