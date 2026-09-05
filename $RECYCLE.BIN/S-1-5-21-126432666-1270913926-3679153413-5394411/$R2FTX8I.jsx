import React, { useEffect, useState, useMemo } from "react";

const ExtraVarsModal = ({ show, onClose, vars = {}, excludedKeys = [] }) => {

  useEffect(() => {

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [show, onClose]);

  const isSensitiveField = (key) => {
    const sensitivePatterns = ['password', 'secret', 'token', 'key', 'credential', 'api_key', 'apikey', 'private', 'passwd', 'pwd'];
    const lowerKey = String(key || '').toLowerCase();
    return sensitivePatterns.some(pattern => lowerKey.includes(pattern));
  };

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300); // throttle/debounce interval
    return () => clearTimeout(t);
  }, [search]);

    const entries = Object.entries(vars || {}).sort(([a], [b]) => a.localeCompare(b));
    const excludedSet = useMemo(() => new Set((excludedKeys || []).map(k => String(k).toLowerCase())), [excludedKeys]);
    const totalEntries = useMemo(() => entries.filter(([key]) => !excludedSet.has(String(key).toLowerCase())), [entries, excludedSet]);

    const filteredEntries = useMemo(() => {
    const q = String(debouncedSearch || "").trim().toLowerCase();
    if (!q) return totalEntries;
    return totalEntries.filter(([key, value]) => {
      if (String(key).toLowerCase().includes(q)) return true;
      try {
        const s = typeof value === 'object' ? JSON.stringify(value) : String(value);
        return s.toLowerCase().includes(q);
      } catch (e) {
        return false;
      }
    });
  }, [totalEntries, debouncedSearch]);


    if (!show) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter:'blur(2px)', zIndex: 99999 }} onClick={onClose}>
      <div className="relative w-full max-w-5xl max-h-[90vh] rounded-xl overflow-hidden" style={{ background: 'var(--card-bg)', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }} onClick={(e)=>e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b" style={{ background: 'linear-gradient(135deg, rgba(var(--theme-color-primary-rgb), 0.05) 0%, rgba(var(--theme-color-primary-rgb), 0.02) 100%)', borderColor: 'var(--border-color)'}}>
          <div>
            <h2 className="text-2xl font-bold" style={{ color: 'var(--text-color)' }}>All Input Variables</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg transition-all" title="Close" style={{ color: 'var(--text-muted)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 140px)', background: 'var(--card-bg)'}}>
            <div className="flex items-center justify-between mb-4 gap-4">
              <div className="flex items-center gap-2 w-full max-w-md">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search variables..."
                  className="w-full px-3 py-2 rounded-lg text-sm"
                  style={{ border: '1px solid var(--border-color)', background: 'var(--card-bg)', color: 'var(--text-color)'}}
                  aria-label="Search variables"
                />
              </div>
              <div className="text-sm" style={{ color: 'var(--text-muted)' }}>{filteredEntries.length} / {totalEntries.length}</div>
            </div>

            <div className="border rounded-lg overflow-hidden" style={{ borderColor: 'var(--border-color)' }}>
              <table className="w-full">
              <thead>
                <tr style={{ background: 'rgba(var(--theme-color-primary-rgb), 0.05)', borderBottom: '2px solid var(--border-color)'}}>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)', width: '40%'}}>Variable Name</th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)', width: '60%'}}>Value</th>
                  <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)', width: '0%'}}></th>
                </tr>
              </thead>
              <tbody>
                {filteredEntries.map(([key, value], idx, arr)=>{
                  const isSensitive = isSensitiveField(key);
                  let displayValue = value;
                  let valueType = typeof value;
                  let isComplex = false;
                  if (value === null || value === undefined) { displayValue = 'null'; valueType='null'; }
                  else if (Array.isArray(value)) { isComplex=true; displayValue=JSON.stringify(value,null,2); valueType='array'; }
                  else if (typeof value === 'object') { isComplex=true; displayValue=JSON.stringify(value,null,2); valueType='object'; }
                  else if (typeof value === 'boolean') { displayValue=String(value); valueType='boolean'; }
                  else if (typeof value === 'number') { displayValue=String(value); valueType='number'; }
                  else { displayValue=String(value); valueType='string'; }

                  const maskedValue = '••••••••••••';
                  const shouldMask = isSensitive;

                  return (
                    <tr key={key} style={{ borderBottom: idx < arr.length-1 ? '1px solid var(--border-color)' : 'none', transition:'background 0.15s', background: isSensitive ? 'rgba(var(--theme-color-primary-rgb), 0.02)' : 'transparent'}} onMouseEnter={(e)=>e.currentTarget.style.background = isSensitive ? 'rgba(var(--theme-color-primary-rgb), 0.06)' : 'rgba(0,0,0,0.02)'} onMouseLeave={(e)=>e.currentTarget.style.background = isSensitive ? 'rgba(var(--theme-color-primary-rgb), 0.02)' : 'transparent'}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <code className="text-sm font-semibold break-words" style={{ color: 'var(--theme-color-primary)', fontFamily: 'Consolas, Monaco, monospace' }}>{key}</code>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-start">
                          {shouldMask ? (
                            <code className="text-sm px-3 py-1.5 rounded" style={{ background: 'rgba(var(--theme-color-primary-rgb), 0.06)', fontFamily:'Consolas, Monaco, monospace', color: 'var(--text-muted)', letterSpacing:'2px', border: '1px solid rgba(var(--theme-color-primary-rgb), 0.12)'}}>{maskedValue}</code>
                          ) : isComplex ? (
                            <pre className="text-xs p-3 rounded overflow-x-auto max-w-full" style={{ background: 'rgba(0,0,0,0.02)', fontFamily:'Consolas, Monaco, monospace', color:'var(--text-color)', border:'1px solid var(--border-color)', maxHeight:'200px', overflowY:'auto'}}>{displayValue}</pre>
                          ) : (
                            <code className="text-sm px-3 py-1.5 rounded break-all" style={{ background: 'rgba(0,0,0,0.03)', fontFamily:'Consolas, Monaco, monospace', color:'var(--text-color)', border:'1px solid var(--border-color)'}}>{valueType === 'string' && displayValue.length>0 ? `"${displayValue}"` : displayValue}</code>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center"></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtraVarsModal;
