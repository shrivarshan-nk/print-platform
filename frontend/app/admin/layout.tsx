'use client';

import { AdminLayout } from '@/shared/components';

export default function AdminLayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}
