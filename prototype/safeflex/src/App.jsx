import './App.css'

import { useEffect, useMemo, useRef, useState } from 'react'

const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'policy', label: 'Policy' },
  { key: 'claims', label: 'Claims' },
  { key: 'analytics', label: 'Analytics' },
]

function cx(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-br from-indigo-600 to-sky-500 text-white shadow-sm">
        <span className="text-sm font-bold">SF</span>
      </div>
      <div className="leading-tight">
        <div className="text-base font-semibold tracking-tight text-slate-900">SafeFlex</div>
        <div className="text-xs text-slate-500">Real-Time Income Protection</div>
      </div>
    </div>
  )
}

function Avatar({ name }) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('')

  return (
    <div className="flex items-center gap-3">
      <div className="hidden text-right sm:block">
        <div className="text-sm font-medium text-slate-800">Arjun</div>
        <div className="text-xs text-slate-500">Delivery Partner</div>
      </div>
      <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-slate-900 to-indigo-700 text-sm font-semibold text-white shadow-sm">
        {initials || 'A'}
      </div>
    </div>
  )
}

function NavButton({ active, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        'relative rounded-xl px-3 py-2 text-sm font-medium transition',
        active ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'
      )}
    >
      <span className={cx('transition', active ? 'opacity-100' : 'opacity-80')}>{label}</span>
      {active && <span className="absolute inset-x-2 -bottom-1 h-0.5 rounded-full bg-indigo-600" />}
    </button>
  )
}

function PageContainer({ children }) {
  return (
    <div className="mx-auto max-w-6xl px-0">
      <div className="rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-lg backdrop-blur">
        {children}
      </div>
    </div>
  )
}

function Pill({ tone, children }) {
  const styles =
    tone === 'green'
      ? 'bg-green-50 text-green-700 ring-green-200'
      : tone === 'blue'
        ? 'bg-blue-50 text-blue-700 ring-blue-200'
        : tone === 'red'
          ? 'bg-red-50 text-red-700 ring-red-200'
          : 'bg-yellow-50 text-yellow-700 ring-yellow-200'
  return (
    <span className={cx('inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ring-1', styles)}>
      {children}
    </span>
  )
}

function StatCard({ label, value, tone = 'slate' }) {
  const bg =
    tone === 'green'
      ? 'bg-green-50 ring-green-200'
      : tone === 'blue'
        ? 'bg-blue-50 ring-blue-200'
        : tone === 'yellow'
          ? 'bg-yellow-50 ring-yellow-200'
          : 'bg-white ring-slate-200'

  const fg =
    tone === 'green'
      ? 'text-green-800'
      : tone === 'blue'
        ? 'text-blue-900'
        : tone === 'yellow'
          ? 'text-yellow-900'
          : 'text-slate-900'

  const subFg =
    tone === 'green'
      ? 'text-green-700'
      : tone === 'blue'
        ? 'text-blue-700'
        : tone === 'yellow'
          ? 'text-yellow-800'
          : 'text-slate-600'

  return (
    <div className={cx('rounded-2xl p-5 shadow-lg ring-1', bg)}>
      <div className={cx('text-xs font-medium', subFg)}>{label}</div>
      <div className={cx('mt-2 text-xl font-semibold', fg)}>{value}</div>
        </div>
  )
}

function LoadingDots({ active }) {
  const [dots, setDots] = useState(1)

  useEffect(() => {
    if (!active) return

    const t = window.setInterval(() => {
      setDots((d) => (d % 3) + 1)
    }, 420)

    return () => clearInterval(t)
  }, [active])

  if (!active) return null
  return <span aria-hidden="true">{'.'.repeat(dots)}</span>
}

