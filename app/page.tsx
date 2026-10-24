'use client';

import { useEffect, useMemo, useState } from 'react';

type Trend = 'up' | 'down';

type MarketRow = {
  pair: string;
  value: string;
  change: string;
  trend: Trend;
};

type CryptoRow = {
  symbol: string;
  name: string;
  price: string;
  change: string;
  trend: Trend;
};

type StockRow = {
  symbol: string;
  name: string;
  price: string;
  change: string;
  trend: Trend;
};

type CompanyCard = {
  name: string;
  ticker: string;
  sector: string;
  marketCap: string;
  country: string;
  sentiment: string;
};

type QuotePayload = {
  price?: number | string;
  percent_change?: number | string;
  change?: number | string;
};

const DEFAULT_CURRENCY_ROWS: MarketRow[] = [
  { pair: 'USD/EUR', value: '0.92', change: '+0.18%', trend: 'up' },
  { pair: 'USD/GBP', value: '0.78', change: '+0.11%', trend: 'up' },
  { pair: 'JPY/USD', value: '157.40', change: '-0.42%', trend: 'down' },
  { pair: 'AUD/USD', value: '1.52', change: '+0.34%', trend: 'up' },
  { pair: 'USD/CAD', value: '1.36', change: '-0.09%', trend: 'down' },
  { pair: 'CHF/USD', value: '0.89', change: '+0.15%', trend: 'up' }
];

const DEFAULT_INDEX_ROWS: MarketRow[] = [
  { pair: 'S&P 500', value: '5,422.12', change: '+1.22%', trend: 'up' },
  { pair: 'Nasdaq', value: '17,930.44', change: '+1.68%', trend: 'up' },
  { pair: 'Dow Jones', value: '39,842.17', change: '+0.74%', trend: 'up' },
  { pair: 'FTSE 100', value: '8,187.33', change: '+0.51%', trend: 'up' },
  { pair: 'Nikkei 225', value: '39,246.91', change: '-0.34%', trend: 'down' }
];

const DEFAULT_CRYPTO_ROWS: CryptoRow[] = [
  { symbol: 'BTC', name: 'Bitcoin', price: '$67,430', change: '+2.13%', trend: 'up' },
  { symbol: 'ETH', name: 'Ethereum', price: '$3,470', change: '+1.94%', trend: 'up' },
  { symbol: 'SOL', name: 'Solana', price: '$162.54', change: '+4.41%', trend: 'up' },
  { symbol: 'XRP', name: 'Ripple', price: '$0.62', change: '+0.76%', trend: 'up' }
];

const DEFAULT_LEADING_STOCKS: StockRow[] = [
  { symbol: 'NVDA', name: 'NVIDIA', price: '$126.84', change: '+3.82%', trend: 'up' },
  { symbol: 'MSFT', name: 'Microsoft', price: '$458.72', change: '+1.46%', trend: 'up' },
  { symbol: 'AAPL', name: 'Apple', price: '$217.35', change: '+0.91%', trend: 'up' },
  { symbol: 'AMZN', name: 'Amazon', price: '$188.53', change: '+2.11%', trend: 'up' },
  { symbol: 'TSLA', name: 'Tesla', price: '$253.69', change: '-1.53%', trend: 'down' }
];

const COMPANY_CARDS: CompanyCard[] = [
  { name: 'Apple', ticker: 'AAPL', sector: 'Technology', marketCap: '$3.0T', country: 'US', sentiment: 'Bullish' },
  { name: 'Tesla', ticker: 'TSLA', sector: 'Automotive', marketCap: '$844B', country: 'US', sentiment: 'Neutral' },
  { name: 'LVMH', ticker: 'MC.PA', sector: 'Luxury', marketCap: '$370B', country: 'FR', sentiment: 'Positive' },
  { name: 'SAP', ticker: 'SAP', sector: 'Software', marketCap: '$355B', country: 'DE', sentiment: 'Bullish' }
];

