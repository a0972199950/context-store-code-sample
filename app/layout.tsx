import { NextAppLayout } from 'next'
import { StoreProvider } from '@/store'

const RootLayout: NextAppLayout = ({ children }) => {
  return (
    <StoreProvider>
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    </StoreProvider>
  )
}

export default RootLayout
