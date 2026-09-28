import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { TrackingEditorPage } from './tracking-editor-page';
import { TrackingEditorSummary } from './tracking-editor-summary';
import {
  TRACKING_EDITOR_FEATURE,
  TRACKING_EDITOR_ROUTE,
} from './tracking-editor.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[TRACKING_EDITOR_ROUTE]}>
      <TrackingEditorPage />
    </MemoryRouter>,
  );
}

describe('TrackingEditorPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(TRACKING_EDITOR_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      TRACKING_EDITOR_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${TRACKING_EDITOR_FEATURE.testId}-row`),
    ).toHaveLength(TRACKING_EDITOR_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${TRACKING_EDITOR_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${TRACKING_EDITOR_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${TRACKING_EDITOR_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${TRACKING_EDITOR_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${TRACKING_EDITOR_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${TRACKING_EDITOR_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('TrackingEditorSummary', () => {
  it('renders the summary block', () => {
    render(<TrackingEditorSummary />);
    expect(
      screen.getByTestId(`${TRACKING_EDITOR_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
