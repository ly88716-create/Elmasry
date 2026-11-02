import React, { useState } from 'react';
import { CustomerInquiry, Vehicle } from '../types';
import { StorageService } from '../services/storage';
import { formatCurrencyEGP } from '../utils/formatters';
import {
  X,
  Send,
  Car,
  CheckCircle,
  Phone,
  User,
  DollarSign,
  Calendar,
  FileText,
  Sparkles,
  AlertCircle
} from 'lucide-react';

interface RequestCarModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedVehicle?: Vehicle | null;
  onSuccess?: (inquiry: CustomerInquiry) => void;
}

export const RequestCarModal: React.FC<RequestCarModalProps> = ({
  isOpen,
  onClose,
  preselectedVehicle,
  onSuccess
}) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [requestedBrand, setRequestedBrand] = useState(preselectedVehicle?.brand || '');
  const [requestedModel, setRequestedModel] = useState(preselectedVehicle?.model || '');
  const [requestedYear, setRequestedYear] = useState(preselectedVehicle ? String(preselectedVehicle.year) : '2022');
  const [budget, setBudget] = useState(preselectedVehicle?.price || 750000);
  const [notes, setNotes] = useState(
    preselectedVehicle ? `طلب معاينة لسيارة: ${preselectedVehicle.name} المعروضة بسعر ${formatCurrencyEGP(preselectedVehicle.price)}` : ''
  );
  
  const [submittedInquiry, setSubmittedInquiry] = useState<CustomerInquiry | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Validations
    if (!customerName.trim()) {
      setErrorMsg('يرجى إدخال اسم العميل الكريم.');
      return;
    }

    const cleanPhone = phone.trim().replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('يرجى إدخال رقم هاتف محمول مصري صحيح (مثال: 01004247770 أو 01xxxxxxxxx).');
      return;
    }

    if (!requestedBrand.trim()) {
      setErrorMsg('يرجى كتابة أو اختيار ماركة السيارة المطلوبة.');
      return;
    }

    if (!budget || budget <= 0) {
      setErrorMsg('يرجى تحديد الميزانية التقديرية بالجنيه المصري.');
      return;
    }

    setIsSubmitting(true);

    try {
      const newInquiry = StorageService.saveInquiry({
        customerName: customerName.trim(),
        phone: cleanPhone,
        requestedBrand: requestedBrand.trim(),
        requestedModel: requestedModel.trim() || 'أي فئة',
        requestedYear: requestedYear.trim() || 'حسب المتوفر',
        budget: Number(budget),
        notes: notes.trim(),
        vehicleId: preselectedVehicle?.id,
        vehicleName: preselectedVehicle?.name
      });

      setSubmittedInquiry(newInquiry);
      if (onSuccess) onSuccess(newInquiry);
    } catch (err) {
      console.error(err);
      setErrorMsg('حدث خطأ أثناء حفظ الطلب، يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setCustomerName('');
    setPhone('');
    setRequestedBrand('');
    setRequestedModel('');
    setRequestedYear('2022');
    setBudget(750000);
    setNotes('');
    setSubmittedInquiry(null);
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#11131c] rounded-3xl border border-amber-500/30 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-[#0c0e15]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white">
                {preselectedVehicle ? `طلب معاينة: ${preselectedVehicle.name}` : 'اطلب سيارتك بمواصفاتك الخاصة'}
              </h2>
              <p className="text-xs text-neutral-400">
                فريق معرض المصري موتورز سيتولى البحث وتوفير السيارة المناسبة لك بأفضل سعر
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {submittedInquiry ? (
            /* Success confirmation screen */
            <div className="text-center py-6 space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-950 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                <CheckCircle className="w-10 h-10" />
              </div>

              <h3 className="text-2xl font-black text-white">تم استلام طلبك بنجاح!</h3>

              <p className="text-neutral-300 text-sm max-w-md mx-auto leading-relaxed">
                شكراً لتواصلك مع معرض <strong className="text-amber-400">المصري موتورز</strong>.
                تم تسجيل طلبك برقم مرجعي: <span className="font-mono font-bold text-amber-400">#{submittedInquiry.id.slice(-6).toUpperCase()}</span>.
                سيقوم مسؤول المبيعات بالتواصل معك هاتفياً على الرقم <strong className="text-white font-mono" dir="ltr">{submittedInquiry.phone}</strong> خلال دقائق.
              </p>

              <div className="p-4 rounded-xl bg-[#171924] border border-neutral-800 text-right text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between">
                  <span className="text-neutral-400">السيارة المطلوبة:</span>
                  <span className="text-white font-bold">{submittedInquiry.requestedBrand} {submittedInquiry.requestedModel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">الميزانية المرصودة:</span>
                  <span className="text-amber-400 font-bold font-mono">{formatCurrencyEGP(submittedInquiry.budget)}</span>
                </div>
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={handleResetForm}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-bold text-sm shadow-md"
                >
                  إغلاق وتصفح المعرض
                </button>
              </div>
            </div>
          ) : (
            /* Request Form */
            <form onSubmit={handleSubmit} className="space-y-4 text-right">
              
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/50 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Customer Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-amber-400" />
                    <span>الاسم بالكامل *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="مثال: أحمد محمد عبد الله"
                    className="w-full bg-[#171924] text-white border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>رقم الهاتف المحمول (مصر) *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    dir="ltr"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="01004247770"
                    className="w-full bg-[#171924] text-white border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-400 text-right"
                  />
                </div>
              </div>

              {/* Brand & Model */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5 flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5 text-amber-400" />
                    <span>نوع السيارة المطلوبة (الماركة) *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={requestedBrand}
                    onChange={(e) => setRequestedBrand(e.target.value)}
                    placeholder="مثال: هيونداي، تويوتا، كيا، سكودا..."
                    className="w-full bg-[#171924] text-white border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5 flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5 text-amber-400" />
                    <span>الموديل والفئة *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={requestedModel}
                    onChange={(e) => setRequestedModel(e.target.value)}
                    placeholder="مثال: إلنترا CN7 فئة ثانية، كورولا..."
                    className="w-full bg-[#171924] text-white border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Year & Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>سنة الصنع المطلوبة</span>
                  </label>
                  <input
                    type="text"
                    value={requestedYear}
                    onChange={(e) => setRequestedYear(e.target.value)}
                    placeholder="مثال: 2021 أو أحدث"
                    className="w-full bg-[#171924] text-white border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5 flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                    <span>الميزانية المتاحة بالجنيه المصري *</span>
                  </label>
                  <input
                    type="number"
                    min="100000"
                    step="25000"
                    required
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full bg-[#171924] text-white border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-400 font-mono"
                  />
                  <span className="text-[11px] text-amber-400 font-mono mt-1 block">
                    الميزانية الحالية: {formatCurrencyEGP(budget)}
                  </span>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1.5 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  <span>ملاحظات إضافية (اللون المفضل، حالة الدهان، كماليات معينة)</span>
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="مثال: أفضل سيارة لون أسود أو رمادي، فابريكا بالكامل، مع فتحة سقف، الدفع كاش فوري..."
                  className="w-full bg-[#171924] text-white border border-neutral-700 rounded-xl p-3 text-sm focus:outline-none focus:border-amber-400"
                ></textarea>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-neutral-950 font-black text-base shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-5 h-5 stroke-[2.5]" />
                  <span>{isSubmitting ? 'جاري إرسال الطلب...' : 'إرسال طلب السيارة الآن'}</span>
                </button>
              </div>

              <div className="text-center text-[11px] text-neutral-400 flex items-center justify-center gap-1 pt-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>بياناتك محفوظة بأعلى درجات الخصوصية ولا تتم مشاركتها نهائياً</span>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
