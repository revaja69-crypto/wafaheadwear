const { useState, useEffect, useMemo } = React;

// --- Komponen Ikon SVG ---
const Icon = ({ name, size = 20, className = "" }) => {
    const icons = {
        dashboard: (<><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>),
        wallet: (<><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/><path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/><path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"/></>),
        history: (<><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>),
        reports: (<><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>),
        settings: (<><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></>),
        plus: (<><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>),
        trash: (<><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></>),
        printer: (<><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></>),
        income: (<><circle cx="12" cy="12" r="10"/><polyline points="16 12 12 8 8 12"/><line x1="12" y1="16" x2="12" y2="8"/></>),
        expense: (<><circle cx="12" cy="12" r="10"/><polyline points="8 12 12 16 16 12"/><line x1="12" y1="8" x2="12" y2="16"/></>),
        x: (<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>),
        trendingUp: (<><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>),
        alert: (<><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>),
        download: (<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>)
    };
    return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            {icons[name] || null}
        </svg>
    );
};

const App = () => {
    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [formData, setFormData] = useState({ amount: '', type: 'income', category: '', note: '', date: new Date().toISOString().split('T')[0] });
    const [newCatName, setNewCatName] = useState('');
    const [newCatType, setNewCatType] = useState('expense');

    useEffect(() => {
        // Logika menangkap event instalasi browser
        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            console.log('Event beforeinstallprompt tertangkap.');
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        
        const savedTrans = localStorage.getItem('umkm_transactions');
        const savedCats = localStorage.getItem('umkm_categories');
        
        if (savedTrans) setTransactions(JSON.parse(savedTrans));
        if (savedCats) setCategories(JSON.parse(savedCats));
        else setCategories([
            { id: '1', name: 'Penjualan', type: 'income' },
            { id: '2', name: 'Modal', type: 'income' },
            { id: '3', name: 'Stok Barang', type: 'expense' },
            { id: '4', name: 'Gaji Karyawan', type: 'expense' },
            { id: '5', name: 'Operasional', type: 'expense' }
        ]);
        
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    useEffect(() => {
        localStorage.setItem('umkm_transactions', JSON.stringify(transactions));
        localStorage.setItem('umkm_categories', JSON.stringify(categories));
    }, [transactions, categories]);

    const stats = useMemo(() => {
        const income = transactions.filter(t => t.type === 'income').reduce((a, b) => a + Number(b.amount), 0);
        const expense = transactions.filter(t => t.type === 'expense').reduce((a, b) => a + Number(b.amount), 0);
        return { income, expense, balance: income - expense };
    }, [transactions]);

    const formatIDR = (val) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);

    const handleInstallApp = async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            console.log('Pengguna menerima instalasi.');
            setDeferredPrompt(null);
        } else {
            console.log('Pengguna menolak instalasi.');
        }
    };

    const handleAddTransaction = (e) => {
        e.preventDefault();
        if (!formData.amount || !formData.note) return;
        setTransactions([{ ...formData, id: Date.now().toString(), amount: Number(formData.amount) }, ...transactions]);
        setShowAddModal(false);
        setFormData({ ...formData, amount: '', note: '', date: new Date().toISOString().split('T')[0] });
    };

    const deleteAllData = () => {
        setTransactions([]);
        setShowDeleteConfirm(false);
    };

    // View: Analisis Arus Kas
    const AnalysisView = () => {
        const total = stats.income + stats.expense || 1;
        const incP = Math.round((stats.income / total) * 100);
        const expP = 100 - incP;
        const margin = stats.income > 0 ? Math.round(((stats.income - stats.expense) / stats.income) * 100) : 0;

        return (
            <div className="bg-white p-6 md:p-8 rounded-[40px] shadow-sm border border-slate-100 card w-full">
                <h3 className="font-black text-xl mb-8 flex items-center gap-3">
                    <Icon name="trendingUp" className="text-blue-600" /> Analisis Arus Kas
                </h3>
                <div className="space-y-6">
                    <div className="space-y-3">
                        <div className="flex justify-between items-end">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pemasukan</p>
                            <span className="text-sm font-black text-emerald-600">{incP}%</span>
                        </div>
                        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 transition-all duration-700" style={{ width: `${incP}%` }}></div>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between items-end">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pengeluaran</p>
                            <span className="text-sm font-black text-rose-600">{expP}%</span>
                        </div>
                        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-rose-500 transition-all duration-700" style={{ width: `${expP}%` }}></div>
                        </div>
                    </div>
                    <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase">Margin Laba</p>
                            <p className={`text-2xl font-black ${margin >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>{margin}%</p>
                        </div>
                        <div className={`px-4 py-2 rounded-xl text-[10px] font-black ${margin >= 20 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                            {margin >= 20 ? 'SEHAT' : 'EVALUASI'}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // Tab Content: Dashboard
    const Dashboard = () => (
        <div className="space-y-8 fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-8 bg-blue-600 text-white rounded-[32px] shadow-xl shadow-blue-100">
                    <p className="text-xs font-bold opacity-70 mb-1 uppercase tracking-widest">Saldo Saat Ini</p>
                    <h3 className="text-2xl md:text-3xl font-black">{formatIDR(stats.balance)}</h3>
                </div>
                <div className="p-8 bg-white border border-slate-100 rounded-[32px] shadow-sm flex items-center justify-between">
                    <div><p className="text-[10px] font-black text-slate-400 uppercase mb-1">Total Masuk</p><h3 className="text-xl font-black text-emerald-600">{formatIDR(stats.income)}</h3></div>
                    <div className="hidden md:block p-4 bg-emerald-50 text-emerald-600 rounded-2xl no-print"><Icon name="income" /></div>
                </div>
                <div className="p-8 bg-white border border-slate-100 rounded-[32px] shadow-sm flex items-center justify-between">
                    <div><p className="text-[10px] font-black text-slate-400 uppercase mb-1">Total Keluar</p><h3 className="text-xl font-black text-rose-600">{formatIDR(stats.expense)}</h3></div>
                    <div className="hidden md:block p-4 bg-rose-50 text-rose-600 rounded-2xl no-print"><Icon name="expense" /></div>
                </div>
            </div>
            
            <AnalysisView />
        </div>
    );

    return (
        <div className="min-h-screen flex flex-col md:flex-row pb-24 md:pb-0">
            {/* SIDEBAR (Desktop Only) */}
            <aside className="hidden md:flex w-72 bg-white border-r border-slate-200 p-6 flex-col gap-8 no-print shrink-0">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg"><Icon name="wallet" size={24} /></div>
                    <h1 className="text-lg font-black tracking-tight">CASHFLOW <span className="text-blue-500">PRO</span></h1>
                </div>
                <nav className="flex flex-col gap-2 flex-1">
                    {[
                        { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
                        { id: 'history', label: 'Riwayat', icon: 'history' },
                        { id: 'reports', label: 'Laporan', icon: 'reports' },
                        { id: 'settings', label: 'Pengaturan', icon: 'settings' }
                    ].map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-3 px-5 py-4 rounded-2xl font-bold transition-all ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}><Icon name={tab.icon} /> {tab.label}</button>
                    ))}
                </nav>

                {/* Tombol Instalasi Desktop Sidebar */}
                {deferredPrompt && (
                    <button 
                        onClick={handleInstallApp}
                        className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-emerald-50 text-emerald-700 font-black text-sm border-2 border-emerald-100 hover:bg-emerald-100 transition-all mb-2"
                    >
                        <Icon name="download" size={18} /> INSTAL APLIKASI
                    </button>
                )}

                <button onClick={() => window.print()} className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-slate-900 text-white font-black text-sm"><Icon name="printer" /> CETAK PDF</button>
            </aside>

            {/* MOBILE NAVIGATION BAR */}
            <nav className="md:hidden mobile-nav no-print">
                <button onClick={() => setActiveTab('dashboard')} className={`mobile-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}><Icon name="dashboard" size={24} /><span>Home</span></button>
                <button onClick={() => setActiveTab('history')} className={`mobile-nav-item ${activeTab === 'history' ? 'active' : ''}`}><Icon name="history" size={24} /><span>Arsip</span></button>
                <button onClick={() => setShowAddModal(true)} className="mobile-fab"><Icon name="plus" size={32} /></button>
                <button onClick={() => setActiveTab('reports')} className={`mobile-nav-item ${activeTab === 'reports' ? 'active' : ''}`}><Icon name="reports" size={24} /><span>Data</span></button>
                <button onClick={() => setActiveTab('settings')} className={`mobile-nav-item ${activeTab === 'settings' ? 'active' : ''}`}><Icon name="settings" size={24} /><span>Atur</span></button>
            </nav>

            {/* MAIN CONTENT */}
            <main className="flex-1 p-6 md:p-12 overflow-y-auto max-h-screen">
                <header className="flex justify-between items-center mb-10 no-print">
                    <h2 className="text-2xl font-black capitalize">{activeTab}</h2>
                    <div className="flex gap-3">
                        {/* Tombol Instalasi Desktop Header (Opsional) */}
                        {!isMobile && deferredPrompt && (
                            <button 
                                onClick={handleInstallApp}
                                className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 shadow-lg active:scale-95 transition-all"
                            >
                                <Icon name="download" /> INSTAL APP
                            </button>
                        )}
                        <button onClick={() => setShowAddModal(true)} className="hidden md:flex bg-blue-600 text-white px-6 py-3 rounded-2xl font-black items-center gap-2 shadow-lg active:scale-95 transition-all"><Icon name="plus" /> TRANSAKSI BARU</button>
                    </div>
                </header>

                {activeTab === 'dashboard' && <Dashboard />}
                
                {activeTab === 'history' && (
                    <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 p-6 md:p-8 fade-in">
                        <h3 className="font-black text-xl mb-8">Riwayat Transaksi</h3>
                        <div className="space-y-1">
                            {transactions.map(t => (
                                <div key={t.id} className="flex items-center justify-between p-4 border-b border-slate-50 group hover:bg-slate-50 transition-all rounded-2xl">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-xl ${t.type === 'income' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}><Icon name={t.type === 'income' ? 'income' : 'expense'} /></div>
                                        <div><p className="font-bold text-sm text-slate-800">{t.note}</p><p className="text-[10px] font-bold text-slate-400 uppercase">{t.date} • {t.category}</p></div>
                                    </div>
                                    <div className="flex items-center gap-4 text-right">
                                        <p className={`font-black text-sm whitespace-nowrap ${t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>{t.type === 'income' ? '+' : '-'} {formatIDR(t.amount)}</p>
                                        <button onClick={() => setTransactions(transactions.filter(x => x.id !== t.id))} className="md:opacity-0 md:group-hover:opacity-100 p-2 text-slate-300 hover:text-rose-500 transition-all"><Icon name="trash" size={16} /></button>
                                    </div>
                                </div>
                            ))}
                            {transactions.length === 0 && <div className="p-20 text-center text-slate-300 italic font-bold">Belum ada data transaksi</div>}
                        </div>
                    </div>
                )}

                {activeTab === 'reports' && (
                    <div className="bg-white p-6 md:p-10 rounded-[40px] border border-slate-100 shadow-sm fade-in">
                        <h3 className="text-xl font-black mb-8 text-center uppercase tracking-widest text-slate-400 text-sm">Rekap Kategori</h3>
                        <div className="max-w-md mx-auto space-y-3">
                            {categories.map(c => {
                                const val = transactions.filter(t => t.category === c.name).reduce((a, b) => a + Number(b.amount), 0);
                                return (
                                    <div key={c.id} className="flex justify-between p-5 bg-slate-50 rounded-[28px] font-bold">
                                        <span className="text-slate-600 text-sm uppercase">{c.name}</span>
                                        <span className={c.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}>{formatIDR(val)}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {activeTab === 'settings' && (
                    <div className="max-w-2xl mx-auto space-y-8 fade-in">
                        <div className="bg-white p-8 md:p-10 rounded-[40px] border border-slate-100 shadow-sm">
                            <h3 className="text-xl font-black mb-6">Kostumisasi Kategori</h3>
                            <form onSubmit={(e) => { e.preventDefault(); if(!newCatName) return; setCategories([...categories, { id: Date.now().toString(), name: newCatName, type: newCatType }]); setNewCatName(''); }} className="flex flex-col md:flex-row gap-2 mb-8">
                                <input type="text" placeholder="Nama Kategori..." required value={newCatName} onChange={(e) => setNewCatName(e.target.value)} className="flex-1 p-4 bg-slate-50 rounded-2xl outline-none font-bold text-sm" />
                                <div className="flex gap-2">
                                    <select value={newCatType} onChange={(e) => setNewCatType(e.target.value)} className="p-4 bg-slate-50 rounded-2xl outline-none font-bold text-sm"><option value="expense">Keluar</option><option value="income">Masuk</option></select>
                                    <button type="submit" className="flex-1 md:flex-none p-4 bg-blue-600 text-white rounded-2xl shadow-lg"><Icon name="plus" /></button>
                                </div>
                            </form>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {categories.map(c => (
                                    <div key={c.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl group">
                                        <span className={`text-[10px] font-black uppercase ${c.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>{c.name}</span>
                                        <button onClick={() => setCategories(categories.filter(x => x.id !== c.id))} className="text-slate-300 hover:text-rose-500 transition-all"><Icon name="trash" size={14}/></button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Fitur Instalasi di Pengaturan */}
                        {deferredPrompt && (
                            <div className="bg-emerald-50 p-8 md:p-10 rounded-[40px] border border-emerald-100">
                                <h4 className="text-lg font-black text-emerald-900 mb-2">Instal Aplikasi</h4>
                                <p className="text-xs text-emerald-600 mb-6 font-medium leading-relaxed">Gunakan aplikasi secara penuh tanpa melalui browser dengan menginstalnya ke layar utama Anda.</p>
                                <button onClick={handleInstallApp} className="w-full md:w-auto px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black text-sm active:scale-95 transition-all shadow-lg shadow-emerald-200 uppercase tracking-widest">Instal Sekarang</button>
                            </div>
                        )}

                        <div className="bg-rose-50 p-8 md:p-10 rounded-[40px] border border-rose-100">
                            <h4 className="text-lg font-black text-rose-900 mb-2">Zona Bahaya</h4>
                            <p className="text-xs text-rose-600 mb-6 font-medium leading-relaxed">Gunakan fitur ini untuk membersihkan seluruh riwayat transaksi. Seluruh data akan dihapus secara permanen dari perangkat ini.</p>
                            <button onClick={() => setShowDeleteConfirm(true)} className="w-full md:w-auto px-8 py-4 bg-rose-600 text-white rounded-2xl font-black text-sm active:scale-95 transition-all shadow-lg shadow-rose-200 uppercase tracking-widest">Kosongkan Seluruh Data</button>
                        </div>
                    </div>
                )}
            </main>

            {/* MODALS */}
            {showAddModal && (
                <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-[2000] flex items-end md:items-center justify-center p-0 md:p-10 no-print">
                    <div className="bg-white w-full max-w-xl rounded-t-[40px] md:rounded-[40px] p-8 md:p-12 animate-in slide-in-from-bottom duration-300 max-h-[95vh] overflow-y-auto shadow-2xl">
                        <div className="flex justify-between items-center mb-10"><h2 className="text-2xl font-black">Catat Kas</h2><button onClick={() => setShowAddModal(false)} className="p-3 bg-slate-100 rounded-2xl"><Icon name="x" /></button></div>
                        <form onSubmit={handleAddTransaction} className="space-y-8">
                            <div className="grid grid-cols-2 gap-3">
                                <button type="button" onClick={() => setFormData({...formData, type: 'income'})} className={`py-4 rounded-2xl font-black text-xs border-2 transition-all ${formData.type === 'income' ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'border-slate-100 text-slate-400'}`}>MASUK</button>
                                <button type="button" onClick={() => setFormData({...formData, type: 'expense'})} className={`py-4 rounded-2xl font-black text-xs border-2 transition-all ${formData.type === 'expense' ? 'bg-rose-50 border-rose-500 text-rose-700' : 'border-slate-100 text-slate-400'}`}>KELUAR</button>
                            </div>
                            <input type="number" required placeholder="0" className="w-full text-4xl md:text-5xl font-black p-8 bg-slate-50 rounded-[32px] md:rounded-[40px] outline-none border-2 border-transparent focus:border-blue-500 text-center transition-all" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <select className="w-full p-5 bg-slate-50 rounded-2xl outline-none font-bold text-sm" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                                    {categories.filter(c => c.type === formData.type).map(cat => (<option key={cat.id} value={cat.name}>{cat.name}</option>))}
                                </select>
                                <input type="date" className="w-full p-5 bg-slate-50 rounded-2xl outline-none font-bold text-sm" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
                            </div>
                            <input type="text" required placeholder="Tulis keterangan transaksi..." className="w-full p-6 bg-slate-50 rounded-2xl outline-none font-bold text-sm placeholder:text-slate-300" value={formData.note} onChange={(e) => setFormData({...formData, note: e.target.value})} />
                            <button type="submit" className="w-full bg-blue-600 text-white py-6 rounded-[32px] font-black text-xl shadow-xl active:scale-95 transition-all">SIMPAN DATA</button>
                        </form>
                    </div>
                </div>
            )}

            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-rose-900/90 backdrop-blur-md z-[3000] flex items-center justify-center p-6 no-print">
                    <div className="bg-white w-full max-w-sm rounded-[48px] p-10 text-center animate-in zoom-in duration-300 shadow-2xl">
                        <div className="mx-auto w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mb-6"><Icon name="alert" size={32} /></div>
                        <h3 className="text-xl font-black mb-2">Hapus Semua?</h3>
                        <p className="text-sm text-slate-500 mb-8 leading-relaxed">Seluruh riwayat keuangan Anda akan dikosongkan secara permanen.</p>
                        <div className="space-y-2">
                            <button onClick={deleteAllData} className="w-full py-4 bg-rose-600 text-white rounded-2xl font-black text-sm active:scale-95 transition-all shadow-lg">YA, HAPUS</button>
                            <button onClick={() => setShowDeleteConfirm(false)} className="w-full py-4 bg-slate-100 text-slate-400 rounded-2xl font-black text-sm active:scale-95 transition-all">BATAL</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
