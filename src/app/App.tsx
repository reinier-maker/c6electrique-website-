import { RouterProvider } from 'react-router';
import { router } from './routes';
import { LanguageProvider } from './lib/useLanguage';

export default function App() {
  return (
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  );
}
