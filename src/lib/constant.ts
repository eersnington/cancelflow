import Templates from '@/components/icons/cloud_download'
import Home from '@/components/icons/home'
import Payment from '@/components/icons/payment'
import Settings from '@/components/icons/settings'
import Workflows from '@/components/icons/workflows'
import { Connection } from './types'

export const clients = [...new Array(10)].map((client, index) => ({
  href: `/${index + 1}.png`,
}))

export const pricingDetails = [
  {
    name: "Starter",
    price: "Free",
    isHighlighted: false,
    features: [
      "Worflows: 1",
      "50 form submissions",
      "Customizable Workflows",
      "Automated Actions",
      "Analytics Dashboard "
    ]
  },
  {
    name: "Plus",
    price: "$29/month",
    isHighlighted: true,
    features: [
      "Workflows: Up to 10",
      "Unlimited form entries",
      "Customizable Workflows",
      "Automated Actions",
      "Analytics Dashboard"
    ]
  },
  {
    name: "Business",
    price: "$49/month",
    isHighlighted: false,
    features: [
      "Workflows: Unlimited",
      "Unlimited form entries",
      "Customizable Workflows",
      "Automated Actions",
      "Analytics Dashboard"
    ]
  }
];

export const faqData = [
  {
    id: "item-1",
    question: "Is the free plan completely free?",
    answer: "Yes, our free plan is completely free with no monthly or annual charges. It's a great way to get started and explore our features, limited to one form and 50 entries."
  },
  {
    id: "item-2",
    question: "What are Customizable Workflows?",
    answer: "Customizable Workflows allow you to tailor cancellation workflows to address specific reasons customers unsubscribe. Use our drag-and-drop builder to create engaging forms with conditional logic."
  },
  {
    id: "item-3",
    question: "What do Automated Actions do?",
    answer: "Automated Actions trigger targeted responses based on customer feedback. You can offer discounts, suggest features, or gather detailed insights automatically, helping to retain your customers."
  },
  {
    id: "item-4",
    question: "What insights can I gain from the Analytics Dashboard?",
    answer: "The Analytics Dashboard lets you monitor and analyze churn data, understand the reasons behind cancellations, and make informed decisions to improve customer retention."
  },
  {
    id: "item-5",
    question: "Are there limits on form entries in the paid plans?",
    answer: "No, both the Pro and Business plans offer unlimited form entries, allowing you to handle a large volume of customer interactions without restrictions."
  },
  {
    id: "item-6",
    question: "Can I upgrade my plan later?",
    answer: "Yes, you can upgrade your plan at any time to access more forms and additional features as your business grows."
  },
  {
    id: "item-7",
    question: "How many forms can I create with each plan?",
    answer: "The Starter plan allows for 1 form, the Pro plan allows up to 5 forms, and the Business plan allows for unlimited forms."
  },
  {
    id: "item-8",
    question: "Do I need technical skills to create workflows?",
    answer: "No, our drag-and-drop builder makes it easy to create and customize workflows without any coding or technical skills."
  }
];


export const products = [
  {
    title: 'Moonbeam',
    link: 'https://gomoonbeam.com',
    thumbnail: '/p1.png',
  },
  {
    title: 'Cursor',
    link: 'https://cursor.so',
    thumbnail: '/p2.png',
  },
  {
    title: 'Rogue',
    link: 'https://userogue.com',
    thumbnail: '/p3.png',
  },

  {
    title: 'Editorially',
    link: 'https://editorially.org',
    thumbnail: '/p4.png',
  },
  {
    title: 'Editrix AI',
    link: 'https://editrix.ai',
    thumbnail: '/p5.png',
  },
  {
    title: 'Pixel Perfect',
    link: 'https://app.pixelperfect.quest',
    thumbnail: '/p6.png',
  },

  {
    title: 'Algochurn',
    link: 'https://algochurn.com',
    thumbnail: '/p1.png',
  },
  {
    title: 'Aceternity UI',
    link: 'https://ui.aceternity.com',
    thumbnail: '/p2.png',
  },
  {
    title: 'Tailwind Master Kit',
    link: 'https://tailwindmasterkit.com',
    thumbnail: '/p3.png',
  },
  {
    title: 'SmartBridge',
    link: 'https://smartbridgetech.com',
    thumbnail: '/p4.png',
  },
  {
    title: 'Renderwork Studio',
    link: 'https://renderwork.studio',
    thumbnail: '/p5.png',
  },

  {
    title: 'Creme Digital',
    link: 'https://cremedigital.com',
    thumbnail: '/p6.png',
  },
  {
    title: 'Golden Bells Academy',
    link: 'https://goldenbellsacademy.com',
    thumbnail: '/p1.png',
  },
  {
    title: 'Invoker Labs',
    link: 'https://invoker.lol',
    thumbnail: '/p2.png',
  },
  {
    title: 'E Free Invoice',
    link: 'https://efreeinvoice.com',
    thumbnail: '/p3.png',
  },
]

export const menuOptions = [
  { name: 'Dashboard', Component: Home, href: '/dashboard' },
  { name: 'Workflows', Component: Workflows, href: '/workflows' },
  { name: 'Settings', Component: Settings, href: '/settings' },
  { name: 'Billing', Component: Payment, href: '/billing' },
  { name: 'Templates', Component: Templates, href: '/templates' },
]

export const EditorCanvasDefaultCardTypes = {
  Email: { description: 'Send and email to a user', type: 'Action' },
  Condition: {
    description: 'Boolean operator that creates different conditions lanes.',
    type: 'Action',
  },
  AI: {
    description:
      'Use the power of AI to summarize, respond, create and much more.',
    type: 'Action',
  },
  Slack: { description: 'Send a notification to slack', type: 'Action' },
  'Google Drive': {
    description:
      'Connect with Google drive to trigger actions or to create files and folders.',
    type: 'Trigger',
  },
  Notion: { description: 'Create entries directly in notion.', type: 'Action' },
  'Custom Webhook': {
    description:
      'Connect any app that has an API key and send data to your applicaiton.',
    type: 'Action',
  },
  Discord: {
    description: 'Post messages to your discord server',
    type: 'Action',
  },
  'Google Calendar': {
    description: 'Create a calendar invite.',
    type: 'Action',
  },
  Trigger: {
    description: 'An event that starts the workflow.',
    type: 'Trigger',
  },
  Action: {
    description: 'An event that happens after the workflow begins',
    type: 'Action',
  },
  Wait: {
    description: 'Delay the next action step by using the wait timer.',
    type: 'Action',
  },
}

export const CONNECTIONS: Connection[] = [
  {
    title: 'Google Drive',
    description: 'Connect your google drive to listen to folder changes',
    image: '/googleDrive.png',
    connectionKey: 'googleNode',
    alwaysTrue: true,
  },
  {
    title: 'Discord',
    description: 'Connect your discord to send notification and messages',
    image: '/discord.png',
    connectionKey: 'discordNode',
    accessTokenKey: 'webhookURL',
  },
  {
    title: 'Notion',
    description: 'Create entries in your notion dashboard and automate tasks.',
    image: '/notion.png',
    connectionKey: 'notionNode',
    accessTokenKey: 'accessToken',
  },
  {
    title: 'Slack',
    description:
      'Use slack to send notifications to team members through your own custom bot.',
    image: '/slack.png',
    connectionKey: 'slackNode',
    accessTokenKey: 'slackAccessToken',
    slackSpecial: true,
  },
]
