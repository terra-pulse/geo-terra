import React, { useMemo } from 'react';
import { AlertTriangle, ShieldCheck, Activity } from 'lucide-react';
import { useApp } from '@/lib/AppContext';
import { getEnvironmentalData, getRiskLevel } from '@/lib/geoData';

const LEVELS = {
  low: { color: 'from-emerald-500/80 to-green-500/80', ring: 'ring-emerald-400/30', dot: 'bg-emerald-400', icon: ShieldCheck },
  moderate: { color: 'from-amber-500/80 to-yellow-500/80', ring: 'ring-amber-400/30', dot: 'bg-amber-400', icon: Activity },
  high: { color: 'from-orange-500/80 to-red-500/80', ring: 'ring-orange-400/30', dot: 'bg-orange-400', icon: AlertTriangle },
  critical: { color: 'from-red-600/90 to-rose-700/90', ring: 'ring-red-400/40', dot: 'bg-red-400', icon: AlertTriangle },
};

export default function AlertBar() {
  const { location, t } = useApp();
  const level = useMemo(
    () => getRiskLevel(getEnvironmentalData(location.lat, location.lon)),
    [location.lat, location.lon]
  );
  const cfg = LEVELS[level];
  const Icon = cfg.icon;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3">
      <div className={`relative overflow-hidden rounded-xl bg-gradient-to-r ${cfg.color} ring-1 ${cfg.ring} shadow-lg`}>
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" />
        <div className="relative flex items-center gap-3 px-4 py-2.5">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className={`absolute inline-flex h-full w-full rounded-full ${cfg.dot} opacity-60 animate-ping`} />
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${cfg.dot}`} />
            </span>
            <Icon className="w-4 h-4 text-white" />
            <span className="text-xs font-semibold uppercase tracking-wider text-white/90">
              {t('alert.regionalPriority')}
            </span>
          </div>
          <div className="h-4 w-px bg-white/30" />
          <span className="text-sm font-bold text-white tracking-wide">{t(`alert.${level}`)}</span>
          <span className="hidden sm:block text-xs text-white/80 truncate">{t(`alert.${level}Msg`)}</span>
        </div>
      </div>
    </div>
  );
}
