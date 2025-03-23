import { DrawerDialogDemo } from './features/home/DrawerSample';
import { ReactHookForm } from './features/home/ReactHookForm';
import { SheetSample } from './features/home/SheetSample';

export default function Home() {
  return (
    <div className="grid min-h-screen items-center justify-items-center gap-3 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <div className="space-x-8">
        <DrawerDialogDemo />

        <SheetSample />
      </div>

      <ReactHookForm />
    </div>
  );
}
