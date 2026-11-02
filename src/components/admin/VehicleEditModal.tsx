import React, { useState, useEffect } from 'react';
import { Vehicle, TransmissionType, FuelType, VehicleStatus } from '../../types';
import { StorageService } from '../../services/storage';
import {
  X,
  Upload,
  Plus,
  Trash2,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
  Save,
  Sparkles,
  Link as LinkIcon
} from 'lucide-react';

interface VehicleEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicleToEdit?: Vehicle | null;
  onSaveSuccess: (savedVehicle: Vehicle) => void;
}

export const VehicleEditModal: React.FC<VehicleEditModalProps> = ({
  isOpen,
  onClose,
  vehicleToEdit,
  onSaveSuccess
}) => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState(2022);
  const [price, setPrice] = useState(750000);
  const [mileage, setMileage] = useState(40000);
  const [transmission, setTransmission] = useState<TransmissionType>('أوتوماتيك');
  const [fuelType, setFuelType] = useState<FuelType>('بنزين');
  const [engineCapacity, setEngineCapacity] = useState('1600 CC');
  const [condition, setCondition] = useState('فابريكا بالكامل بدون أي رش');
  const [color, setColor] = useState('أسود ملكي');
  const [status, setStatus] = useState<VehicleStatus>('متاحة');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isDemo, setIsDemo] = useState(false);
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  const [featuresList, setFeaturesList] = useState<string[]>([]);
  
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (vehicleToEdit) {
      setName(vehicleToEdit.name);
      setBrand(vehicleToEdit.brand);
      setModel(vehicleToEdit.model);
      setYear(vehicleToEdit.year);
      setPrice(vehicleToEdit.price);
      setMileage(vehicleToEdit.mileage);
      setTransmission(vehicleToEdit.transmission);
      setFuelType(vehicleToEdit.fuelType);
      setEngineCapacity(vehicleToEdit.engineCapacity);
      setCondition(vehicleToEdit.condition);
      setColor(vehicleToEdit.color);
      setStatus(vehicleToEdit.status);
      setIsFeatured(vehicleToEdit.isFeatured);
      setIsDemo(vehicleToEdit.isDemo);
      setDescription(vehicleToEdit.description);
      setImages(vehicleToEdit.images || []);
      setFeaturesList(vehicleToEdit.features || []);
    } else {
      // Default empty form for adding new car
      setName('');
      setBrand('');
      setModel('');
      setYear(2023);
      setPrice(800000);
      setMileage(30000);
      setTransmission('أوتوماتيك');
      setFuelType('بنزين');
      setEngineCapacity('1600 CC');
      setCondition('فابريكا بالكامل بدون أي ملاحظات');
      setColor('أبيض لؤلؤي');
      setStatus('متاحة');
      setIsFeatured(false);
      setIsDemo(false);
      setDescription('');
      setImages([
        'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?auto=format&fit=crop&w=1200&q=80'
      ]);
      setFeaturesList([
        'فتحة سقف كهربائية',
        'شاشة لمس ذكية',
        'حساسات ركن وكاميرا خلفية',
        'فرامل مانعة للانغلاق ABS'
      ]);
    }
    setErrorMsg('');
  }, [vehicleToEdit, isOpen]);

  if (!isOpen) return null;

  // Handle uploading photos from device
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      const uploadedUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const compressedBase64 = await StorageService.processImageFile(file);
        uploadedUrls.push(compressedBase64);
      }
      setImages((prev) => [...prev, ...uploadedUrls]);
    } catch (err) {
      console.error(err);
      setErrorMsg('حدث خطأ أثناء معالجة الصور، يرجى المحاولة مرة أخرى.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddImageUrl = () => {
    if (!newImageUrl.trim()) return;
    setImages((prev) => [...prev, newImageUrl.trim()]);
    setNewImageUrl('');
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleAddFeature = () => {
    if (!featureInput.trim()) return;
    setFeaturesList((prev) => [...prev, featureInput.trim()]);
    setFeatureInput('');
  };

  const handleRemoveFeature = (idx: number) => {
    setFeaturesList((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('يرجى إدخال اسم السيارة.');
      return;
    }
    if (!brand.trim()) {
      setErrorMsg('يرجى إدخال ماركة السيارة.');
      return;
    }
    if (!price || price <= 0) {
      setErrorMsg('يرجى تحديد السعر بالجنيه المصري.');
      return;
    }
    if (images.length === 0) {
      setErrorMsg('يرجى إضافة صورة واحدة على الأقل للسيارة.');
      return;
    }

    const vehicleData: Vehicle = {
      id: vehicleToEdit ? vehicleToEdit.id : 'car-' + Date.now().toString(36),
      name: name.trim(),
      brand: brand.trim(),
      model: model.trim() || name.trim(),
      year: Number(year),
      price: Number(price),
      mileage: Number(mileage),
      transmission,
      fuelType,
      engineCapacity: engineCapacity.trim() || '1600 CC',
      condition: condition.trim(),
      color: color.trim(),
      status,
      isFeatured,
      // If user edits a demo vehicle and explicitly checks/unchecks or saves real info
      isDemo: isDemo,
      description: description.trim() || 'سيارة بحالة ممتازة فحص شامل معتمد لدى المعرض.',
      images,
      features: featuresList,
      createdAt: vehicleToEdit ? vehicleToEdit.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    StorageService.saveVehicle(vehicleData);
    onSaveSuccess(vehicleData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#11131c] rounded-3xl border border-amber-500/40 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-[#0c0e15]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">
                {vehicleToEdit ? `تعديل بيانات: ${vehicleToEdit.name}` : 'إضافة سيارة جديدة إلى مخزون المعرض'}
              </h2>
              <span className="text-xs text-neutral-400">
                سيتم حفظ البيانات مباشرة في قاعدة بيانات المعرض وعرضها للعملاء
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-neutral-800 text-neutral-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSave} className="overflow-y-auto flex-1 p-6 space-y-6 text-right">
          
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/50 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Demo Vehicle Transition Banner */}
          {vehicleToEdit?.isDemo && (
            <div className="p-4 rounded-2xl bg-amber-950/50 border border-amber-500/40 text-amber-300 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <strong className="block text-sm font-bold">هذه السيارة حالياً مصنفة كـ "سيارة تجريبية"</strong>
                <p className="text-xs text-amber-200/80">
                  يمكنك تحويلها إلى سيارة حقيقية معتمدة لإزالة علامة التجربة فوراً.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsDemo(!isDemo)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  !isDemo
                    ? 'bg-emerald-600 text-white'
                    : 'bg-amber-500 text-black'
                }`}
              >
                {!isDemo ? '✓ تم التحويل إلى سيارة حقيقية' : 'اضغط لإلغاء صفة التجربة'}
              </button>
            </div>
          )}

          {/* Main Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                اسم السيارة الكامل (مثال: هيونداي إلنترا CN7 فئة ثانية) *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="هيونداي إلنترا CN7"
                className="w-full bg-[#181a24] text-white border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                الماركة (الشركة المصنعة) *
              </label>
              <input
                type="text"
                required
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="مثال: هيونداي، تويوتا، كيا..."
                className="w-full bg-[#181a24] text-white border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Technical Numbers: Price, Year, Mileage */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                السعر بالجنيه المصري (ج.م) *
              </label>
              <input
                type="number"
                min="50000"
                step="5000"
                required
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full bg-[#181a24] text-white border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-400 font-mono text-left"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                سنة الصنع (الموديل) *
              </label>
              <input
                type="number"
                min="2000"
                max="2027"
                required
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full bg-[#181a24] text-white border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-400 font-mono text-left"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                المسافة المقطوعة (كم) *
              </label>
              <input
                type="number"
                min="0"
                step="1000"
                required
                value={mileage}
                onChange={(e) => setMileage(Number(e.target.value))}
                className="w-full bg-[#181a24] text-white border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-400 font-mono text-left"
              />
            </div>
          </div>

          {/* Specs: Transmission, Engine, Fuel, Color */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1.5">ناقل الحركة</label>
              <select
                value={transmission}
                onChange={(e) => setTransmission(e.target.value as TransmissionType)}
                className="w-full bg-[#181a24] text-white border border-neutral-700 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-400"
              >
                <option value="أوتوماتيك">أوتوماتيك</option>
                <option value="مانيوال">مانيوال</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1.5">سعة المحرك</label>
              <input
                type="text"
                value={engineCapacity}
                onChange={(e) => setEngineCapacity(e.target.value)}
                placeholder="1600 CC"
                className="w-full bg-[#181a24] text-white border border-neutral-700 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1.5">نوع الوقود</label>
              <select
                value={fuelType}
                onChange={(e) => setFuelType(e.target.value as FuelType)}
                className="w-full bg-[#181a24] text-white border border-neutral-700 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-400"
              >
                <option value="بنزين">بنزين</option>
                <option value="هايبرد">هايبرد</option>
                <option value="ديزل">ديزل</option>
                <option value="غاز طبيعي">غاز طبيعي</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1.5">لون السيارة</label>
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="أسود ملكي"
                className="w-full bg-[#181a24] text-white border border-neutral-700 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Condition & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                تقرير حالة الهيكل والدهان *
              </label>
              <input
                type="text"
                required
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                placeholder="فابريكا بالكامل دواخل وخوارج بدون أي رش"
                className="w-full bg-[#181a24] text-white border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1.5">حالة التوفر بالمعرض</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as VehicleStatus)}
                className="w-full bg-[#181a24] text-white border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-400"
              >
                <option value="متاحة">متاحة للبيع الآن</option>
                <option value="محجوزة">محجوزة بعربون</option>
                <option value="مباعة">تم البيع</option>
              </select>
            </div>
          </div>

          {/* Featured & Demo Checkboxes */}
          <div className="flex flex-wrap gap-6 p-4 rounded-xl bg-neutral-900 border border-neutral-800">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-white">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400"
              />
              <span>تمييز السيارة (تظهر في قسم السيارات المميزة بالصفحة الرئيسية)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-amber-300">
              <input
                type="checkbox"
                checked={isDemo}
                onChange={(e) => setIsDemo(e.target.checked)}
                className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400"
              />
              <span>تعليم كـ (سيارة تجريبية – بيانات توضيحية)</span>
            </label>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-neutral-300 mb-1.5">
              الوصف التفصيلي ومعلومات الصيانة *
            </label>
            <textarea
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="اكتب هنا تفاصيل الفحص، حالة الكاوتش، رخصة السيارة، ومواعيد الصيانات الدورية..."
              className="w-full bg-[#181a24] text-white border border-neutral-700 rounded-xl p-3 text-sm focus:outline-none focus:border-amber-400"
            ></textarea>
          </div>

          {/* Multiple Photos Management */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-neutral-300 flex items-center justify-between">
              <span>صور السيارة ({images.length} صور مضافة)</span>
              <span className="text-[11px] text-neutral-400">يمكنك رفع صور من الموبايل/الكمبيوتر أو وضع روابط مباشرة</span>
            </label>

            {/* Upload or Add URL Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* File upload from device */}
              <label className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-white text-xs font-bold cursor-pointer transition">
                <Upload className="w-4 h-4 text-amber-400" />
                <span>{isUploading ? 'جاري ضغط ومعالجة الصور...' : 'رفع صور من الهاتف أو الكمبيوتر'}</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={isUploading}
                />
              </label>

              {/* URL Input */}
              <div className="flex gap-2">
                <input
                  type="url"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="أو أدخل رابط صورة مباشر (URL)..."
                  className="flex-1 bg-[#181a24] text-white border border-neutral-700 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-400"
                />
                <button
                  type="button"
                  onClick={handleAddImageUrl}
                  className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-amber-400 font-bold text-xs rounded-xl"
                >
                  إضافة
                </button>
              </div>
            </div>

            {/* Images Preview Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 pt-2">
              {images.map((imgUrl, index) => (
                <div key={index} className="relative group rounded-xl overflow-hidden aspect-[4/3] bg-neutral-900 border border-neutral-800">
                  <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 left-1 p-1 rounded-md bg-rose-600/90 text-white opacity-0 group-hover:opacity-100 transition shadow"
                    title="حذف الصورة"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  {index === 0 && (
                    <span className="absolute bottom-1 right-1 text-[9px] bg-black/80 text-amber-400 px-1.5 py-0.5 rounded font-bold">
                      الرئيسية
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Features Tags */}
          <div>
            <label className="block text-xs font-bold text-neutral-300 mb-1.5">
              كماليات ومزايا السيارة
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddFeature();
                  }
                }}
                placeholder="أدخل ميزة (مثال: فتحة سقف، بصمة تشغيل، جنوط 17)..."
                className="flex-1 bg-[#181a24] text-white border border-neutral-700 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-amber-400"
              />
              <button
                type="button"
                onClick={handleAddFeature}
                className="px-4 py-2 rounded-xl bg-neutral-800 text-amber-400 text-xs font-bold"
              >
                إضافة ميزة
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {featuresList.map((feat, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-800 text-neutral-200 text-xs border border-neutral-700"
                >
                  <span>{feat}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(idx)}
                    className="text-neutral-400 hover:text-rose-400"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Submit Actions */}
          <div className="pt-4 border-t border-neutral-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl bg-neutral-800 text-neutral-300 hover:bg-neutral-700 font-bold text-sm transition"
            >
              إلغاء
            </button>

            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-neutral-950 font-black text-sm shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-95 transition flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4 stroke-[2.5]" />
              <span>{vehicleToEdit ? 'حفظ التعديلات' : 'إضافة السيارة للمخزون'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
