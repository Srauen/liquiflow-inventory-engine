
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
import { StrategicOversight } from './components/pages/ceo/StrategicOversight';
import { NeuralData } from './components/pages/ceo/NeuralData';
import { MarketOperations } from './components/pages/ceo/MarketOperations';
import { SystemKernel } from './components/pages/ceo/SystemKernel';
import { ModuleDetailView } from './components/pages/ceo/ModuleDetailView';
import { AITutor } from './components/ui/AITutor';
import { Pricing } from './components/pages/Pricing';
import { MOCK_PRODUCTS } from './utils/MicroeconomicsEngine';
import { MOCK_USER, MOCK_WORKFLOWS } from './utils/MockData';
import { Lock, FlaskConical, Bell, X, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { GlassCard } from './components/ui/GlassCard';
import { Product, Workflow, UserPreferences, UserProfile } from './types';

export type PageView = 
  | 'landing' | 'pricing' | 'auth' | 'onboarding'
  | 'dashboard' | 'inventory' | 'ai-center' | 'marketplaces' | 'finance' | 'automation' | 'admin' | 'settings' | 'simulator'
  | 'integrations' | 'reports' 
  | 'strategic-oversight' | 'neural-data' | 'market-ops' | 'system-kernel' | 'module-detail';

const App: React.FC = () => {
  const [viewState, setViewState] = useState<PageView>('landing');
  const [activeModule, setActiveModule] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [workflows, setWorkflows] = useState<Workflow[]>(MOCK_WORKFLOWS);
  const [isSandboxMode, setIsSandboxMode] = useState(false);
  const [user, setUser] = useState<UserProfile>(MOCK_USER);
  const [activeToast, setActiveToast] = useState<any>(null);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Liquidity Audit Ready', message: 'Your Q4 projections are ready for review.', type: 'success', time: '2m ago' },
    { id: 2, title: 'Critical Alert', message: 'SKU-209 frozen capital exceeds $10k threshold.', type: 'alert', time: '1h ago' }
  ]);

  const addNotification = (title: string, message: string, type: 'success' | 'alert' | 'info' = 'info') => {
    const newNotif = { id: Date.now(), title, message, type, time: 'Just now' };
    setNotifications(prev => [newNotif, ...prev]);
    setActiveToast(newNotif);
    setTimeout(() => setActiveToast(null), 5000);
  };

  const navigateTo = (page: PageView, moduleData?: any) => {
    if (moduleData) setActiveModule(moduleData);
    setViewState(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (level: 1 | 2 | 9 | 10) => {
    const roles: Record<number, any> = { 1: 'Analyst', 2: 'Merchant', 9: 'Admin', 10: 'CEO' };
    setUser(prev => ({ 
      ...prev, 
      accessLevel: level,
      role: roles[level]
    }));
    setIsLoggedIn(true);

    if (level === 10) {
      navigateTo('strategic-oversight');
    } else if (level === 9) {
      navigateTo('admin');
    } else {
      navigateTo('onboarding');
    }
  };

  const handleExecuteLiquidation = (productId: string, path: string) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, status: 'liquidating' } : p));
    addNotification('Exit Protocol', 'Execution sequence initiated.', 'success');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigateTo('landing');
  };

  const renderAppContent = () => {
    switch (viewState) {
      case 'inventory': return <Inventory products={products} setProducts={setProducts} onLiquidate={() => {}} onDelete={() => {}} addNotification={addNotification} />;
      case 'automation': return <Automation workflows={workflows} onCreateWorkflow={(w) => setWorkflows([w, ...workflows])} />;
      case 'finance': return <Finance />;
      case 'reports': return <Reports />;
      case 'marketplaces': return <Marketplace onNavigate={navigateTo} addNotification={addNotification} />;
      case 'integrations': return <Integrations />;
      case 'ai-center': return <AIDecisionCenter />;
      case 'settings': return <Settings isDemo={false} onToggleDemo={() => {}} onManageSub={() => {}} />;
      case 'admin': return <Admin onNavigate={navigateTo} />;
      case 'strategic-oversight': return <StrategicOversight onNavigate={navigateTo} />;
      case 'neural-data': return <NeuralData onNavigate={navigateTo} />;
      case 'market-ops': return <MarketOperations onNavigate={navigateTo} />;
      case 'system-kernel': return <SystemKernel onNavigate={navigateTo} />;
      case 'module-detail': return <ModuleDetailView module={activeModule} onBack={() => navigateTo('strategic-oversight')} />;
      case 'simulator': return selectedProduct ? <SkuSimulator product={selectedProduct} onBack={() => navigateTo('dashboard')} /> : null;
      case 'dashboard':
      default: return <Dashboard 
                  products={products} 
                  onSelectProduct={(p) => { setSelectedProduct(p); navigateTo('simulator'); }} 
                  onNavigate={navigateTo}
                  addNotification={addNotification}
                  onExecuteLiquidation={handleExecuteLiquidation}
                />;
    }
  };

  return (
    <div className={`min-h-screen bg-void text-white font-sans selection:bg-neon-gold selection:text-black`}>
      {isLoggedIn && <AITutor />}

      <AnimatePresence>
        {activeToast && (
          <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="fixed top-20 right-8 z-[300] w-80">
             <GlassCard className="p-4 border-l-4 border-l-neon-gold bg-black/90 shadow-2xl">
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
                </div>
             </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoggedIn ? (
        <AnimatePresence mode="wait">
          {viewState === 'auth' ? <Auth onLogin={handleLogin} onBack={() => navigateTo('landing')} /> : 
           viewState === 'pricing' ? <Pricing onBack={() => navigateTo('landing')} onSelect={() => navigateTo('auth')} /> :
           <LandingPage onLaunchApp={() => navigateTo('auth')} onNavigate={navigateTo} />}
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
           <motion.div 
             key={viewState}
             initial={{ opacity: 0, scale: 0.98 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.5, ease: "circOut" }}
             className="w-full h-full"
           >
             {renderAppContent()}
           </motion.div>
        </AppLayout>
      )}
    </div>
  );
};

export default App;