const MARKET_NEWS = [
  { title: 'Global tech rally lifts equity markets across Europe and the US', time: '14 min ago', tag: 'Markets' },
  { title: 'Dollar steadies as traders assess Fed outlook and inflation data', time: '32 min ago', tag: 'Forex' },
  { title: 'Oil prices edge lower after supply outlook softens ahead of Friday close', time: '1 hr ago', tag: 'Commodities' },
  { title: 'AI chipmakers lead gains in semiconductor sector', time: '2 hr ago', tag: 'Tech' }
];

const WATCHLIST = ['AAPL', 'MSFT', 'NVDA', 'EUR/USD', 'BTC', 'XAU/USD'];

async function fetchTwelveDataQuote(symbol: string): Promise<QuotePayload | null> {
  try {
    const response = await fetch(`https://api.twelvedata.com/quote?symbol=${encodeURIComponent(symbol)}&apikey=demo`, {
      cache: 'no-store'
    });

    if (!response.ok) return null;
    const data = (await response.json()) as QuotePayload & { status?: string };

    if (data.status === 'error' || !data) return null;
    return data;
  } catch {
    return null;
  }
}

async function fetchForexRates(): Promise<MarketRow[]> {
  try {
    const response = await fetch('https://api.frankfurter.app/latest?from=USD&to=EUR,GBP,JPY,CAD,AUD,CHF', {
      cache: 'no-store'
    });

    if (!response.ok) throw new Error('fx unavailable');
    const data = await response.json();
    const rates = data.rates ?? {};

    return [
      { pair: 'USD/EUR', value: (1 / (rates.EUR ?? 0.92)).toFixed(2), change: '+0.18%', trend: 'up' },
      { pair: 'USD/GBP', value: (1 / (rates.GBP ?? 0.78)).toFixed(2), change: '+0.11%', trend: 'up' },
      { pair: 'JPY/USD', value: (rates.JPY ?? 157.4).toFixed(2), change: '-0.42%', trend: 'down' },
      { pair: 'AUD/USD', value: (1 / (rates.AUD ?? 1.52)).toFixed(2), change: '+0.34%', trend: 'up' },
      { pair: 'USD/CAD', value: (1 / (rates.CAD ?? 1.36)).toFixed(2), change: '-0.09%', trend: 'down' },
      { pair: 'CHF/USD', value: (1 / (rates.CHF ?? 0.89)).toFixed(2), change: '+0.15%', trend: 'up' }
    ];
  } catch {
    return DEFAULT_CURRENCY_ROWS;
  }
}

async function fetchCryptoRows(): Promise<CryptoRow[]> {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana,ripple&price_change_percentage=24h',
      { cache: 'no-store' }
    );

    if (!response.ok) throw new Error('crypto unavailable');
    const data = await response.json();

    return data.map((coin: any) => ({
      symbol: coin.symbol.toUpperCase(),
      name: coin.name,
      price: `$${Number(coin.current_price).toLocaleString(undefined, { maximumFractionDigits: coin.current_price < 1 ? 4 : 0 })}`,
      change: `${coin.price_change_percentage_24h >= 0 ? '+' : ''}${coin.price_change_percentage_24h.toFixed(2)}%`,
      trend: coin.price_change_percentage_24h >= 0 ? 'up' : 'down'
    }));
  } catch {
    return DEFAULT_CRYPTO_ROWS;
  }
}

async function fetchIndexRows(): Promise<MarketRow[]> {
  const symbols = [
    { pair: 'S&P 500', symbol: 'SPX' },
    { pair: 'Nasdaq', symbol: 'IXIC' },
    { pair: 'Dow Jones', symbol: 'DJI' },
    { pair: 'FTSE 100', symbol: 'UKX' },
    { pair: 'Nikkei 225', symbol: '^N225' }
  ];

  const rows = await Promise.all(
    symbols.map(async (entry) => {
      const quote = await fetchTwelveDataQuote(entry.symbol);
      if (!quote || quote.price == null) {
        const fallback = DEFAULT_INDEX_ROWS.find((row) => row.pair === entry.pair);
        return fallback ?? { pair: entry.pair, value: '—', change: '0.00%', trend: 'up' };
      }

      const price = Number(quote.price);
      const pct = Number(quote.percent_change ?? quote.change ?? 0);
      const trend = pct >= 0 ? 'up' : 'down';

      return {
        pair: entry.pair,
        value: price.toLocaleString(undefined, { maximumFractionDigits: 2 }),
        change: `${pct >= 0 ? '+' : ''}${pct.toFixed(2)}%`,
        trend
      };
    })
  );

  return rows;
}

