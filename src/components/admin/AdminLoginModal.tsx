import React, { useState, useEffect } from 'react';
import { StorageService } from '../../services/storage';
import { AdminCredentials } from '../../types';
import { Shield, Lock, Mail, Eye, EyeOff, AlertCircle, CheckCircle, KeyRound, X } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
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

  // Default credentials hint for owner
  const [adminCreds, setAdminCreds] = useState<AdminCredentials | null>(null);

  useEffect(() => {
    if (isOpen) {
      StorageService.getAdminCredentials().then((creds) => {
        setAdminCreds(creds);
        setEmail(creds.email);
      });
      setErrorMsg('');
      setResetSuccess(false);
      setIsResetMode(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim() || !password.trim()) {
      setErrorMsg('يرجى إدخال البريد الإلكتروني وكلمة المرور.');
      return;
    }

    setIsLoading(true);
    try {
      const result = await StorageService.verifyAdminLogin(email, password);
      if (result.success) {
        onLoginSuccess();
        onClose();
      } else {
        setErrorMsg(result.error || 'فشل تسجيل الدخول، يرجى التحقق من البيانات.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('حدث خطأ غير متوقع أثناء محاولة الدخول.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!newPassword || newPassword.length < 6) {
      setErrorMsg('يجب أن تتكون كلمة المرور الجديدة من 6 أحرف أو أرقام على الأقل.');
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
      setErrorMsg('فشل تحديث كلمة المرور.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#11131c] rounded-3xl border border-amber-500/40 shadow-2xl overflow-hidden">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-[#0c0e15]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Shield className="w-4 h-4" />
            </div>
            <span className="text-white font-bold text-sm">بوابة إدارة المصري للسيارات</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8">
          
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 mx-auto mb-3 shadow-lg shadow-amber-500/20">
              <div className="w-full h-full bg-[#0a0b10] rounded-[14px] flex items-center justify-center">
                <Lock className="w-8 h-8 text-amber-400" />
              </div>
            </div>
            <h3 className="text-xl font-black text-white">تسجيل دخول المسؤول</h3>
            <p className="text-neutral-400 text-xs mt-1">
              مخصص فقط لمالك ومسؤولي معرض المصري للسيارات لإدارة المخزون والطلبات
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/50 text-rose-300 text-xs flex items-center gap-2 mb-4">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {resetSuccess && (
            <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2 mb-4">
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              <span>تم تحديث كلمة المرور بنجاح! يمكنك الآن تسجيل الدخول.</span>
            </div>
          )}

          {!isResetMode ? (
            /* Login Form */
            <form onSubmit={handleLogin} className="space-y-4 text-right">
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
                  className="w-full bg-[#171924] text-white border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-400 text-left font-mono"
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
                    className="w-full bg-[#171924] text-white border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-400 text-left pr-10 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-3 text-neutral-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Quick Preset Hint for Showroom Owner */}
              <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-400 space-y-1">
                <div className="flex justify-between items-center text-neutral-300">
                  <span>حساب المالك المبدئي:</span>
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

              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => setIsResetMode(true)}
                  className="text-xs text-amber-400 hover:underline font-semibold"
                >
                  تعيين / تغيير كلمة المرور؟
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-neutral-950 font-black text-sm shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-95 transition cursor-pointer disabled:opacity-50"
              >
                {isLoading ? 'جاري التحقق...' : 'دخول لوحة التحكم'}
              </button>
            </form>
          ) : (
            /* Reset / Change Password Form */
            <form onSubmit={handleResetPassword} className="space-y-4 text-right">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
                يمكن لمالك المعرض تعيين كلمة مرور سرية جديدة ومخصصة من هنا في أي وقت.
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

      </div>
    </div>
  );
};
