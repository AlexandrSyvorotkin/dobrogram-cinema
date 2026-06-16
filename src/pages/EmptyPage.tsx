type EmptyPageProps = {
  title: string
}

export function EmptyPage({ title }: EmptyPageProps) {
  return (
    <main className="flex flex-1 items-center justify-center pb-[90px] text-[#a8a8a8]">
      {title}
    </main>
  )
}
