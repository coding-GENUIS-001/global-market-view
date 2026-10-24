import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Global Market View',
  description: 'View-only market dashboard'
};

export default function Page() {
  const currencyRows = [
    { pair: 'USD/EUR', value: '0.92', change: '+0.18%', trend: 'up' },
    { pair: 'USD/GBP', value: '0.78', change: '+0.11%', trend: 'up' },
    { pair: 'JPY/USD', value: '157.40', change: '-0.42%', trend: 'down' },
    { pair: 'AUD/USD', value: '1.52', change: '+0.34%', trend: 'up' },
    { pair: 'USD/CAD', value: '1.36', change: '-0.09%', trend: 'down' },
    { pair: 'CHF/USD', value: '0.89', change: '+0.15%', trend: 'up' }
  ];

  const indexRows = [
    { name: 'S&P 500', value: '5,422.12', change: '+1.22%', trend: 'up' },
    { name: 'Nasdaq', value: '17,930.44', change: '+1.68%', trend: 'up' },
    { name: 'Dow Jones', value: '39,842.17', change: '+0.74%', trend: 'up' },
    { name: 'FTSE 100', value: '8,187.33', change: '+0.51%', trend: 'up' },
    { name: 'Nikkei 225', value: '39,246.91', change: '-0.34%', trend: 'down' }
  ];

  const leadingStocks = [
    { symbol: 'NVDA', name: 'NVIDIA', price: '$126.84', change: '+3.82%', trend: 'up' },
    { symbol: 'MSFT', name: 'Microsoft', price: '$458.72', change: '+1.46%', trend: 'up' },
    { symbol: 'AAPL', name: 'Apple', price: '$217.35', change: '+0.91%', trend: 'up' },
    { symbol: 'AMZN', name: 'Amazon', price: '$188.53', change: '+2.11%', trend: 'up' },
    { symbol: 'TSLA', name: 'Tesla', price: '$253.69', change: '-1.53%', trend: 'down' }
  ];

  const cryptoRows = [
    { symbol: 'BTC', name: 'Bitcoin', price: '$67,430', change: '+2.13%', trend: 'up' },
    { symbol: 'ETH', name: 'Ethereum', price: '$3,470', change: '+1.94%', trend: 'up' },
    { symbol: 'SOL', name: 'Solana', price: '$162.54', change: '+4.41%', trend: 'up' },
    { symbol: 'XRP', name: 'Ripple', price: '$0.62', change: '+0.76%', trend: 'up' }
  ];

  const companyCards = [
    { name: 'Apple', ticker: 'AAPL', sector: 'Technology', marketCap: '$3.0T', country: 'US', sentiment: 'Bullish' },
    { name: 'Tesla', ticker: 'TSLA', sector: 'Automotive', marketCap: '$844B', country: 'US', sentiment: 'Neutral' },
    { name: 'LVMH', ticker: 'MC.PA', sector: 'Luxury', marketCap: '$370B', country: 'FR', sentiment: 'Positive' },
    { name: 'SAP', ticker: 'SAP', sector: 'Software', marketCap: '$355B', country: 'DE', sentiment: 'Bullish' }
  ];

  const marketNews = [
    { title: 'Global tech rally lifts equity markets across Europe and the US', time: '14 min ago', tag: 'Markets' },
    { title: 'Dollar steadies as traders assess Fed outlook and inflation data', time: '32 min ago', tag: 'Forex' },
    { title: 'Oil prices edge lower after supply outlook softens ahead of Friday close', time: '1 hr ago', tag: 'Commodities' },
    { title: 'AI chipmakers lead gains in semiconductor sector', time: '2 hr ago', tag: 'Tech' }
  ];

  const watchlist = ['AAPL', 'MSFT', 'NVDA', 'EUR/USD', 'BTC', 'XAU/USD'];

  const sparkline = 'M 0 80 C 30 70, 60 60, 90 62 S 150 30, 180 45 S 220 35, 260 25 S 300 15, 340 18';

  const formatChange = (value: string, trend: string) => (
    <span className={`font-medium ${trend === 'up' ? 'text-green' : 'text-red'}`}>{value}</span>
  );

  return (
    <main className="min-h-screen bg-background text-slate-100">
      <div className="mx-auto max-w-[1680px] px-4 py-6 lg:px-8">
        <header className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-800 bg-panel/80 p-4 shadow-glow backdrop-blur md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 font-bold text-slate-950">
              M
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-slate-400">Market Pulse</p>
              <h1 className="text-xl font-semibold">Global Market View</h1>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
            {['Overview', 'Markets', 'Currencies', 'Companies', 'Portfolio', 'News'].map((item) => (
              <button key={item} className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1.5 transition hover:border-cyan-500 hover:text-white">
                {item}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-300">
              UTC 14:32
            </div>
            <button className="rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-glow">
              Live Feed
            </button>
          </div>
        </header>

        <section className="mb-6 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-violet-500/15 to-slate-950 p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">World FX</p>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <h2 className="text-3xl font-semibold">7.48</h2>
                <p className="text-sm text-slate-400">Major pairs index</p>
              </div>
              <span className="rounded-full bg-green/10 px-2 py-1 text-xs font-medium text-green">+0.83%</span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">NASDAQ</p>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <h2 className="text-3xl font-semibold">17,930</h2>
                <p className="text-sm text-slate-400">Technology lead</p>
              </div>
              <span className="rounded-full bg-green/10 px-2 py-1 text-xs font-medium text-green">+1.68%</span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Bitcoin</p>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <h2 className="text-3xl font-semibold">$67.4K</h2>
                <p className="text-sm text-slate-400">Crypto momentum</p>
              </div>
              <span className="rounded-full bg-green/10 px-2 py-1 text-xs font-medium text-green">+2.13%</span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Gold</p>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <h2 className="text-3xl font-semibold">$2,338</h2>
                <p className="text-sm text-slate-400">Safe haven</p>
              </div>
              <span className="rounded-full bg-red/10 px-2 py-1 text-xs font-medium text-red">-0.31%</span>
            </div>
          </div>
        </section>

        <section className="mb-6 grid gap-5 xl:grid-cols-[1.5fr_0.9fr]">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Market overview</p>
                <h2 className="mt-2 text-2xl font-semibold">Global risk sentiment</h2>
              </div>
              <div className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-300">Bullish bias</div>
            </div>

            <div className="flex items-end gap-2">
              <div className="w-12 text-xs text-slate-400">Mon</div>
              <div className="w-12 text-xs text-slate-400">Tue</div>
              <div className="w-12 text-xs text-slate-400">Wed</div>
              <div className="w-12 text-xs text-slate-400">Thu</div>
              <div className="w-12 text-xs text-slate-400">Fri</div>
              <div className="w-12 text-xs text-slate-400">Sat</div>
            </div>

            <svg viewBox="0 0 340 120" className="mt-4 h-36 w-full overflow-visible">
              <defs>
                <linearGradient id="lineGlow" x1="0" x2="1">
                  <stop offset="0%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#3ec9ff" />
                </linearGradient>
              </defs>
              <path d={sparkline} fill="none" stroke="url(#lineGlow)" strokeWidth="3" strokeLinecap="round" />
            </svg>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-3">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Risk index</p>
                <p className="mt-2 text-2xl font-semibold text-cyan-400">61.4</p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900 p-3">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Volatility</p>
                <p className="mt-2 text-2xl font-semibold text-amber-400">13.8%</p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900 p-3">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Breadth</p>
                <p className="mt-2 text-2xl font-semibold text-green">68%</p>
              </div>
            </div>
          </div>

          <aside className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Watchlist</p>
              <span className="text-xs text-slate-500">Live</span>
            </div>

            <div className="space-y-3">
              {watchlist.map((item, index) => (
                <div key={item} className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 p-3">
                  <div>
                    <p className="text-sm font-medium text-slate-200">{item}</p>
                    <p className="text-xs text-slate-500">Position {index + 1}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-green">+{(index + 1) * 0.7}%</p>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Up</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section className="mb-6 grid gap-5 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Currencies</p>
              <span className="rounded-full bg-slate-900 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-300">FX</span>
            </div>

            <div className="space-y-3">
              {currencyRows.map((row) => (
                <div key={row.pair} className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 p-3">
                  <div>
                    <p className="font-medium text-slate-200">{row.pair}</p>
                    <p className="text-xs text-slate-500">{row.value}</p>
                  </div>
                  {formatChange(row.change, row.trend)}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Indices</p>
              <span className="rounded-full bg-slate-900 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-300">World</span>
            </div>

            <div className="space-y-3">
              {indexRows.map((row) => (
                <div key={row.name} className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 p-3">
                  <div>
                    <p className="font-medium text-slate-200">{row.name}</p>
                    <p className="text-xs text-slate-500">{row.value}</p>
                  </div>
                  {formatChange(row.change, row.trend)}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Crypto</p>
              <span className="rounded-full bg-slate-900 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-300">Digital</span>
            </div>

            <div className="space-y-3">
              {cryptoRows.map((row) => (
                <div key={row.symbol} className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 p-3">
                  <div>
                    <p className="font-medium text-slate-200">{row.symbol}</p>
                    <p className="text-xs text-slate-500">{row.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-slate-200">{row.price}</p>
                    {formatChange(row.change, row.trend)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-6 grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Stocks</p>
              <span className="text-sm text-slate-400">Top movers</span>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-800">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-slate-900 text-slate-400">
                  <tr>
                    <th className="px-4 py-3">Ticker</th>
                    <th className="px-4 py-3">Company</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3 text-right">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {leadingStocks.map((stock) => (
                    <tr key={stock.symbol} className="border-t border-slate-800 bg-slate-950/70">
                      <td className="px-4 py-3 font-semibold text-slate-200">{stock.symbol}</td>
                      <td className="px-4 py-3 text-slate-400">{stock.name}</td>
                      <td className="px-4 py-3 text-slate-200">{stock.price}</td>
                      <td className="px-4 py-3 text-right">{formatChange(stock.change, stock.trend)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Companies</p>
              <span className="rounded-full bg-slate-900 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-300">Profiles</span>
            </div>

            <div className="space-y-3">
              {companyCards.map((company) => (
                <div key={company.ticker} className="rounded-xl border border-slate-800 bg-slate-900 p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-200">{company.name}</p>
                      <p className="text-xs text-slate-500">{company.ticker} • {company.sector}</p>
                    </div>
                    <span className="rounded-full bg-green/10 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-green">{company.sentiment}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                    <span>{company.country}</span>
                    <span>{company.marketCap}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Market News</p>
              <span className="text-sm text-slate-400">Updated 5 min ago</span>
            </div>

            <div className="space-y-3">
              {marketNews.map((item) => (
                <div key={item.title} className="rounded-xl border border-slate-800 bg-slate-900 p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-violet-300">{item.tag}</span>
                    <span className="text-xs text-slate-500">{item.time}</span>
                  </div>
                  <p className="text-base text-slate-200">{item.title}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Portfolio</p>
              <span className="text-sm text-green">+$12.4K</span>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Total value</p>
              <p className="mt-2 text-3xl font-semibold text-slate-100">$184,260</p>
              <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
                <span>Day change</span>
                <span className="text-green">+2.14%</span>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {['AAPL 32%', 'MSFT 18%', 'BTC 21%', 'EUR/USD 11%'].map((holding) => (
                <div key={holding} className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 p-3 text-sm">
                  <span className="text-slate-300">{holding}</span>
                  <span className="text-slate-500">Live</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
