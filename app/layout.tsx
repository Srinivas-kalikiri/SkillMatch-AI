import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SkillMatch AI',
  description: 'Compare a resume against a job description using AI.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
