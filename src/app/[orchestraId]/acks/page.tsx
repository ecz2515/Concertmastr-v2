"use client";

import dynamic from 'next/dynamic';
import DefaultAcknowledgment from '@/app/defaults/acks';
import { useParams } from 'next/navigation';

const acknowledgments: { [key: string]: React.ComponentType } = {
  cso: dynamic(() => import('@/components/acks/cso')),
  hkphil: dynamic(() => import('@/components/acks/hkphil')),
};

export default function OrchestraAcknowledgmentPage() {
  const params = useParams();
  const orchestraId = Array.isArray(params.orchestraId) ? params.orchestraId[0] : params.orchestraId;
  const AcknowledgmentComponent = orchestraId ? acknowledgments[orchestraId] || DefaultAcknowledgment : DefaultAcknowledgment;

  return (
    <AcknowledgmentComponent />
  );
}
