'use client';

// Adapted for MDX from https://www.fluidfunctionalism.com/r/table.json.

import { AnimatePresence, motion } from 'framer-motion';
import {
  createContext,
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
  type TableHTMLAttributes,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { cn } from '@/lib/utils';
import { spring } from '@/lib/motion';

interface RowRect {
  height: number;
  left: number;
  top: number;
  width: number;
}

interface TableContextValue {
  activeIndex: number | null;
  registerRow: (index: number, element: HTMLTableRowElement | null) => void;
}

const TableContext = createContext<TableContextValue | null>(null);

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  children?: ReactNode;
}

const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ children, className, ...props }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const frameRef = useRef<number | null>(null);
    const mountedRef = useRef(false);
    const rowsRef = useRef(new Map<number, HTMLTableRowElement>());
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [rowRects, setRowRects] = useState<RowRect[]>([]);

    const measureRows = useCallback(() => {
      if (!mountedRef.current) return;
      const container = containerRef.current;
      if (!container) return;

      const rects: RowRect[] = [];
      rowsRef.current.forEach((row, index) => {
        rects[index] = {
          height: row.offsetHeight,
          left: row.offsetLeft,
          top: row.offsetTop,
          width: row.offsetWidth,
        };
      });
      setRowRects(rects);
    }, []);

    const scheduleMeasurement = useCallback(() => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => {
        frameRef.current = null;
        measureRows();
      });
    }, [measureRows]);

    const registerRow = useCallback(
      (index: number, element: HTMLTableRowElement | null) => {
        if (element) rowsRef.current.set(index, element);
        else rowsRef.current.delete(index);
        scheduleMeasurement();
      },
      [scheduleMeasurement],
    );

    useEffect(() => {
      mountedRef.current = true;
      measureRows();
      const container = containerRef.current;
      if (!container || typeof ResizeObserver === 'undefined') {
        return () => {
          mountedRef.current = false;
        };
      }
      const observer = new ResizeObserver(measureRows);
      observer.observe(container);
      return () => {
        mountedRef.current = false;
        observer.disconnect();
        if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      };
    }, [children, measureRows]);

    const contextValue = useMemo(
      () => ({ activeIndex, registerRow }),
      [activeIndex, registerRow],
    );
    const activeRect = activeIndex === null ? null : rowRects[activeIndex];

    return (
      <TableContext.Provider value={contextValue}>
        <div
          ref={containerRef}
          className="relative min-w-max"
          onMouseMove={(event) => {
            const container = containerRef.current;
            if (!container) return;
            const containerTop = container.getBoundingClientRect().top;
            const pointerY = event.clientY - containerTop + container.scrollTop;
            let nearestIndex: number | null = null;
            let nearestDistance = Number.POSITIVE_INFINITY;

            rowRects.forEach((rect, index) => {
              if (!rect) return;
              const distance = Math.abs(pointerY - (rect.top + rect.height / 2));
              if (distance < nearestDistance) {
                nearestDistance = distance;
                nearestIndex = index;
              }
            });
            setActiveIndex(nearestIndex);
          }}
          onMouseLeave={() => setActiveIndex(null)}
        >
          <AnimatePresence>
            {activeRect ? (
              <motion.div
                className="pointer-events-none absolute z-0 bg-muted"
                initial={{ opacity: 0, ...activeRect }}
                animate={{ opacity: 1, ...activeRect }}
                exit={{ opacity: 0, transition: spring.fast.exit }}
                transition={spring.fast}
              />
            ) : null}
          </AnimatePresence>
          <table
            ref={ref}
            className={cn('relative z-10 w-full border-collapse text-[13px]', className)}
            {...props}
          >
            {children}
          </table>
        </div>
      </TableContext.Provider>
    );
  },
);
Table.displayName = 'Table';

const TableHeader = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => <thead ref={ref} className={className} {...props} />);
TableHeader.displayName = 'TableHeader';

const TableBody = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => <tbody ref={ref} className={className} {...props} />);
TableBody.displayName = 'TableBody';

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  index?: number;
}

const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ index, className, ...props }, forwardedRef) => {
    const internalRef = useRef<HTMLTableRowElement>(null);
    const context = useContext(TableContext);
    const registerRow = context?.registerRow;

    useEffect(() => {
      if (index === undefined || !registerRow) return;
      registerRow(index, internalRef.current);
      return () => registerRow(index, null);
    }, [index, registerRow]);

    return (
      <tr
        ref={(node) => {
          internalRef.current = node;
          if (typeof forwardedRef === 'function') forwardedRef(node);
          else if (forwardedRef) forwardedRef.current = node;
        }}
        className={cn(
          'relative z-10 border-b border-border transition-colors duration-[80ms]',
          className,
        )}
        {...props}
      />
    );
  },
);
TableRow.displayName = 'TableRow';

const TableHead = forwardRef<
  HTMLTableCellElement,
  ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn('bg-transparent px-3 py-2 text-left font-semibold text-foreground', className)}
    {...props}
  />
));
TableHead.displayName = 'TableHead';

const TableCell = forwardRef<
  HTMLTableCellElement,
  TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn('bg-transparent px-3 py-2 text-muted-foreground', className)}
    {...props}
  />
));
TableCell.displayName = 'TableCell';

export { Table, TableBody, TableCell, TableHead, TableHeader, TableRow };
