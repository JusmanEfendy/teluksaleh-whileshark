import { useEffect, useState } from 'react'
import { supabase } from '../services/supabaseClient'
import { destinationService } from '../services/destinationService'
import { articleService } from '../services/articleService'
import { whaleSharkSpotService } from '../services/whaleSharkSpotService'
import type { Destination, Article, WhaleSharkSpot } from '../types/database'

interface ConnectionStatus {
    isConnected: boolean
    message: string
    timestamp: string
}

interface TableStatus {
    name: string
    count: number
    status: 'loading' | 'success' | 'error'
    error?: string
}

export function SupabaseTest() {
    const [connection, setConnection] = useState<ConnectionStatus | null>(null)
    const [tables, setTables] = useState<TableStatus[]>([
        { name: 'destinations', count: 0, status: 'loading' },
        { name: 'articles', count: 0, status: 'loading' },
        { name: 'whale_shark_spots', count: 0, status: 'loading' },
    ])
    const [destinations, setDestinations] = useState<Destination[]>([])
    const [articles, setArticles] = useState<Article[]>([])
    const [whaleSharkSpots, setWhaleSharkSpots] = useState<WhaleSharkSpot[]>([])

    useEffect(() => {
        testConnection()
    }, [])

    async function testConnection() {
        try {
            // Test basic connection
            const { error } = await supabase.from('destinations').select('count', { count: 'exact', head: true })

            if (error) {
                setConnection({
                    isConnected: false,
                    message: `Connection failed: ${error.message}`,
                    timestamp: new Date().toLocaleTimeString()
                })
                return
            }

            setConnection({
                isConnected: true,
                message: 'Successfully connected to Supabase!',
                timestamp: new Date().toLocaleTimeString()
            })

            // Fetch data from all tables
            await fetchAllData()
        } catch (err) {
            setConnection({
                isConnected: false,
                message: `Error: ${err instanceof Error ? err.message : 'Unknown error'}`,
                timestamp: new Date().toLocaleTimeString()
            })
        }
    }

    async function fetchAllData() {
        // Fetch destinations
        try {
            const destData = await destinationService.getAll()
            setDestinations(destData)
            updateTableStatus('destinations', destData.length, 'success')
        } catch (err) {
            updateTableStatus('destinations', 0, 'error', err instanceof Error ? err.message : 'Failed')
        }

        // Fetch articles
        try {
            const artData = await articleService.getAll()
            setArticles(artData)
            updateTableStatus('articles', artData.length, 'success')
        } catch (err) {
            updateTableStatus('articles', 0, 'error', err instanceof Error ? err.message : 'Failed')
        }

        // Fetch whale shark spots
        try {
            const spotData = await whaleSharkSpotService.getAll()
            setWhaleSharkSpots(spotData)
            updateTableStatus('whale_shark_spots', spotData.length, 'success')
        } catch (err) {
            updateTableStatus('whale_shark_spots', 0, 'error', err instanceof Error ? err.message : 'Failed')
        }
    }

    function updateTableStatus(name: string, count: number, status: TableStatus['status'], error?: string) {
        setTables(prev => prev.map(t =>
            t.name === name ? { ...t, count, status, error } : t
        ))
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-center">
                    🔌 Supabase Connection Test
                </h1>

                {/* Connection Status */}
                <div className={`p-6 rounded-xl mb-8 ${connection === null
                        ? 'bg-slate-700'
                        : connection.isConnected
                            ? 'bg-green-600/20 border border-green-500'
                            : 'bg-red-600/20 border border-red-500'
                    }`}>
                    <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full ${connection === null
                                ? 'bg-yellow-500 animate-pulse'
                                : connection.isConnected
                                    ? 'bg-green-500'
                                    : 'bg-red-500'
                            }`}></div>
                        <div>
                            <p className="font-semibold text-lg">
                                {connection === null ? 'Testing connection...' : connection.message}
                            </p>
                            {connection && (
                                <p className="text-sm text-slate-400">
                                    Last checked: {connection.timestamp}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Table Status */}
                <div className="grid gap-4 mb-8">
                    <h2 className="text-xl font-semibold">📊 Table Status</h2>
                    {tables.map(table => (
                        <div key={table.name} className="bg-slate-700/50 p-4 rounded-lg flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <code className="bg-slate-600 px-2 py-1 rounded text-sm">{table.name}</code>
                                {table.status === 'loading' && (
                                    <span className="text-yellow-400">⏳ Loading...</span>
                                )}
                                {table.status === 'success' && (
                                    <span className="text-green-400">✅ Connected</span>
                                )}
                                {table.status === 'error' && (
                                    <span className="text-red-400">❌ {table.error}</span>
                                )}
                            </div>
                            <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">
                                {table.count} rows
                            </span>
                        </div>
                    ))}
                </div>

                {/* Data Preview */}
                {connection?.isConnected && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold">📝 Data Preview</h2>

                        {/* Destinations */}
                        <div className="bg-slate-700/50 p-4 rounded-lg">
                            <h3 className="font-semibold mb-2 text-blue-400">Destinations</h3>
                            {destinations.length > 0 ? (
                                <ul className="space-y-1 text-sm">
                                    {destinations.slice(0, 5).map(d => (
                                        <li key={d.id} className="text-slate-300">
                                            • {d.name} ({d.category})
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-slate-400 text-sm">No data yet</p>
                            )}
                        </div>

                        {/* Articles */}
                        <div className="bg-slate-700/50 p-4 rounded-lg">
                            <h3 className="font-semibold mb-2 text-green-400">Articles</h3>
                            {articles.length > 0 ? (
                                <ul className="space-y-1 text-sm">
                                    {articles.slice(0, 5).map(a => (
                                        <li key={a.id} className="text-slate-300">
                                            • {a.title}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-slate-400 text-sm">No data yet</p>
                            )}
                        </div>

                        {/* Whale Shark Spots */}
                        <div className="bg-slate-700/50 p-4 rounded-lg">
                            <h3 className="font-semibold mb-2 text-purple-400">Whale Shark Spots</h3>
                            {whaleSharkSpots.length > 0 ? (
                                <ul className="space-y-1 text-sm">
                                    {whaleSharkSpots.slice(0, 5).map(s => (
                                        <li key={s.id} className="text-slate-300">
                                            • {s.name} - {s.season}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-slate-400 text-sm">No data yet</p>
                            )}
                        </div>
                    </div>
                )}

                {/* Retry Button */}
                <div className="mt-8 text-center">
                    <button
                        onClick={testConnection}
                        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                        🔄 Test Again
                    </button>
                </div>
            </div>
        </div>
    )
}
