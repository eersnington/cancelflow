import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

const Page = (props: Props) => {
  //CHALLENGE: If the user tries to access this route you should send them to their first workflow they have or create one or you can have your own behavior.

  redirect('/workflows/')
  return <div>Page</div>
}

export default Page
