import { GuestDraftSection } from '@/components/guest-draft-section';
import { ConfirmedGuestsTable } from '@/components/confirmed-guests-table';

export default function Home() {
  return (
    <main className="w-full min-h-screen overflow-hidden">
      <GuestDraftSection />
      <ConfirmedGuestsTable />
    </main>
  );
}
