import { ConnectionsProvider } from '@/providers/connections-provider'
import EditorProvider from '@/providers/editor-provider'
import React from 'react'
import EditorCanvas from './_components/editor-canvas'
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from 'next/navigation'

type Props = {}

const Page = (props: Props) => {

  const { userId } = auth();

  if (userId) {
    console.log('userId', userId);
  }

  console.log(props);

  return (
    <div className="h-full">

      <EditorProvider>
        <ConnectionsProvider>
          <EditorCanvas />
        </ConnectionsProvider>
      </EditorProvider>
    </div>
  )
}

export default Page
