'use client';

import { useState } from 'react';
import { ColorSelector } from '@/components/ColorSelector';

export default function Page() {
  const [selected, setSelected] = useState<
    { hex: string; name: string }[]
  >([]);

  return (
    <div className="p-8 space-y-4">
      <ColorSelector
        selectedColors={selected}
        onSelect={(colors) => {
          setSelected(colors);
          console.log('Selected Colors:', colors);
        }}
        multiple={true} // or false for single
      />

      <ul className="text-sm">
        {selected.map((c) => (
          <li key={c.hex}>
            {c.name}: <span className="font-mono">{c.hex}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
