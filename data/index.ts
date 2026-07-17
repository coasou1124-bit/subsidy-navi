import type { Subsidy } from '@/types/subsidy'
import { nationalSubsidies } from './subsidies/national'
import { tokyoSubsidies } from './subsidies/prefectures/tokyo'
import { osakaSubsidies } from './subsidies/prefectures/osaka'
import { kanagawaSubsidies } from './subsidies/prefectures/kanagawa'
import { aichiSubsidies } from './subsidies/prefectures/aichi'
import { fukuokaSubsidies } from './subsidies/prefectures/fukuoka'
import { saitamaSubsidies } from './subsidies/prefectures/saitama'
import { chibaSubsidies } from './subsidies/prefectures/chiba'
import { hokkaidoSubsidies } from './subsidies/prefectures/hokkaido'
import { hyogoSubsidies } from './subsidies/prefectures/hyogo'
import { kyotoSubsidies } from './subsidies/prefectures/kyoto'
import { shizuokaSubsidies } from './subsidies/prefectures/shizuoka'
import { hiroshimaSubsidies } from './subsidies/prefectures/hiroshima'
import { ibarakiSubsidies } from './subsidies/prefectures/ibaraki'
import { miyagiSubsidies } from './subsidies/prefectures/miyagi'
import { naganoSubsidies } from './subsidies/prefectures/nagano'
import { niigataSubsidies } from './subsidies/prefectures/niigata'
import { gifuSubsidies } from './subsidies/prefectures/gifu'
import { tochigiSubsidies } from './subsidies/prefectures/tochigi'
import { gunmaSubsidies } from './subsidies/prefectures/gunma'
import { okayamaSubsidies } from './subsidies/prefectures/okayama'
import { mieSubsidies } from './subsidies/prefectures/mie'
import { kumamotoSubsidies } from './subsidies/prefectures/kumamoto'
import { kagoshimaSubsidies } from './subsidies/prefectures/kagoshima'
import { okinawaSubsidies } from './subsidies/prefectures/okinawa'
import { shigaSubsidies } from './subsidies/prefectures/shiga'
import { yamaguchiSubsidies } from './subsidies/prefectures/yamaguchi'
import { fukushimaSubsidies } from './subsidies/prefectures/fukushima'
import { naraSubsidies } from './subsidies/prefectures/nara'
import { ehimeSubsidies } from './subsidies/prefectures/ehime'
import { nagasakiSubsidies } from './subsidies/prefectures/nagasaki'
import { aomoriSubsidies } from './subsidies/prefectures/aomori'
import { iwateSubsidies } from './subsidies/prefectures/iwate'
import { oitaSubsidies } from './subsidies/prefectures/oita'
import { ishikawaSubsidies } from './subsidies/prefectures/ishikawa'
import { toyamaSubsidies } from './subsidies/prefectures/toyama'
import { yamagataSubsidies } from './subsidies/prefectures/yamagata'
import { miyazakiSubsidies } from './subsidies/prefectures/miyazaki'
import { akitaSubsidies } from './subsidies/prefectures/akita'
import { kagawaSubsidies } from './subsidies/prefectures/kagawa'
import { wakayamaSubsidies } from './subsidies/prefectures/wakayama'
import { yamanashiSubsidies } from './subsidies/prefectures/yamanashi'
import { sagaSubsidies } from './subsidies/prefectures/saga'
import { fukuiSubsidies } from './subsidies/prefectures/fukui'
import { tokushimaSubsidies } from './subsidies/prefectures/tokushima'
import { kochiSubsidies } from './subsidies/prefectures/kochi'
import { shimaneSubsidies } from './subsidies/prefectures/shimane'
import { tottoriSubsidies } from './subsidies/prefectures/tottori'

const prefecturalSubsidies: Subsidy[] = [
  ...tokyoSubsidies,
  ...osakaSubsidies,
  ...kanagawaSubsidies,
  ...aichiSubsidies,
  ...fukuokaSubsidies,
  ...saitamaSubsidies,
  ...chibaSubsidies,
  ...hokkaidoSubsidies,
  ...hyogoSubsidies,
  ...kyotoSubsidies,
  ...shizuokaSubsidies,
  ...hiroshimaSubsidies,
  ...ibarakiSubsidies,
  ...miyagiSubsidies,
  ...naganoSubsidies,
  ...niigataSubsidies,
  ...gifuSubsidies,
  ...tochigiSubsidies,
  ...gunmaSubsidies,
  ...okayamaSubsidies,
  ...mieSubsidies,
  ...kumamotoSubsidies,
  ...kagoshimaSubsidies,
  ...okinawaSubsidies,
  ...shigaSubsidies,
  ...yamaguchiSubsidies,
  ...fukushimaSubsidies,
  ...naraSubsidies,
  ...ehimeSubsidies,
  ...nagasakiSubsidies,
  ...aomoriSubsidies,
  ...iwateSubsidies,
  ...oitaSubsidies,
  ...ishikawaSubsidies,
  ...toyamaSubsidies,
  ...yamagataSubsidies,
  ...miyazakiSubsidies,
  ...akitaSubsidies,
  ...kagawaSubsidies,
  ...wakayamaSubsidies,
  ...yamanashiSubsidies,
  ...sagaSubsidies,
  ...fukuiSubsidies,
  ...tokushimaSubsidies,
  ...kochiSubsidies,
  ...shimaneSubsidies,
  ...tottoriSubsidies,
]

export function getAllSubsidies(): Subsidy[] {
  return [...nationalSubsidies, ...prefecturalSubsidies]
}

export function getSubsidyById(id: string): Subsidy | undefined {
  return getAllSubsidies().find((s) => s.id === id)
}
