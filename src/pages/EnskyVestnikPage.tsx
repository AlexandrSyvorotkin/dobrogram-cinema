import suspectPhoto from '../assets/обвиняемый.png'

const NAV_ITEMS = ['Главная', 'Новости', 'Культура', 'Общество', 'Афиша', 'Контакты']

const READING_NOW = [
  'В Энске убита владелица йога-клуба «Алый Лотос»',
  'Страшная трагедия на дороге',
  'Город готовится к фестивалю уличных театров',
  'В Энске откроют новый мост через реку',
]

function VestnikLogo() {
  return (
    <h1 className="vestnik-logo m-0 text-center text-[28px] leading-none font-bold tracking-tight">
      <span className="text-[#2b4c7e]">Энский</span>{' '}
      <span className="text-[#b91c1c]">вестник</span>
    </h1>
  )
}

export function EnskyVestnikPage() {
  return (
    <div className="vestnik-shell min-h-full bg-[#FAF9F6] pb-10 text-[#1a1a1a]">
      <header className="border-b border-[#e8e4dc] bg-[#FAF9F6] px-4 pt-4 pb-3">
        <p className="mb-3 text-[10px] tracking-[0.18em] text-[#8a8478] uppercase">
          Газета Энска с 1998 года
        </p>
        <VestnikLogo />
      </header>

      <nav className="sticky top-0 z-50 bg-[#1C2E4A]">
        <ul className="no-scrollbar flex h-11 items-stretch overflow-x-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = item === 'Новости'
            return (
              <li key={item} className="flex shrink-0">
                <span
                  className={`flex h-full items-center px-5 text-[11px] leading-none tracking-[0.12em] whitespace-nowrap uppercase ${
                    isActive
                      ? 'bg-[#243a5c] font-semibold text-white'
                      : 'text-white/90'
                  }`}
                >
                  {item}
                </span>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="px-4 pt-3 pb-1 text-[11px] text-[#8a8478]">
        Новости &gt; Происшествия &gt; Скандал
      </div>

      <article className="px-4">
        <div className="mb-3 flex flex-wrap gap-2">
          <span className="bg-[#b91c1c] px-2 py-0.5 text-[10px] font-semibold tracking-wide text-white uppercase">
            Срочно
          </span>
          <span className="bg-[#1C2E4A] px-2 py-0.5 text-[10px] font-semibold tracking-wide text-white uppercase">
            Расследование
          </span>
        </div>

        <h2 className="vestnik-headline mb-4 text-[26px] leading-[1.15] font-bold text-[#111827]">
          Главврач районной больницы обвинен в домогательствах и подозревается в совершении врачебной ошибки
        </h2>

        <figure className="mb-4">
          <div className="overflow-hidden rounded-sm bg-[#e5e1d8]">
            <img
              src={suspectPhoto}
              alt="Главврач районной больницы, нейрохирург"
              className="block h-auto w-full object-cover"
            />
          </div>
          <figcaption className="mt-2 text-[12px] text-[#6b7280]">
            Обвиняемый. Фото из открытых источников
          </figcaption>
        </figure>

        <p className="vestnik-lead mb-4 text-[17px] leading-relaxed font-medium text-[#111827]">
          Главный врач районной больницы Энска, нейрохирург <strong>Морозов</strong>, 43 года,
          ранее уже сталкивался с обвинениями в домогательствах к подчинённым. Сейчас его имя
          снова в центре внимания: следствие проверяет версию о грубой врачебной ошибке,
          после которой пациент скончался.
        </p>

        <div className="vestnik-body space-y-4 text-[15px] leading-[1.7] text-[#374151]">
          <p>
            По данным источников «Энского вестника», Морозов возглавлял медучреждение последние
            несколько лет. Коллеги характеризовали его как жёсткого руководителя и «звёздного»
            хирурга, к которому записывались пациенты со всего региона.
          </p>
          <p>
            «Жалобы на неуместное поведение поступали и раньше, но до открытого разбирательства
            дело не доходило. Многие боялись потерять место», — рассказала сотрудница больницы
            на условиях анонимности.
          </p>

          <h3 className="vestnik-headline pt-1 text-[20px] leading-snug font-bold text-[#111827]">
            Домогательства
          </h3>

          <p>
            Несколько медсестёр обратились в трудовую инспекцию и
            прокуратуру. По их словам, главврач допускал непристойные предложения, давление
            и угрозы увольнением в случае отказа.
          </p>
          <p>
            Внутренняя проверка больницы формально завершилась «без подтверждения фактов»,
            однако после публикации обращений в соцсетях руководство регионального минздрава
            было вынуждено начать служебное расследование. Врача временно отстранили от
            административной должности, сохранив за ним право оперировать.
          </p>

          <h3 className="vestnik-headline pt-1 text-[20px] leading-snug font-bold text-[#111827]">
            Подозрение во врачебной ошибке
          </h3>

          <p>
            Новое дело связано с операцией по удалению опухоли мозга. Пациент умер
            вскоре после вмешательства. Родственники утверждают, что осложнения возникли прямо
            в операционной, а повторная комиссия выявила признаки нарушения протокола.
          </p>
          <p>
            По версии следствия, трагедию можно было предотвратить, если бы хирург вовремя
            остановил манипуляцию и вызвал консилиум. Следственный комитет изучает историю
            болезни, записи с операционной и показания ассистентов.
          </p>
          <p>
            «Мы требуем объективной экспертизы. Если подтвердится халатность — отвечать должен
            лично оперировавший врач, а не больница в целом», — заявил представитель семьи
            погибшего.
          </p>

          <blockquote className="border-l-4 border-[#b91c1c] bg-[#f3ece3] px-4 py-3 text-[15px] leading-relaxed text-[#374151] italic">
            «Он всегда говорил, что пациенты и подчинённые ему обязаны. Теперь это звучит
            совсем иначе», — поделилась с «Энским вестником» одна из медсестёр.
          </blockquote>

          
        </div>
      </article>

      <aside className="mx-4 mt-8 border-t border-[#d9d2c6] pt-5">
        <h3 className="mb-3 border-b-2 border-[#b91c1c] pb-2 text-[13px] font-bold tracking-[0.14em] text-[#1C2E4A] uppercase">
          Читают сейчас
        </h3>
        <ul className="space-y-3">
          {READING_NOW.map((title) => (
            <li key={title}>
              <span className="block cursor-default text-[14px] leading-snug text-[#2b4c7e]">
                {title}
              </span>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  )
}
