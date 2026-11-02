import React, { useState, useEffect } from 'react';
import { StorageService } from '../../services/storage';
import { AdminCredentials, ShowroomSettings } from '../../types';
import { Shield, Lock, Mail, Eye, EyeOff, AlertCircle, CheckCircle, KeyRound, ArrowRight, Car, Sparkles } from 'lucide-react';

interface AdminLoginPageProps {
  settings: ShowroomSettings;
  onLoginSuccess: () => void;
  onGoToPublicSite: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({
  settings,
  onLoginSuccess,
  onGoToPublicSite
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    StorageService.getAdminCredentials().then((creds) => {
      setEmail(creds.email);
    });
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim() || !password.trim()) {
      setErrorMsg('يرجى إدخال البريد الإلكتروني وكلمة المرور للمتابعة.');
      return;
    }

    setIsLoading(true);
    try {
      const result = await StorageService.verifyAdminLogin(email, password);
      if (result.success) {
        onLoginSuccess();
      } else {
        setErrorMsg(result.error || 'بيانات الدخول غير صحيحة. يرجى التحقق من البريد وكلمة المرور.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('حدث خطأ أثناء المصادقة الأمنية.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!newPassword || newPassword.length < 6) {
      setErrorMsg('يجب أن تحتوي كلمة المرور على 6 أحرف أو أرقام على الأقل.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg('كلمتا المرور غير متطابقتين.');
      return;
    }

    setIsLoading(true);
    try {
      await StorageService.setAdminCredentials(email, newPassword);
      setResetSuccess(true);
      setTimeout(() => {
        setIsResetMode(false);
        setPassword(newPassword);
        setResetSuccess(false);
      }, 1500);
    } catch (err) {
      console.error(err);
      setErrorMsg('فشل تعيين كلمة المرور الجديدة.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07080b] flex flex-col justify-center items-center p-4 relative overflow-hidden font-['Cairo',sans-serif]">
      
      {/* Background Lighting Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none"></div>

      {/* Top Bar with Return to Public Site */}
      <div className="w-full max-w-md mb-6 flex items-center justify-between z-10">
        <button
          onClick={onGoToPublicSite}
          className="text-xs text-neutral-400 hover:text-amber-400 transition flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-neutral-900 border border-neutral-800"
        >
          <ArrowRight className="w-3.5 h-3.5" />
          <span>العودة إلى موقع المعرض للعملاء</span>
        </button>

        <span className="text-[11px] text-amber-500/80 font-mono font-bold flex items-center gap-1">
          <Shield className="w-3 h-3 text-amber-400" />
          <span>مسار الإدارة المحمي /admin</span>
        </span>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-[#10121b] border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 text-right">
        
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 p-0.5 mx-auto mb-3 shadow-xl shadow-amber-500/20">
            <div className="w-full h-full bg-[#0a0b10] rounded-[14px] flex items-center justify-center">
              <Car className="w-8 h-8 text-amber-400" />
            </div>
          </div>

          <h1 className="text-2xl font-black text-white">{settings.name}</h1>
          <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest font-sans block mb-2">
            {settings.subtitleEn}
          </span>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 font-semibold">
            <Lock className="w-3 h-3 text-amber-400" />
            <span>لوحة الإدارة والتحكم بالمخزون</span>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/50 text-rose-300 text-xs flex items-center gap-2 mb-4">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {resetSuccess && (
          <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2 mb-4">
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            <span>تم تغيير كلمة المرور بنجاح! جاري تحويلك لتسجيل الدخول...</span>
          </div>
        )}

        {!isResetMode ? (
          /* Main Login Form */
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>البريد الإلكتروني للإدارة</span>
              </label>
              <input
                type="email"
                required
                dir="ltr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@elmasry-cars.com"
                className="w-full bg-[#171924] text-white border border-neutral-700 rounded-xl px-3.5 py-3 text-sm focus:outline-none focus:border-amber-400 text-left font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1.5 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>كلمة المرور</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  dir="ltr"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#171924] text-white border border-neutral-700 rounded-xl px-3.5 py-3 text-sm focus:outline-none focus:border-amber-400 text-left font-mono pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-3.5 text-neutral-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Quick Helper for Showroom Owner Initial Access */}
            <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-400 space-y-1">
              <div className="flex justify-between items-center text-neutral-300">
                <span className="font-semibold text-neutral-200">حساب المالك الافتراضي:</span>
                <button
                  type="button"
                  onClick={() => {
                    setEmail('admin@elmasry-cars.com');
                    setPassword('ElMasryCars2026!');
                  }}
                  className="text-amber-400 hover:underline font-bold"
                >
                  ملء تلقائي للمالك
                </button>
              </div>
              <div className="text-[10px] text-neutral-500 font-mono">
                admin@elmasry-cars.com | ElMasryCars2026!
              </div>
            </div>

            <div className="flex justify-between items-center text-xs pt-1">
              <button
                type="button"
                onClick={() => setIsResetMode(true)}
                className="text-amber-400 hover:underline font-semibold"
              >
                نسيت / تغيير كلمة المرور؟
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-neutral-950 font-black text-base shadow-xl shadow-amber-500/25 hover:scale-[1.01] active:scale-95 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Lock className="w-4 h-4 stroke-[2.5]" />
              <span>{isLoading ? 'جاري التحقق من الصلاحيات...' : 'تسجيل دخول المسؤول'}</span>
            </button>
          </form>
        ) : (
          /* Password Reset / Setup Form */
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
              يمكن لمالك المعرض تعيين كلمة مرور جديدة وتأكيدها هنا في أي وقت.
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>البريد الإلكتروني للإدارة</span>
              </label>
              <input
                type="email"
                required
                dir="ltr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#171924] text-white border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm font-mono text-left"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1.5 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                <span>كلمة المرور الجديدة</span>
              </label>
              <input
                type="password"
                required
                dir="ltr"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="6 أحرف أو أرقام على الأقل"
                className="w-full bg-[#171924] text-white border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm font-mono text-left"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1.5 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>تأكيد كلمة المرور الجديدة</span>
              </label>
              <input
                type="password"
                required
                dir="ltr"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="أعد إدخال كلمة المرور"
                className="w-full bg-[#171924] text-white border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm font-mono text-left"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsResetMode(false)}
                className="w-1/2 py-3 rounded-xl bg-neutral-800 text-neutral-300 font-bold text-xs hover:bg-neutral-700 transition"
              >
                إلغاء والعودة
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="w-1/2 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-black text-xs shadow-md transition"
              >
                حفظ كلمة المرور
              </button>
            </div>
          </form>
        )}

      </div>

      <div className="mt-8 text-center text-xs text-neutral-500">
        نظام إدارة المخزون المحمي لمعرض {settings.name} &copy; {new Date().getFullYear()}
      </div>

    </div>
  );
};
