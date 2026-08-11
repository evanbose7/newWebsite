'use client';

import React from 'react';
import { ScrollPaperTearOverlay } from '../components/ScrollPaperTearOverlay';

export default function HomePage() {
  return (
    <main className="w-full min-h-screen bg-black">
      <ScrollPaperTearOverlay />
    </main>
  );
}
