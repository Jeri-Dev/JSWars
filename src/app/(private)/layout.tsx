import MainLayout from '@/layouts/main/MainLayout'
import "@/shared/styles/layouts/main/main.css"

interface Props {
  children: React.ReactNode
}

export default async function MainLayoutMaster({ children }: Props) {

  return (
    <MainLayout>
      {children}
    </MainLayout>
  )
}