async function fetchStockRows(): Promise<StockRow[]> {
  const symbols = [
    { symbol: 'NVDA', name: 'NVIDIA' },
    { symbol: 'MSFT', name: 'Microsoft' },
    { symbol: 'AAPL', name: 'Apple' },
    { symbol: 'AMZN', name: 'Amazon' },
    { symbol: 'TSLA', name: 'Tesla' }
  ];

  const rows = await Promise.all(
    symbols.map(async ({ symbol, name }) => {
      const quote = await fetchTwelveDataQuote(symbol);
      if (!quote || quote.price == null) {
        const fallback = DEFAULT_LEADING_STOCKS.find((row) => row.symbol === symbol);
        return fallback ?? { symbol, name, price: '—', change: '0.00%', trend: 'up' };
      }

      const price = Number(quote.price);
      const pct = Number(quote.percent_change ?? quote.change ?? 0);
      const trend = pct >= 0 ? 'up' : 'down';

      return {
        symbol,
        name,
        price: `$${price.toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
        change: `${pct >= 0 ? '+' : ''}${pct.toFixed(2)}%`,
        trend
      };
    })
  );

  return rows;
}

function buildSparkline(values: number[]): string {
  if (!values.length) return 'M 0 80 C 30 70, 60 60, 90 62 S 150 30, 180 45 S 220 35, 260 25 S 300 15, 340 18';

  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;

  return values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * 340;
      const y = 100 - ((value - min) / range) * 70;
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');
}

function formatChange(value: string, trend: Trend) {
  return <span className={`font-medium ${trend === 'up' ? 'text-green' : 'text-red'}`}>{value}</span>;
}

export default function Page() {
  const [currencyRows, setCurrencyRows] = useState<MarketRow[]>(DEFAULT_CURRENCY_ROWS);
  const [indexRows, setIndexRows] = useState<MarketRow[]>(DEFAULT_INDEX_ROWS);
  const [cryptoRows, setCryptoRows] = useState<CryptoRow[]>(DEFAULT_CRYPTO_ROWS);
  const [leadingStocks, setLeadingStocks] = useState<StockRow[]>(DEFAULT_LEADING_STOCKS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadData() {
      try {
        const [fx, idx, crypto, stocks] = await Promise.all([
          fetchForexRates(),
          fetchIndexRows(),
          fetchCryptoRows(),
          fetchStockRows()
        ]);

        if (!active) return;
        setCurrencyRows(fx);
        setIndexRows(idx);
        setCryptoRows(crypto);
        setLeadingStocks(stocks);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadData();
    return () => {
      active = false;
    };
  }, []);

  const sparkLine = useMemo(() => {
    const values = [52, 55, 58, 60, 62, 59, 63];
    return buildSparkline(values);
  }, []);

  const portfolioValue = useMemo(() => '$184,260', []);

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
              {loading ? 'Loading...' : 'Live Feed'}
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
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                <div key={d} className="w-12 text-xs text-slate-400">{d}</div>
              ))}
            </div>

            <svg viewBox="0 0 340 120" className="mt-4 h-36 w-full overflow-visible">
              <defs>
                <linearGradient id="lineGlow" x1="0" x2="1">
                  <stop offset="0%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#3ec9ff" />
                </linearGradient>
              </defs>
              <path d={sparkLine} fill="none" stroke="url(#lineGlow)" strokeWidth="3" strokeLinecap="round" />
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
              {WATCHLIST.map((item, index) => (
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
              {COMPANY_CARDS.map((company) => (
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
              {MARKET_NEWS.map((item) => (
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
              <p className="mt-2 text-3xl font-semibold text-slate-100">{portfolioValue}</p>
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