function DashboardPage({
  premium,
  coverage,
  earningsProtected,
  lastPayout,
  lastDisruption,
  claimRunning,
  onSimulate,
  claimStageIndex,
  scenarioRunning,
  scenarioStep,
  incomeLossDetected,
}) {
  const activeStepRef = useRef(null)

  useEffect(() => {
    if (scenarioStep >= 1 && activeStepRef.current) {
      activeStepRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [scenarioStep])

  return (
    <PageContainer>
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="text-2xl font-semibold tracking-tight text-slate-900">Welcome back, Arjun 👋</div>
          <div className="mt-1 text-sm text-slate-600">Flexible protection for unpredictable earnings.</div>
          <div className="mt-3 text-sm text-slate-600">
            Premium triggers on measurable weather & air conditions for your operating zone.
          </div>
        </div>

        <div className="flex items-center gap-3">
        <button
            type="button"
            onClick={onSimulate}
            disabled={scenarioRunning}
            className={cx(
              'inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold shadow-sm transition',
              scenarioRunning
                ? 'cursor-not-allowed bg-slate-100 text-slate-500'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800'
            )}
          >
            {scenarioRunning ? 'Simulating…' : 'Simulate Disruption'}
        </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Weekly Premium" value={`₹${premium}`} />
        <StatCard label="Coverage" value={`₹${coverage}`} />
        <StatCard label="Earnings Protected" value={`₹${earningsProtected}`} />
        <div className="rounded-2xl bg-green-50 p-5 shadow-lg ring-1 ring-green-200">
          <div className="text-xs font-medium text-green-700">Active Status</div>
          <div className="mt-2 text-xl font-semibold text-green-800">Protected</div>
          <div className="mt-1 text-xs text-green-700">Auto payouts on valid triggers</div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-5 shadow-lg ring-1 ring-slate-200">
          <div className="text-sm font-semibold text-slate-900">Recent Activity</div>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-medium text-slate-600">Last payout</div>
                <div className="mt-1 text-base font-semibold text-slate-900">₹{lastPayout}</div>
              </div>
              <div className="rounded-xl bg-green-50 px-3 py-2 text-xs font-semibold text-green-700 ring-1 ring-green-200">
                Success
              </div>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-medium text-slate-600">Last disruption</div>
                <div className="mt-1 text-base font-semibold text-slate-900">{lastDisruption}</div>
              </div>
              <div className="rounded-xl bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 ring-1 ring-blue-200">
                Triggered
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-50 p-5 shadow-lg ring-1 ring-slate-200">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-semibold text-slate-900">Live scenario simulation</div>
            {scenarioRunning ? (
              <Pill tone="yellow">Processing</Pill>
            ) : scenarioStep === 4 ? (
              <Pill tone={incomeLossDetected ? 'green' : 'red'}>{incomeLossDetected ? 'Paid' : 'No payout'}</Pill>
            ) : (
              <Pill tone="blue">Ready</Pill>
            )}
          </div>

          {scenarioStep === 0 ? (
            <div className="mt-4 rounded-2xl bg-white p-4 ring-1 ring-slate-200">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold text-slate-900">🚴 Arjun is delivering an order...</div>
                  <div className="mt-1 text-sm text-slate-700">📦 Order in progress</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-indigo-600" />
                  <div className="text-xs font-semibold text-slate-600">Live</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-3 text-sm text-slate-700">
              Running disruption checks in real time. This is a demo scenario.
            </div>
          )}

          <div className="mt-4 grid gap-2">
            {/* Step 1 */}
            <div
              ref={scenarioStep === 1 ? activeStepRef : null}
              className={cx(
                'relative rounded-xl border p-4 shadow-sm transition-all duration-500',
                scenarioStep >= 1 ? 'border-blue-200 bg-blue-50 opacity-100 translate-y-0' : 'border-slate-200 bg-white opacity-0 translate-y-1',
                scenarioStep === 1 ? 'ring-2 ring-blue-200' : 'ring-1 ring-transparent'
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold text-blue-800">🌧 Heavy Rain Started</div>
                  <div className="mt-1 text-sm text-blue-700">⚠ Weather threshold exceeded</div>
                </div>
                <div className="pointer-events-none">
                  <div className={cx('absolute right-3 top-3 text-lg', scenarioStep >= 1 ? 'animate-bounce' : 'opacity-0')}>
                    💧
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div
              ref={scenarioStep === 2 ? activeStepRef : null}
              className={cx(
                'rounded-xl border p-4 shadow-sm transition-all duration-500',
                scenarioStep >= 2
                  ? 'border-yellow-200 bg-yellow-50 opacity-100 translate-y-0'
                  : 'border-slate-200 bg-white opacity-0 translate-y-1 pointer-events-none',
                scenarioStep === 2 ? 'ring-2 ring-yellow-200' : 'ring-1 ring-transparent'
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold text-yellow-800">
                    📡 Checking location
                    <span className="ml-2 text-yellow-800">
                      <LoadingDots active={scenarioStep === 2} />
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-yellow-700">📍 Location verified</div>
                </div>
                <div className={cx('text-xs font-semibold', scenarioStep >= 2 ? 'text-yellow-800' : 'text-slate-500')}>
                  {scenarioStep === 2 ? 'Verifying' : scenarioStep > 2 ? 'Done' : 'Pending'}
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div
              ref={scenarioStep === 3 ? activeStepRef : null}
              className={cx(
                'rounded-xl border p-4 shadow-sm transition-all duration-500',
                scenarioStep >= 3
                  ? 'border-yellow-200 bg-yellow-50 opacity-100 translate-y-0'
                  : 'border-slate-200 bg-white opacity-0 translate-y-1 pointer-events-none',
                scenarioStep === 3 ? 'ring-2 ring-yellow-200' : 'ring-1 ring-transparent'
              )}
            >
              <div className="text-sm font-semibold text-yellow-800">📊 Checking delivery activity...</div>

              {incomeLossDetected ? (
                <div className="mt-2 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-800">
                    <span aria-hidden="true">📉</span> Delivery dropped
                  </div>
                  <div className="flex items-center gap-2 text-sm text-yellow-800">
                    <span aria-hidden="true">⚠</span> Income loss detected
                  </div>
                </div>
              ) : (
                <div className="mt-2 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-800">
                    <span aria-hidden="true">📦</span> Orders still active
                  </div>
                  <div className="flex items-center gap-2 text-sm text-yellow-800">
                    <span aria-hidden="true">💰</span> No income loss detected
                  </div>
                </div>
              )}
            </div>

            {/* Step 4 */}
            <div
              ref={scenarioStep === 4 ? activeStepRef : null}
              className={cx(
                'rounded-xl border p-4 shadow-sm transition-all duration-500',
                scenarioStep >= 4
                  ? incomeLossDetected
                    ? 'border-green-200 bg-green-50'
                    : 'border-red-200 bg-red-50'
                  : 'border-slate-200 bg-white opacity-0 translate-y-1 pointer-events-none',
                scenarioStep === 4 ? (incomeLossDetected ? 'ring-2 ring-green-200' : 'ring-2 ring-red-200') : 'ring-1 ring-transparent'
              )}
            >
              {incomeLossDetected ? (
                <div>
                  <div className="text-sm font-semibold text-green-800">✅ Claim Approved</div>
                  <div className="mt-1 text-sm text-green-700">💰 ₹450 Credited via SafeFlex</div>
                </div>
              ) : (
                <div>
                  <div className="text-sm font-semibold text-red-800">❌ No payout triggered</div>
                  <div className="mt-1 text-sm text-red-700">✔ System detected normal earnings</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}

function PolicyPage({ selected, onSelect }) {
  const plans = [
    { key: 'basic', name: 'Basic', premium: 25, coverage: 300, note: 'For occasional disruptions' },
    { key: 'standard', name: 'Standard', premium: 40, coverage: 500, note: 'Balanced coverage' },
    { key: 'pro', name: 'Pro', premium: 60, coverage: 800, note: 'For high-activity areas' },
  ]

  return (
    <PageContainer>
      <div className="mb-5">
        <div className="text-2xl font-semibold tracking-tight text-slate-900">Policy</div>
        <div className="mt-1 text-sm text-slate-600">Choose weekly coverage. Adjust anytime.</div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((p) => {
          const active = p.key === selected
          return (
            <button
              key={p.key}
              type="button"
              onClick={() => onSelect(p.key)}
              className={cx(
                'rounded-3xl border p-5 text-left shadow-sm transition-all',
                active ? 'border-indigo-600 bg-gradient-to-b from-indigo-50 to-white' : 'border-slate-200 bg-white hover:shadow-md'
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-medium text-slate-500">{p.name}</div>
                  <div className="mt-2 text-2xl font-semibold text-slate-900">₹{p.coverage}</div>
                  <div className="mt-1 text-sm text-slate-600">Coverage</div>
                </div>
                <div className={cx('rounded-2xl px-3 py-2 text-sm font-semibold ring-1', active ? 'bg-indigo-600 text-white ring-indigo-400' : 'bg-slate-50 text-slate-800 ring-slate-200')}>
                  ₹{p.premium}/week
                </div>
              </div>
              <div className="mt-4 text-sm text-slate-600">{p.note}</div>
              <div className="mt-4 flex items-center gap-2">
                <span className={cx('h-2.5 w-2.5 rounded-full', active ? 'bg-green-500' : 'bg-slate-300')} />
                <span className={cx('text-sm font-medium', active ? 'text-slate-900' : 'text-slate-600')}>
                  {active ? 'Selected plan' : 'Select plan'}
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </PageContainer>
  )
}

function ClaimsFlow({ stageIndex }) {
  const steps = [
    { label: 'Rain detected', tone: 'yellow' },
    { label: 'Verification', tone: 'blue' },
    { label: 'Approved', tone: 'green' },
    { label: 'Paid', tone: 'green' },
  ]

  return (
    <div className="mt-3 grid gap-3">
      {steps.map((s, i) => {
        const state = stageIndex === null ? 'todo' : i < stageIndex ? 'done' : i === stageIndex ? 'active' : 'todo'
        const base = 'flex items-start gap-3 rounded-2xl border p-4 shadow-sm transition-all duration-500'
        const toneBg =
          s.tone === 'green'
            ? { todo: 'border-slate-200 bg-white text-slate-600', active: 'border-green-200 bg-green-50 text-green-800', done: 'border-green-200 bg-green-50 text-green-800' }
            : s.tone === 'blue'
              ? { todo: 'border-slate-200 bg-white text-slate-600', active: 'border-blue-200 bg-blue-50 text-blue-800', done: 'border-blue-200 bg-blue-50 text-blue-800' }
              : { todo: 'border-slate-200 bg-white text-slate-600', active: 'border-yellow-200 bg-yellow-50 text-yellow-800', done: 'border-yellow-200 bg-yellow-50 text-yellow-800' }

        const box = state === 'done' ? toneBg.done : state === 'active' ? toneBg.active : toneBg.todo
        const icon = state === 'done' ? '✓' : i + 1

        const iconStyles =
          s.tone === 'green'
            ? 'border-green-200 bg-green-100 text-green-700'
            : s.tone === 'blue'
              ? 'border-blue-200 bg-blue-100 text-blue-700'
              : 'border-yellow-200 bg-yellow-100 text-yellow-700'

        const titleColor =
          s.tone === 'green'
            ? 'text-green-800'
            : s.tone === 'blue'
              ? 'text-blue-800'
              : 'text-yellow-800'

        return (
          <div key={s.label} className={cx(base, box)}>
            <div className={cx('mt-0.5 grid h-9 w-9 place-items-center rounded-xl border text-sm font-semibold', state === 'todo' ? 'border-slate-200 bg-slate-50 text-slate-600' : iconStyles)}>
              {icon}
            </div>
            <div className="min-w-0">
              <div className={cx('text-sm font-semibold', state === 'todo' ? 'text-slate-800' : titleColor)}>{s.label}</div>
              <div className="mt-1 text-xs text-slate-600">
                {state === 'done' ? 'Completed' : state === 'active' ? 'In progress' : 'Waiting for trigger'}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function ClaimsPage({ stageIndex, running, history }) {
  return (
    <PageContainer>
      <div className="mb-5">
        <div className="text-2xl font-semibold tracking-tight text-slate-900">Claims</div>
        <div className="mt-1 text-sm text-slate-600">A transparent claim flow with real-time validation.</div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl bg-white p-4 shadow-lg ring-1 ring-slate-200">
          <div className="text-sm font-semibold text-slate-900">Claim Flow</div>
          <ClaimsFlow stageIndex={stageIndex} />

          {running && (
            <div className="mt-4 rounded-2xl bg-yellow-50 p-4 ring-1 ring-yellow-200">
              <div className="flex items-center gap-2 text-sm font-semibold text-yellow-800">
                <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-yellow-500" />
                Processing real-time claim
              </div>
              <div className="mt-1 text-sm text-yellow-700">Location verification and fraud checks are running.</div>
            </div>
          )}
        </div>

        <div className="rounded-3xl bg-white p-4 shadow-lg ring-1 ring-slate-200">
          <div className="text-sm font-semibold text-slate-900">Claim history</div>
          <div className="mt-3 space-y-3">
            {history.length === 0 ? (
              <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">No claims yet.</div>
            ) : (
              history.slice(0, 8).map((h, idx) => (
                <div key={`${h.amount}-${h.disruption}-${idx}`} className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 p-4">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-slate-900">
                      ₹{h.amount} → {h.disruption} → {h.outcome}
                    </div>
                  </div>
                  <div className={cx('rounded-xl px-3 py-2 text-xs font-semibold ring-1', h.outcome === 'Approved' || h.outcome === 'Paid' ? 'bg-green-50 text-green-700 ring-green-200' : 'bg-blue-50 text-blue-700 ring-blue-200')}>
                    {h.outcome}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  )
}

function AnalyticsPage({ totalProtected, claimsCount, riskLevel }) {
  const barValues = useMemo(() => {
    const map = {
      Low: [75, 20, 5],
      Medium: [40, 50, 10],
      High: [20, 45, 35],
    }
    return map[riskLevel] || map.Medium
  }, [riskLevel])

  const [low, medium, high] = barValues
  const max = 100

  return (
    <PageContainer>
      <div className="mb-5">
        <div className="text-2xl font-semibold tracking-tight text-slate-900">Analytics</div>
        <div className="mt-1 text-sm text-slate-600">Simple stats + a lightweight risk view.</div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Total earnings protected" value={`₹${totalProtected}`} />
        <StatCard label="Number of claims" value={`${claimsCount}`} />
        <div className="rounded-2xl bg-white p-5 shadow-lg ring-1 ring-slate-200">
          <div className="text-xs font-medium text-slate-600">Risk level</div>
          <div className="mt-2 inline-flex items-center rounded-2xl px-3 py-2 text-sm font-semibold ring-1 bg-slate-50 text-slate-800 ring-slate-200">
            {riskLevel}
          </div>
          <div className="mt-2 text-xs text-slate-600">Derived from recent disruption patterns</div>
          <div className="mt-3 flex gap-2">
            <span className={cx('inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1', riskLevel === 'Low' ? 'bg-green-50 text-green-700 ring-green-200' : 'bg-slate-50 text-slate-700 ring-slate-200')}>Low</span>
            <span className={cx('inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1', riskLevel === 'Medium' ? 'bg-yellow-50 text-yellow-700 ring-yellow-200' : 'bg-slate-50 text-slate-700 ring-slate-200')}>Medium</span>
            <span className={cx('inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1', riskLevel === 'High' ? 'bg-blue-50 text-blue-700 ring-blue-200' : 'bg-slate-50 text-slate-700 ring-slate-200')}>High</span>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-3xl bg-white p-5 shadow-lg ring-1 ring-slate-200">
        <div className="flex items-center justify-between gap-4">
          <div className="text-sm font-semibold text-slate-900">Risk distribution</div>
          <div className="text-xs text-slate-600">Simple div bars</div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4 items-end">
          <div className="flex flex-col gap-3">
            <div className="rounded-2xl bg-green-50 ring-1 ring-green-200 p-3">
              <div className="mx-auto w-6 rounded-full bg-green-500 transition-all" style={{ height: `${(low / max) * 160}px` }} />
            </div>
            <div className="text-center text-xs font-medium text-slate-600">Low</div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="rounded-2xl bg-yellow-50 ring-1 ring-yellow-200 p-3">
              <div className="mx-auto w-6 rounded-full bg-yellow-500 transition-all" style={{ height: `${(medium / max) * 160}px` }} />
            </div>
            <div className="text-center text-xs font-medium text-slate-600">Medium</div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="rounded-2xl bg-blue-50 ring-1 ring-blue-200 p-3">
              <div className="mx-auto w-6 rounded-full bg-blue-500 transition-all" style={{ height: `${(high / max) * 160}px` }} />
            </div>
            <div className="text-center text-xs font-medium text-slate-600">High</div>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}

export default function App() {
  const [activePage, setActivePage] = useState('dashboard')
  const [selectedPlan, setSelectedPlan] = useState('standard')

  const planMeta = useMemo(() => {
    return {
      basic: { premium: 25, coverage: 300 },
      standard: { premium: 40, coverage: 500 },
      pro: { premium: 60, coverage: 800 },
    }
  }, [])

  const premium = planMeta[selectedPlan].premium
  const coverage = planMeta[selectedPlan].coverage
  const earningsProtected = 2400

  const [claimRunning, setClaimRunning] = useState(false)
  const [claimStageIndex, setClaimStageIndex] = useState(null) // 0..3
  const [scenarioRunning, setScenarioRunning] = useState(false)
  const [scenarioStep, setScenarioStep] = useState(0) // 0: delivering, 1..4: simulation steps
  const [incomeLossDetected, setIncomeLossDetected] = useState(null) // boolean | null
  const timeoutsRef = useRef([])

  const [lastPayout, setLastPayout] = useState(450)
  const [lastDisruption, setLastDisruption] = useState('Rain')

  const [claimHistory, setClaimHistory] = useState([
    { amount: 450, disruption: 'Rain', outcome: 'Approved' },
    { amount: 300, disruption: 'Heat', outcome: 'Approved' },
  ])

  const riskLevel = useMemo(() => {
    const hasRain = claimHistory.some((c) => c.disruption === 'Rain')
    const hasHeat = claimHistory.some((c) => c.disruption === 'Heat')
    if (hasRain && hasHeat) return 'Medium'
    if (claimHistory.length >= 3) return 'High'
    return 'Low'
  }, [claimHistory])

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((t) => clearTimeout(t))
      timeoutsRef.current = []
    }
  }, [])

  const simulateDisruption = () => {
    if (scenarioRunning) return

    // Decide once so the whole timeline stays consistent.
    const loss = Math.random() < 0.55
    setIncomeLossDetected(loss)
    setScenarioRunning(true)
    setScenarioStep(0)

    // Only run the claim pipeline if we detect income loss.
    setClaimRunning(false)
    setClaimStageIndex(null)

    // Step 1: 1.5s
    const t1 = window.setTimeout(() => {
      setScenarioStep(1)
      if (loss) {
        setClaimStageIndex(0)
        setClaimRunning(true)
      }
    }, 1500)

    // Step 2: 3s
    const t2 = window.setTimeout(() => {
      setScenarioStep(2)
      if (loss) setClaimStageIndex(1)
    }, 3000)

    // Step 3: 4.5s
    const t3 = window.setTimeout(() => {
      setScenarioStep(3)
      if (loss) setClaimRunning(true)
    }, 4500)

    // Step 4: 6s
    const t4 = window.setTimeout(() => {
      setScenarioStep(4)

      if (loss) {
        const amount = 450
        setClaimHistory((prev) => [{ amount, disruption: 'Rain', outcome: 'Approved' }, ...prev])
        setLastPayout(amount)
        setLastDisruption('Rain')

        setClaimStageIndex(3)
        setClaimRunning(false)
      } else {
        setClaimStageIndex(null)
        setClaimRunning(false)
      }

      setScenarioRunning(false)
    }, 6000)

    timeoutsRef.current.forEach((t) => clearTimeout(t))
    timeoutsRef.current = [t1, t2, t3, t4]
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-indigo-50">
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-center justify-between py-4">
            <Logo />

            <nav className="hidden items-center gap-2 md:flex">
              {NAV_ITEMS.map((it) => (
                <NavButton key={it.key} label={it.label} active={activePage === it.key} onClick={() => setActivePage(it.key)} />
              ))}
            </nav>

            <div className="hidden md:block">
              <Avatar name="Arjun" />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="md:hidden">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {NAV_ITEMS.map((it) => (
              <button
                key={it.key}
                type="button"
                onClick={() => setActivePage(it.key)}
                className={cx(
                  'rounded-xl px-3 py-2 text-sm font-semibold ring-1 transition',
                  activePage === it.key
                    ? 'bg-indigo-600 text-white ring-indigo-400'
                    : 'bg-white text-slate-700 ring-slate-200 hover:bg-slate-50'
                )}
              >
                {it.label}
              </button>
            ))}
          </div>
        </div>

        <div key={activePage} className="transition-opacity duration-300">
          {activePage === 'dashboard' && (
            <DashboardPage
              premium={premium}
              coverage={coverage}
              earningsProtected={earningsProtected}
              lastPayout={lastPayout}
              lastDisruption={lastDisruption}
              claimRunning={claimRunning}
              claimStageIndex={claimStageIndex}
              onSimulate={simulateDisruption}
              scenarioRunning={scenarioRunning}
              scenarioStep={scenarioStep}
              incomeLossDetected={incomeLossDetected}
            />
          )}
          {activePage === 'policy' && <PolicyPage selected={selectedPlan} onSelect={setSelectedPlan} />}
          {activePage === 'claims' && <ClaimsPage stageIndex={claimStageIndex} running={claimRunning} history={claimHistory} />}
          {activePage === 'analytics' && <AnalyticsPage totalProtected={earningsProtected} claimsCount={claimHistory.length} riskLevel={riskLevel} />}
        </div>

        <div className="mt-6 text-center text-xs text-slate-500">
          SafeFlex prototype UI • Real-time claim simulation • Tailwind-only styling
        </div>
      </div>
    </div>
  )
}
