import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import {
	GeistPixelSquare,
	GeistPixelGrid,
	GeistPixelCircle,
	GeistPixelTriangle,
	GeistPixelLine,
} from 'geist/font/pixel'
import './globals.css'

export const metadata = {
	title: 'tldraw Next.js app template',
	description: 'An example of how to use tldraw in a Next.js app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html
			lang="en"
			className={`${GeistSans.variable} ${GeistMono.variable} ${GeistPixelSquare.variable} ${GeistPixelGrid.variable} ${GeistPixelCircle.variable} ${GeistPixelTriangle.variable} ${GeistPixelLine.variable}`}
		>
			<body>{children}</body>
		</html>
	)
}
