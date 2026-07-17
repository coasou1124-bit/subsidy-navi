import Link from 'next/link'

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">免責事項</h1>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 space-y-6 text-sm text-slate-700 leading-relaxed">
        <section>
          <h2 className="font-bold text-slate-800 mb-2">1. 本サービスについて</h2>
          <p>
            「支援ナビ」（以下「本サービス」）は、国・都道府県・市区町村が実施する補助金・支援金・助成制度の情報を
            分かりやすく整理し、ユーザーの条件に合った制度を探せるように提供するサービスです。
          </p>
          <p className="mt-2 font-semibold text-red-700">
            本サービスは行政機関が運営する公式サービスではありません。
          </p>
        </section>

        <section>
          <h2 className="font-bold text-slate-800 mb-2">2. 情報の正確性について</h2>
          <p>
            本サービスに掲載している支援制度の情報は、公式の情報をもとにAIが要約・整理したものです。
            情報の正確性・完全性・最新性を保証するものではありません。
            制度の内容は変更される場合があるため、申請前に必ず公式サイトまたは担当窓口でご確認ください。
          </p>
        </section>

        <section>
          <h2 className="font-bold text-slate-800 mb-2">3. 受給の保証について</h2>
          <p>
            本サービスが表示する情報は「対象になる<strong>可能性がある</strong>」ことを示すものであり、
            受給を保証するものではありません。実際の受給可否は申請先の行政機関が審査・判断します。
          </p>
        </section>

        <section>
          <h2 className="font-bold text-slate-800 mb-2">4. 申請にあたって</h2>
          <p>
            支援制度の申請については、各制度の公式窓口にお問い合わせください。
            本サービスの情報のみを根拠に申請を行い、不利益を被った場合についても、
            本サービス運営者は一切の責任を負いません。
          </p>
        </section>

        <section>
          <h2 className="font-bold text-slate-800 mb-2">5. 個人情報について</h2>
          <p>
            本サービスでは、ユーザーが入力した年齢・家族構成等の情報は、検索結果の表示のみに使用します。
            入力情報はサーバーに保存されず、URLパラメータとしてのみ処理されます。
          </p>
        </section>

        <section>
          <h2 className="font-bold text-slate-800 mb-2">6. リンク先について</h2>
          <p>
            本サービスから外部の公式サイトへのリンクを提供していますが、
            リンク先のサービスの内容については責任を負いかねます。
          </p>
        </section>
      </div>

      <div className="mt-6">
        <Link href="/" className="text-blue-600 hover:underline text-sm">
          ← トップページへ戻る
        </Link>
      </div>
    </div>
  )
}
