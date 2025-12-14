import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import type React from 'react'
import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'HealthCare Clinic - Book Your Appointment Today',
	description:
		'Professional healthcare services with easy online appointment booking. Expert doctors, modern facilities, and personalized care.',
	generator: 'v0.app',
	icons: {},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={`font-sans antialiased`}>
				{children}
				<Analytics />
			</body>
		</html>
	)
}
