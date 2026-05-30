import { Suspense } from 'react'
import { projects } from '@/lib/data'
import ProjectFeedClient from './ProjectFeedClient'

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div style={{ background: '#000', height: '100dvh' }} />}>
      <ProjectFeedClient projects={projects} />
    </Suspense>
  )
}
