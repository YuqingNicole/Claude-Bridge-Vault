import './globals.css'
export const metadata = { title: 'Claude Bridge Vault', description: 'Nicole API Refinery' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
