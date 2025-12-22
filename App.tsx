
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Dashboard } from './components/Dashboard';
import { LandingPage } from './components/LandingPage';
import { AppLayout } from './components/Layout/AppLayout';
import { Auth } from './components/pages/Auth';
import { Onboarding } from './components/Onboarding';
import { SkuSimulator } from './components/SkuSimulator';
import { Inventory } from './components/pages/Inventory';
import { Automation } from './components/pages/Automation';
import { Finance } from './components/pages/Finance';
import { Marketplace } from './components/pages/Marketplace';
import { AIDecisionCenter } from './components/pages/AIDecisionCenter';
import { Settings } from './components/pages/Settings';
import { Admin } from './components/pages/Admin';
import { Integrations } from './components/pages/Integrations';
import { Reports } from './components/pages/Reports';
import { AITutor } from './components/ui/AITutor';
import { Pricing } from './components/pages/Pricing';
import { MOCK_PRODUCTS } from './utils/MicroeconomicsEngine';
import { MOCK_USER, MOCK_WORKFLOWS } from './utils/MockData';
import { Lock, FlaskConical, Bell, X, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { GlassCard } from './components/ui/GlassCard';
import { Product, Workflow, UserPreferences } from './types';

export type PageView = 
  | 'landing' | 'pricing' | 'auth' | 'onboarding'
  | 'dashboard' | 'inventory' | 'ai-center' | 'marketplaces' | 'finance' | 'automation' | 'admin' | 'settings' | 'simulator'
  | 'integrations' | 'reports';

export type UserPlan = 'starter' | 'pro' | 'enterprise';

const App: React.FC = () => {
  const [viewState, setViewState] = useState<PageView>('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [workflows, setWorkflows] = useState<Workflow[]>(MOCK_WORKFLOWS);
  
  // --- LIQUIDITY SANDBOX™ ---
  const [isSandboxMode, setIsSandboxMode] = useState(false);
  const [sandboxedProducts, setSandboxedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (isSandboxMode && sandboxedProducts.length === 0) {
      setSandboxedProducts(JSON.parse(JSON.stringify(products)));
    }
  }, [isSandboxMode, products]);

  const activeProducts = isSandboxMode ? sandboxedProducts : products;
  const setActiveProducts = isSandboxMode ? setSandboxedProducts : setProducts;

  const commitSandboxToLive = () => {
    setProducts(JSON.parse(JSON.stringify(sandboxedProducts)));
    setIsSandboxMode(false);
    setSandboxedProducts([]);
    addNotification('System Updated', 'Sandbox changes have been committed to the live engine.', 'success');
  };

  const [userPlan, setUserPlan] = useState<UserPlan>(() => {
    return (localStorage.getItem('liquiflow_plan') as UserPlan) || 'starter';
  });
  const [isDemoMode, setIsDemoMode] = useState(() => {
    return localStorage.getItem('liquiflow_demo_mode') === 'true';
  });
  const [userPrefs, setUserPrefs] = useState<UserPreferences | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  useEffect(() => {
    localStorage.setItem('liquiflow_plan', userPlan);
  }, [userPlan]);

  useEffect(() => {
    localStorage.setItem('liquiflow_demo_mode', String(isDemoMode));
  }, [isDemoMode]);

  const [user, setUser] = useState(MOCK_USER);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Liquidity Audit Ready', message: 'Your Q4 projections are ready for review.', type: 'success', time: '2m ago' },
    { id: 2, title: 'Critical Alert', message: 'SKU-209 frozen capital exceeds $10k threshold.', type: 'alert', time: '1h ago' }
  ]);

  const [activeToast, setActiveToast] = useState<any>(null);

  const addNotification = (title: string, message: string, type: 'success' | 'alert' | 'info' = 'info') => {
    const newNotif = { id: Date.now(), title, message, type, time: 'Just now' };
    setNotifications(prev => [newNotif, ...prev]);
    setActiveToast(newNotif);
    setTimeout(() => setActiveToast(null), 5000);
  };

  const handleLiquidateProduct = (productId: string) => {
    setActiveProducts(prev => prev.map(p => p.id === productId ? { ...p, status: 'liquidating', stockLevel: 0, liquidityScore: 0 } : p));
    addNotification('Exit Protocol Active', 'SKU transitioned to liquidation channel.', 'success');
  };

  const handleExecuteLiquidation = (productId: string, path: string) => {
    const productName = products.find(p => p.id === productId)?.name || 'SKU';
    const pathLabel = path === 'b2c' ? 'Retail Markdown' : path === 'b2b' ? 'B2B Wholesale' : path === 'donation' ? 'Tax Recovery' : 'Channel Shift';
    
    setActiveProducts(prev => prev.map(p => {
      if (p.id === productId) {
        return { 
          ...p, 
          status: path === 'donation' ? 'donated' : 'liquidating',
          stockLevel: path === 'donation' ? 0 : Math.floor(p.stockLevel * 0.1),
          liquidityScore: 0
        };
      }
      return p;
    }));
    
    addNotification('Protocol Executed', `${pathLabel} started for ${productName}.`, 'success');
  };

  const handleDeleteProduct = (productId: string) => {
    setActiveProducts(prev => prev.filter(p => p.id !== productId));
    addNotification('SKU Purged', 'Product record removed from live engine.', 'info');
  };

  const handleCreateWorkflow = (newWorkflow: Workflow) => {
    setWorkflows(prev => [newWorkflow, ...prev]);
    addNotification('Automation Active', `Rule "${newWorkflow.name}" is now sensing triggers.`, 'success');
  };

  useEffect(() => {
    const handleNav = (e: any) => navigateTo(e.detail as PageView);
    window.addEventListener('nav-change', handleNav);
    return () => window.removeEventListener('nav-change', handleNav);
  }, []);

  const navigateTo = (page: PageView) => {
    setViewState(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigateTo(userPrefs ? 'dashboard' : 'onboarding');
  };

  const handleOnboardingComplete = (prefs: UserPreferences) => {
     setUserPrefs(prefs);
     navigateTo('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigateTo('landing');
  };

  const requirePro = (action: () => void) => {
    if (userPlan === 'starter') {
      setShowUpgradeModal(true);
    } else {
      action();
    }
  };

  const renderAppContent = () => {
    if (viewState === 'onboarding') return <Onboarding onComplete={handleOnboardingComplete} />;

    switch (viewState) {
      case 'inventory': return <Inventory products={activeProducts} setProducts={setActiveProducts} onLiquidate={handleLiquidateProduct} onDelete={handleDeleteProduct} addNotification={addNotification} />;
      case 'automation': return <Automation workflows={workflows} onCreateWorkflow={handleCreateWorkflow} />;
      case 'finance': return <Finance />;
      case 'reports': return <Reports />;
      case 'marketplaces': return <Marketplace isDemo={isDemoMode} onNavigate={navigateTo} addNotification={addNotification} />;
      case 'integrations': return <Integrations />;
      case 'ai-center': return <AIDecisionCenter />;
      case 'settings': return <Settings userPlan={userPlan} onToggleDemo={() => setIsDemoMode(!isDemoMode)} isDemo={isDemoMode} onManageSub={() => setShowUpgradeModal(true)} />;
      case 'admin': return <Admin />;
      case 'simulator': return selectedProduct ? <SkuSimulator product={selectedProduct} onBack={() => navigateTo('dashboard')} requirePro={requirePro} /> : null;
      case 'dashboard':
      default: return <Dashboard 
                  products={activeProducts} 
                  onSelectProduct={(p) => { setSelectedProduct(p); navigateTo('simulator'); }} 
                  isDemo={isDemoMode}
                  onEnableDemo={() => setIsDemoMode(true)}
                  onSyncData={() => navigateTo('marketplaces')}
                  onNavigate={navigateTo}
                  userPrefs={userPrefs}
                  addNotification={addNotification}
                  onExecuteLiquidation={handleExecuteLiquidation}
                />;
    }
  };

  return (
    <div className={`min-h-screen bg-void text-white font-sans selection:bg-neon-gold selection:text-black ${isSandboxMode ? 'border-4 border-neon-violet transition-all duration-500' : ''}`}>
      {isLoggedIn && <AITutor />}

      {/* --- FLOATING TOASTS (Fix for 'message not shown') --- */}
      <AnimatePresence>
        {activeToast && (
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="fixed top-20 right-8 z-[300] w-80"
          >
             <GlassCard className="p-4 border-l-4 border-l-neon-gold bg-black/90 shadow-[0_0_40px_rgba(255,215,0,0.1)]">
                <div className="flex items-start gap-3">
                   <div className="mt-1">
                      {activeToast.type === 'alert' && <AlertTriangle className="w-5 h-5 text-neon-pink" />}
                      {activeToast.type === 'success' && <CheckCircle className="w-5 h-5 text-neon-gold" />}
                      {activeToast.type === 'info' && <Info className="w-5 h-5 text-neon-blue" />}
                   </div>
                   <div className="flex-1">
                      <h4 className="font-black text-xs uppercase tracking-widest text-white">{activeToast.title}</h4>
                      <p className="text-[11px] text-gray-400 mt-1">{activeToast.message}</p>
                   </div>
                   <button onClick={() => setActiveToast(null)}><X className="w-3.5 h-3.5 text-gray-600 hover:text-white" /></button>
                </div>
             </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {isSandboxMode && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[250] flex items-center gap-4 bg-neon-violet px-6 py-2 rounded-full shadow-[0_0_30px_rgba(140,30,255,0.6)] animate-bounce">
           <FlaskConical className="w-5 h-5 text-white" />
           <span className="text-sm font-bold uppercase tracking-widest text-white">Liquidity Sandbox™ Active</span>
           <button 
             onClick={commitSandboxToLive}
             className="ml-4 bg-white text-neon-violet px-3 py-1 rounded-full text-xs font-black hover:bg-black hover:text-white transition-colors"
           >
             COMMIT LIVE
           </button>
           <button 
             onClick={() => { setIsSandboxMode(false); setSandboxedProducts([]); }}
             className="text-white/70 hover:text-white text-xs font-bold"
           >
             EXIT
           </button>
        </div>
      )}
      
      <AnimatePresence>
        {showUpgradeModal && (
           <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
              <GlassCard className="max-w-lg w-full p-8 border-neon-violet/50 shadow-[0_0_50px_rgba(140,30,255,0.2)] text-center relative">
                 <div className="w-16 h-16 bg-neon-violet/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Lock className="w-8 h-8 text-neon-violet" />
                 </div>
                 <h2 className="text-2xl font-bold mb-2">Enterprise Access Required</h2>
                 <p className="text-gray-400 mb-8">
                    B2B Liquidation and Multi-Platform Sync require <strong>Growth Access</strong>.
                 </p>
                 <div className="flex gap-4 justify-center">
                    <button onClick={() => setShowUpgradeModal(false)} className="px-6 py-3 text-gray-400 hover:text-white">Cancel</button>
                    <button onClick={() => { setUserPlan('pro'); setShowUpgradeModal(false); }} className="px-6 py-3 bg-neon-violet text-white font-bold rounded hover:bg-white hover:text-black transition-colors">
                       Upgrade Access
                    </button>
                 </div>
              </GlassCard>
           </div>
        )}
      </AnimatePresence>

      {!isLoggedIn ? (
        <AnimatePresence mode="wait">
          <div key="public-wrapper">
             {viewState === 'auth' ? <Auth onLogin={handleLogin} onBack={() => navigateTo('landing')} /> : 
              viewState === 'pricing' ? <Pricing onBack={() => navigateTo('landing')} onSelect={() => navigateTo('auth')} /> :
              <LandingPage onLaunchApp={() => navigateTo('auth')} onNavigate={navigateTo} />}
          </div>
        </AnimatePresence>
      ) : (
        <AppLayout 
          user={user} 
          activePage={viewState} 
          onNavigate={(p) => navigateTo(p as PageView)} 
          onLogout={handleLogout}
          notifications={notifications}
          onToggleSandbox={() => setIsSandboxMode(!isSandboxMode)}
          isSandbox={isSandboxMode}
        >
           <div className="w-full h-full">
             {renderAppContent()}
           </div>
        </AppLayout>
      )}
    </div>
  );
};

export default App;
