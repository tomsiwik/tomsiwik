import { MinusIcon, PlusIcon } from 'lucide-react';
import { useState } from 'react';

export default function InteractiveExample({ initialCount = 0 }: { initialCount?: number }) {
  const [count, setCount] = useState(initialCount);

  return (
    <div className="not-prose my-6 rounded-xl border bg-card p-6 shadow-xs">
      <p className="text-sm font-medium">This component was loaded as a separate JavaScript chunk.</p>
      <div className="mt-4 flex items-center gap-4">
        <button type="button" aria-label="Decrease count" className="grid size-9 place-items-center rounded-[4px] border hover:bg-muted" onClick={() => setCount((value) => value - 1)}>
          <MinusIcon className="size-4" />
        </button>
        <output className="min-w-8 text-center text-2xl font-semibold" aria-live="polite">{count}</output>
        <button type="button" aria-label="Increase count" className="grid size-9 place-items-center rounded-[4px] border hover:bg-muted" onClick={() => setCount((value) => value + 1)}>
          <PlusIcon className="size-4" />
        </button>
      </div>
    </div>
  );
}
