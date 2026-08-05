import suspectPhoto from '../assets/vestnik/ChatGPT Image 5 авг. 2026 г., 15_15_41.png'
import familyPhoto from '../assets/vestnik/photo_2026-08-05_15-01-04.jpg'

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
        Новости &gt; Происшествия &gt; Розыск
      </div>

      <article className="px-4">
        <div className="mb-3 flex flex-wrap gap-2">
          <span className="bg-[#b91c1c] px-2 py-0.5 text-[10px] font-semibold tracking-wide text-white uppercase">
            Срочно
          </span>
          <span className="bg-[#1C2E4A] px-2 py-0.5 text-[10px] font-semibold tracking-wide text-white uppercase">
            Розыск
          </span>
        </div>

        <h2 className="vestnik-headline mb-4 text-[26px] leading-[1.15] font-bold text-[#111827]">
          Разыскивается подозреваемый в причастности к убийству предпринимательницы
        </h2>

        <figure className="mb-4">
          <div className="overflow-hidden rounded-sm bg-[#e5e1d8]">
            <img
              src={suspectPhoto}
              alt="Подозреваемый, разыскиваемый полицией"
              className="block h-auto w-full object-cover"
            />
          </div>
          <figcaption className="mt-2 text-[12px] text-[#6b7280]">
            Подозреваемый. Фото предоставлено следственной группой
          </figcaption>
        </figure>

        <p className="vestnik-lead mb-4 text-[17px] leading-relaxed font-medium text-[#111827]">
          Управление МВД по Энской области разыскивает 40-летнего мужчину, которого подозревают
          в умышленном убийстве. По версии следствия, он скрылся сразу после обнаружения тела
          погибшей женщины.
        </p>

        <div className="vestnik-body space-y-4 text-[15px] leading-[1.7] text-[#374151]">
          <p>
            Ориентировку на задержание подозреваемого распространили утром. Соседи описывают
            его как спокойного, уравновешенного человека, который не раз говорил о семейных
            проблемах, но никогда не производил впечатления агрессивного.
          </p>
          <p>
            «Он всегда был вежлив, здоровался, иногда помогал по дому. Никто не мог подумать,
            что всё закончится так», — рассказала одна из жительниц дома, где проживала семья
            подозреваемого.
          </p>

          <h3 className="vestnik-headline pt-1 text-[20px] leading-snug font-bold text-[#111827]">
            Тело погибшей
          </h3>

          <p>
            Тело погибшей — <strong>Полины Никоновой</strong>, 38 лет — хозяйки клуба «Алый
            лотос». Её нашли в частном доме на окраине Энска. Предварительная причина смерти —
            ножевые ранения.
          </p>
          <p>
            Следователи считают, что между подозреваемым и погибшей в последние недели
            произошёл острый конфликт. По одной из версий, мужчина приехал к ней поздно
            вечером, когда в доме никого не было, кроме самой женщины.
          </p>
          <p>
            «Следов на взлом не обнаружено. Это говорит о том, что она, вероятно, впустила
            знакомого человека сама», — отметил источник в правоохранительных органах. Оружие
            на месте преступления не найдено — предполагают, что подозреваемый забрал его с
            собой.
          </p>

          <figure className="my-2">
            <div className="overflow-hidden rounded-sm bg-[#e5e1d8]">
              <img
                src={familyPhoto}
                alt="Семья подозреваемого"
                className="block h-auto w-full object-cover"
              />
            </div>
            <figcaption className="mt-2 text-[12px] text-[#6b7280]">
              Семья подозреваемого. Снимок из личного архива
            </figcaption>
          </figure>

          <blockquote className="border-l-4 border-[#b91c1c] bg-[#f3ece3] px-4 py-3 text-[15px] leading-relaxed text-[#374151] italic">
            «Он держался, пока не услышал новость. Потом собрал вещи и уехал, не сказав ни
            слова. Мы до сих пор не можем поверить, что это произошло», — рассказала
            «Энскому вестнику» соседка семьи.
          </blockquote>

          <h3 className="vestnik-headline pt-1 text-[20px] leading-snug font-bold text-[#111827]">
            Что известно о розыске
          </h3>

          <p>
            Правоохранители проверяют записи с камер наблюдения, опрашивают знакомых
            подозреваемого и его родственников. Родные утверждают, что не поддерживали с ним
            связь после его внезапного отъезда.
          </p>
          <p>
            Следственный комитет возбудил уголовное дело по статье об убийстве. Лицо, которое
            может помочь в поисках, просят позвонить по телефону горячей линии или обратиться
            в ближайшее отделение полиции.
          </p>
          <p className="text-[13px] text-[#6b7280]">
            Материал подготовлен редакцией. Информация уточняется.
          </p>
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
