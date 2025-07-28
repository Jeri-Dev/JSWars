import { EaseInOut } from '@/shared/components/animation/EaseInOut'
import { redirectSession } from '@/shared/helpers/session'

interface Props {
  children: React.ReactNode
}

export default async function AuthLayoutMaster({ children }: Props) {

  await redirectSession()

  return (
    <EaseInOut>
      {children}
    </EaseInOut>
  )
}